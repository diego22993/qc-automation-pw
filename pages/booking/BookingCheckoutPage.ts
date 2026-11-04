import { expect } from "@playwright/test";
import { BookingBasePage } from "./BookingBasePage";

export class BookingCheckoutPage extends BookingBasePage {
  readonly firstNameInput = this.page.locator(
    'input[name="firstname"]',
  );

  readonly lastNameInput = this.page.locator(
    'input[name="lastname"]',
  );

  readonly emailInput = this.page.locator(
    'input[name="email"]',
  );

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