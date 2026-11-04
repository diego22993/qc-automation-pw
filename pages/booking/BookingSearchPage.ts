import { Page, Locator } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingSearchPage extends BookingBasePage {
  readonly destinationInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.destinationInput = page.locator('input[name="ss"], input[id="searchbox-horizontal-destination-input"]');
    this.searchButton = page.locator('button[type="submit"]');
  }

  async searchDestination(destination: string) {
    await this.typeText(this.destinationInput, destination);
    
    // Forzamos el cierre del calendario presionando Escape y haciendo clic fuera
    await this.page.keyboard.press('Escape');
    await this.page.locator('body').click({ position: { x: 10, y: 10 } }).catch(() => {});
    
    await this.clickElement(this.searchButton);
  }
}