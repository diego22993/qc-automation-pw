



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
    this.searchButton = page.locator('button[type="submit"]');
    this.datePickerOpenBtn = page.locator('[data-testid="date-display-field-start"]');
    this.guestsOccupancyBtn = page.locator('[data-testid="occupancy-config"]');
  }

  async goto() {
    await this.navigate('https://www.booking.com');
  }

  async searchDestination(destination: string, checkInDate: string, checkOutDate: string) {
    await this.typeText(this.destinationInput, destination);
    
    // Abrir y seleccionar fechas en el calendario
    await this.clickElement(this.datePickerOpenBtn);
    await this.selectDate(checkInDate);
    await this.selectDate(checkOutDate);

    await this.clickElement(this.searchButton);
  }

  private async selectDate(dateIso: string) {
    // Date Iso format: YYYY-MM-DD
    const dateLocator = this.page.locator(`span[data-date="${dateIso}"]`);
    await this.clickElement(dateLocator);
  }
}
