import { expect, type Locator, type Page } from "@playwright/test";

export class CheckoutOverviewPage {
  private readonly page: Page;
  private readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item");
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
    await expect(this.page.locator('[data-test="title"]')).toHaveText(
      "Checkout: Overview",
    );
  }

  async expectProduct(productName: string): Promise<void> {
    await expect(this.cartItems.filter({ hasText: productName })).toBeVisible();
  }

  async finish(): Promise<void> {
    await this.page.locator('[data-test="finish"]').click();
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
  }
}