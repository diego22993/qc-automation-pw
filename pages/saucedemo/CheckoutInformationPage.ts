import { expect, type Page } from "@playwright/test";

export class CheckoutInformationPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
    await expect(this.page.locator('[data-test="title"]')).toHaveText(
      "Checkout: Your Information",
    );
  }

  async continueWithCustomer(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    await this.page.locator('[data-test="continue"]').click();
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
  }
}