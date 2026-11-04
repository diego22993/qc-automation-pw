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

  async removeProduct(productName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: productName });
    await expect(item).toBeVisible();
    await item.getByRole("button", { name: "Remove" }).click();
  }

  async removeAllProducts(): Promise<void> {
    while ((await this.cartItems.count()) > 0) {
      await this.cartItems.first().getByRole("button", { name: "Remove" }).click();
    }
  }

  async expectItemCount(count: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(count);
  }

  async checkout(): Promise<void> {
    await this.page.getByRole("button", { name: "Checkout" }).click();
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
  }
}