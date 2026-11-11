
import { Page, Locator, expect } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingCheckoutPage extends BookingBasePage {

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);

    // Selectores provisionales: verificar en Inspector
    this.firstNameInput = page.locator(
      'input[name="firstname"]'
    );

    this.lastNameInput = page.locator(
      'input[name="lastname"]'
    );

    this.emailInput = page.locator(
      'input[name="email"]'
    );

    this.submitButton = page.getByRole(
      'button',
      { name: /next|continue|continuar/i }
    );
  }

  async submitEmptyForm(): Promise<void> {

    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();

    // Dejar los tres campos vacíos
    await this.firstNameInput.fill('');
    await this.lastNameInput.fill('');
    await this.emailInput.fill('');

    // Intentar continuar
    await this.submitButton.click();
  }

  async validateRequiredFields(): Promise<void> {

    const inputs = [
      this.firstNameInput,
      this.lastNameInput,
      this.emailInput
    ];

    for (const input of inputs) {

      const validation = await input.evaluate(
        (element: HTMLInputElement) => ({
          valid: element.validity.valid,
          valueMissing: element.validity.valueMissing,
          message: element.validationMessage
        })
      );

      console.log('Validación HTML5:', validation);

      // Si el campo tiene validación nativa,
      // comprobar que esté inválido.
      const required = await input.evaluate(
        (element: HTMLInputElement) =>
          element.required
      );

      if (required) {
        expect(validation.valueMissing).toBe(true);
      }
    }
  }
}
