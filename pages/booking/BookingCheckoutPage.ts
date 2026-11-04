import { Page, Locator, expect } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingCheckoutPage extends BookingBasePage {
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    // Selectores ampliados para cubrir diferentes idiomas y tipos de botones en el checkout
    this.submitButton = page.locator(
      'button[type="submit"], button:has-text("Final"), button:has-text("Next"), button:has-text("Siguiente"), button:has-text("Book"), button:has-text("Reservar")'
    ).first();
  }

  async validateRequiredFields() {
    await this.submitButton.waitFor({ state: 'visible', timeout: 15000 });
    await expect(this.submitButton).toBeVisible();
  }

  async submitCheckoutForm() {
    await this.submitButton.click();
  }
}
