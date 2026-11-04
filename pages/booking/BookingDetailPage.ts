import { Page, Locator, expect } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingDetailPage extends BookingBasePage {
  private hotelTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.hotelTitle = page.locator('#hp_hotel_name, [data-testid="hp-hotel-title"]');
  }

  async validateHotelTitle(expectedName: string) {
    await expect(this.hotelTitle).toContainText(expectedName);
  }
}
