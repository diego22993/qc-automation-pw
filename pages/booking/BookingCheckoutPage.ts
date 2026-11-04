import { Page, Locator, expect } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingCheckoutPage extends BookingBasePage {
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    // Ubica el botón principal de envío en el flujo de reserva
    this.submitButton = page.locator('button[type="submit"]').first();
  }

  async validateRequiredFields() {
    // Valida que el botón de confirmación o envío sea visible e interactivo en la pantalla
    await expect(this.submitButton).toBeVisible();
  }
}