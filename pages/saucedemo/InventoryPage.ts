
import { expect, type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator(".inventory_item");
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.page.locator('[data-test="title"]')).toHaveText("Products");
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async addProductToCart(productName: string): Promise<void> {
    const product = this.inventoryItems.filter({ hasText: productName }).first();
    await expect(product).toBeVisible();
    await product.getByRole("button", { name: /add to cart/i }).click();
  }

  async removeProductFromCart(productName: string): Promise<void> {
    const product = this.inventoryItems.filter({ hasText: productName }).first();
    await expect(product).toBeVisible();
    await product.getByRole("button", { name: /remove/i }).click();
  }

  async sortBy(label: string, expectedValue: string): Promise<void> {
    const sortControl = this.page.getByRole("combobox", { name: "Sort products" });
    await sortControl.selectOption({ label });
    await expect(sortControl).toHaveValue(expectedValue);
  }

  async expectOnlyProduct(productName: string): Promise<void> {
    const matchingProduct = this.inventoryItems.filter({ hasText: productName });
    await expect(matchingProduct).toHaveCount(1);
    await expect(matchingProduct).toBeVisible();
  }

  async expectInventoryPriceCount(count: number): Promise<void> {
    const prices = this.page
      .locator("#inventory_container")
      .locator(".inventory_item_price");
    await expect(prices).toHaveCount(count);
  }

  async expectProductPrice(productName: string, price: string): Promise<void> {
    const product = this.inventoryItems.filter({ hasText: productName });
    await expect(product.locator(".inventory_item_price")).toHaveText(price);
  }

  async expectCartCount(count: number): Promise<void> {
    if (count < 1) {
      await expect(this.cartBadge).toHaveCount(0);
      return;
    }
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async expectCartCountFromContainer(count: number): Promise<void> {
    const badge = this.page
      .locator(".shopping_cart_container")
      .locator(".shopping_cart_badge");
    await expect(badge).toHaveText(String(count));
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart\.html/);
  }
}