import { Page, Locator, expect } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingCheckoutPage extends BookingBasePage {
  private submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.submitButton = page.locator('button[type="submit"]', { hasText: /Finalize|Next|Book/i });
  }

  async submitEmptyForm() {
    await this.clickElement(this.submitButton);
  }

  async validateRequiredFields() {
    const firstName = this.page.locator('input[name="firstname"]');
    await expect(firstName).toHaveAttribute('required', '');
  }
}