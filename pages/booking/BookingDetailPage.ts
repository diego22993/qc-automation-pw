import { expect, Locator, Page } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingDetailPage extends BookingBasePage {
  private readonly hotelName: Locator;

  constructor(page: Page) {
    // Esta Page corresponde a la nueva pestana, no a los resultados.
    super(page);
    this.hotelName = page.getByRole('heading', { level: 1 });
  }

  async getHotelName(): Promise<string> {
    await expect(this.hotelName).toBeVisible({ timeout: 15000 });
    return (await this.hotelName.innerText()).trim();
  }
}
