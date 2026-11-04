import { Page, Locator } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingSearchPage extends BookingBasePage {
  readonly destinationInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    // Selectores para la caja de búsqueda principal de la home
    this.destinationInput = page.locator('input[name="ss"], input[id="searchbox-horizontal-destination-input"]');
    this.searchButton = page.locator('button[type="submit"]');
  }

  async searchDestination(destination: string) {
    await this.typeText(this.destinationInput, destination);
    // Breve pausa táctica opcional para asegurar que se despliegue el dropdown de autocompletado si aplica
    await this.page.waitForTimeout(500); 
    await this.clickElement(this.searchButton);
  }
}