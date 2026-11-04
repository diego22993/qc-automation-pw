<<<<<<< HEAD
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
=======
import { expect } from "@playwright/test";
import { BookingBasePage } from "./BookingBasePage";

export class BookingCheckoutPage extends BookingBasePage {
  readonly firstNameInput = this.page.locator('input[name="firstname"]');

  readonly lastNameInput = this.page.locator('input[name="lastname"]');

  readonly emailInput = this.page.locator('input[name="email"]');

  readonly submitBtn = this.page.getByRole("button", {
    name: /siguiente|continuar|next/i,
  });

  async expectLoaded(): Promise<void> {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
  }

  async submitEmptyForm(): Promise<void> {
    await this.expectLoaded();

    await this.firstNameInput.fill("");
    await this.lastNameInput.fill("");
    await this.emailInput.fill("");

    await this.submitBtn.click();
  }

  async expectRequiredErrors(): Promise<void> {
    const requiredFields = [
      this.firstNameInput,
      this.lastNameInput,
      this.emailInput,
    ];

    for (const field of requiredFields) {
      await expect(field).toHaveValue("");

      const isInvalid = await field.evaluate((element) => {
        const input = element as HTMLInputElement;
        return !input.validity.valid;
      });

      expect(isInvalid).toBe(true);
    }
  }
}
>>>>>>> origin/feature/clase-4-pom
