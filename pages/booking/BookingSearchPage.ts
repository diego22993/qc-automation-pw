import { Page, Locator } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingSearchPage extends BookingBasePage {
  private destinationInput: Locator;
  private searchButton: Locator;
  private datePickerOpenBtn: Locator;
  private guestsOccupancyBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.destinationInput = page.locator('input[name="ss"]');
    // Usamos el rol accesible y nombre exacto, o un contenedor padre para evitar ambigüedades
    this.searchButton = page.getByRole('button', { name: 'Search', exact: true });
    this.datePickerOpenBtn = page.locator('[data-testid="date-display-field-start"]');
    this.guestsOccupancyBtn = page.locator('[data-testid="occupancy-config"]');
  }

  async goto() {
    await this.navigate('https://www.booking.com');
  }

  async searchDestination(destination: string, checkInDate: string, checkOutDate: string) {
    await this.typeText(this.destinationInput, destination);
    
    // Manejar el desplegable de sugerencias de manera segura
    const firstSuggestion = this.page.locator('#autocomplete-result-0, [data-testid="autocomplete-result"] li').first();
    if (await firstSuggestion.isVisible({ timeout: 5000 }).catch(() => false)) {
      await firstSuggestion.click();
    } else {
      await this.destinationInput.press('ArrowDown');
      await this.destinationInput.press('Enter');
    }

    // Abrir el calendario y seleccionar fechas
    await this.datePickerOpenBtn.waitFor({ state: 'visible' });
    await this.clickElement(this.datePickerOpenBtn);

    await this.selectDate(checkInDate);
    await this.selectDate(checkOutDate);

    // Forzar el clic para evitar intercepciones de capas de UI o modales flotantes
await this.searchButton.click({ force: true });

    await this.clickElement(this.searchButton);
  }

  private async selectDate(dateIso: string) {
    // Date Iso format: YYYY-MM-DD
    const dateLocator = this.page.locator(`span[data-date="${dateIso}"]`);
    await this.clickElement(dateLocator);
  }
}