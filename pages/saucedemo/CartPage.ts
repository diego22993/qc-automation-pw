import { expect, type Locator, type Page } from "@playwright/test";

export class CartPage {
  private readonly page: Page;
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/cart\.html/);
    await expect(this.page.locator('[data-test="title"]')).toHaveText("Your Cart");
  }

  async expectProduct(productName: string): Promise<void> {
    await expect(this.cartItems.filter({ hasText: productName })).toBeVisible();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
  }
}