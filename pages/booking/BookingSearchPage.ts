import { Page, Locator, expect } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingSearchPage extends BookingBasePage {
  private destinationInput: Locator;
  private searchButton: Locator;
  private datePickerOpenBtn: Locator;
  private guestsOccupancyBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.destinationInput = page.locator('input[name="ss"]');
    this.searchButton = page.locator('button[type="submit"]');
    this.datePickerOpenBtn = page.locator('[data-testid="date-display-field-start"]');
    this.guestsOccupancyBtn = page.locator('[data-testid="occupancy-config"]');
  }

  async goto() {
    await this.navigate('https://www.booking.com');
  }

  async searchDestination(destination: string, checkInDate: string, checkOutDate: string, adults: number = 2) {
    await this.typeText(this.destinationInput, destination);

    // Elegir la sugerencia que contiene el destino (si no, Booking puede mandar a otra página).
    // Filtramos por texto porque al principio la lista muestra sugerencias viejas (ej: Buenos Aires).
    const suggestion = this.page
      .locator('#autocomplete-results [role="option"]')
      .filter({ hasText: destination })
      .first();
    await this.clickElement(suggestion);

    // Abrir y seleccionar fechas en el calendario
    await this.openCalendar(checkInDate);
    await this.selectDate(checkInDate);
    await this.selectDate(checkOutDate);

    // Seleccionar cantidad de personas
    await this.selectAdults(adults);

    await this.clickElement(this.searchButton);
  }

  // Abre el calendario y reintenta si algún modal lo cierra antes de que aparezca la fecha
  private async openCalendar(dateIso: string) {
    const day = this.page.locator(`span[data-date="${dateIso}"]`);
    await expect(async () => {
      if (!(await day.isVisible())) {
        await this.datePickerOpenBtn.click();
      }
      await expect(day).toBeVisible({ timeout: 2000 });
    }).toPass({ timeout: 15000 });
  }

  async selectAdults(adults: number) {
    await this.clickElement(this.guestsOccupancyBtn);
    const adultsInput = this.page.locator('#group_adults');
    const adultsRow = this.page.locator('div').filter({ has: adultsInput }).last();
    const minusBtn = adultsRow.locator('button').first();
    const plusBtn = adultsRow.locator('button').last();

    let current = Number(await adultsInput.inputValue());
    while (current < adults) {
      await plusBtn.click();
      current++;
    }
    while (current > adults) {
      await minusBtn.click();
      current--;
    }
  }

  private async selectDate(dateIso: string) {
    // Date Iso format: YYYY-MM-DD
    const dateLocator = this.page.locator(`span[data-date="${dateIso}"]`);
    await this.clickElement(dateLocator);
  }
}
