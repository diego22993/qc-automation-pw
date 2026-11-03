import { expect, Locator, Page } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingSearchPage extends BookingBasePage {
  private readonly destinationInput: Locator;
  private readonly searchButton: Locator;
  private readonly datePickerButton: Locator;
  private readonly occupancyButton: Locator;
  private readonly doneButton: Locator;

  constructor(page: Page) {
    super(page);
    this.destinationInput = page.locator('input[name="ss"]');
    this.searchButton = page.getByRole('button', { name: 'Search', exact: true });
    this.datePickerButton = page.getByTestId('searchbox-dates-container');
    this.occupancyButton = page.getByTestId('occupancy-config');
    this.doneButton = page.getByRole('button', { name: 'Done', exact: true });
  }

  async goto(): Promise<void> {
    await this.navigate();
  }

  async setGuests(adults: number, rooms = 1): Promise<void> {
    if (!Number.isInteger(adults) || !Number.isInteger(rooms) ||
        adults < 1 || adults > 30 || rooms < 1 || rooms > 30 || rooms > adults) {
      throw new Error('Usar entre 1 y 30 adultos y habitaciones, con al menos un adulto por habitacion.');
    }
    // Booking puede mostrar HTML antes de que respondan sus eventos.
    await expect(async () => {
      if (await this.occupancyButton.getAttribute('aria-expanded') !== 'true') {
        await this.occupancyButton.click();
      }
      // El cierre del modal tambien consume el tiempo de esta asercion.
      await expect(this.doneButton).toBeVisible({ timeout: 10000 });
    }).toPass({ timeout: 30000 });
    await this.setCounter('Adults', adults);
    await this.setCounter('Children', 0);
    await this.setCounter('Rooms', rooms);
    await this.doneButton.click();
  }

  async searchDestination(destination: string, checkInDate: string, checkOutDate: string): Promise<void> {
    if (!destination.trim()) throw new Error('El destino no puede estar vacio.');
    for (const date of [checkInDate, checkOutDate]) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) ||
          new Date(date).toISOString().slice(0, 10) !== date) {
        throw new Error('Las fechas deben ser validas y tener formato YYYY-MM-DD.');
      }
    }
    const today = new Date();
    const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    if (checkInDate < localToday || checkOutDate <= checkInDate) {
      throw new Error('El ingreso no puede estar en el pasado y la salida debe ser posterior.');
    }
    await this.destinationInput.fill(destination);
    // Esperar la sugerencia del destino, no elegir una sugerencia anterior.
    await this.page.getByRole('option').filter({ hasText: destination }).first().click();
    if (!await this.page.locator('[data-date]').first().isVisible()) {
      await this.datePickerButton.click();
    }
    await this.selectDate(checkInDate);
    await this.selectDate(checkOutDate);
    await this.searchButton.click();
  }

  private async setCounter(label: string, value: number): Promise<void> {
    const counter = this.page.getByLabel(label, { exact: true });
    // Usar el control accesible con teclado, sin modificar el DOM.
    await counter.press('Home');
    const minimum = Number(await counter.getAttribute('min'));
    for (let current = minimum; current < value; current++) {
      await counter.press('ArrowRight');
    }
    await expect(counter).toHaveValue(String(value));
  }

  private async selectDate(dateIso: string): Promise<void> {
    const date = this.page.locator(`[data-date="${dateIso}"]`);
    const firstDay = this.page.locator('[data-date]').first();
    await firstDay.waitFor({ state: 'visible' });
    for (let month = 0; month < 24; month++) {
      if (await date.isVisible()) {
        await date.click();
        return;
      }
      const previousFirstDay = await firstDay.getAttribute('data-date');
      await this.page.getByRole('button', { name: 'Next month', exact: true }).click();
      await expect(firstDay).not.toHaveAttribute('data-date', previousFirstDay!);
    }
    throw new Error(`No se encontro ${dateIso} dentro de los proximos 24 meses del calendario.`);
  }
}
