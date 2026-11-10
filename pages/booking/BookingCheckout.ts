import { Page, Locator } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingCheckoutPage extends BookingBasePage {
  private submitButton: Locator;
  private errorMessages: Locator;

  constructor(page: Page) {
    super(page);
    // Selectores del botón final y de los mensajes de error
    this.submitButton = page.locator('button[name="book"]');
    this.errorMessages = page.locator('.bui-form__error');
  }

  async submitEmptyForm() {
    // Hacemos clic en pagar sin haber llenado nada
    await this.clickElement(this.submitButton);
  }

  async getErrorsCount(): Promise<number> {
    return await this.errorMessages.count();
  }
}