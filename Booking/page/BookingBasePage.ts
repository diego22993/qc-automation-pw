import { Page } from '@playwright/test';

export class BookingBasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToHome(): Promise<void> {
    await this.page.goto('https://www.booking.com/');
  }
}