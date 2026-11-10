import { Page, Locator } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingSearchPage extends BookingBasePage {
  private destinationInput: Locator;
  private searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.destinationInput = page.locator('input[name="ss"]');
    this.searchButton = page.locator('button[type="submit"]');
  }

  async goto() {
    await this.page.goto('https://www.booking.com');
  }

  async searchDestination(destination: string) {
    await this.typeText(this.destinationInput, destination);
    // Booking suele abrir un popup de calendario al escribir, presionamos Enter para buscar directamente
    await this.destinationInput.press('Enter'); 
  }
}