import { Page, Locator } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingDetail extends BookingBasePage {
  private propertyTitle: Locator;
  private reserveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.propertyTitle = page.locator('h2.pp-header__title'); 
    this.reserveButton = page.locator('#hp_book_now_button');
  }

  async getHotelTitle(): Promise<string> {
    await this.propertyTitle.waitFor({ state: 'visible' });
    const text = await this.propertyTitle.textContent();
    return text ? text.trim() : '';
  }
}