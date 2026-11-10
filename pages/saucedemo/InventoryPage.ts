import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    // Selector del combobox de ordenamiento tal como marca el diagrama de secuencia
    this.sortDropdown = page.getByRole('combobox', { name: /price|name|sort/i });
  }

  // Corresponde a los ejercicios 22 y 23 (sortBy)
  async sortBy(visibleText: string, expectedValue: string) {
    await this.sortDropdown.selectOption({ label: visibleText });
    await expect(this.sortDropdown).toHaveValue(expectedValue);
  }

  // Corresponde al ejercicio 24 (expectOnlyProduct)
  async expectOnlyProduct(productName: string) {
    const matchingProduct = this.inventoryItems.filter({ hasText: productName });
    await expect(matchingProduct).toHaveCount(1);
    await expect(matchingProduct).toBeVisible();
  }

  // Corresponde al ejercicio 25 (addProductToCart y expectCartCount)
  async addProductToCart(productName: string) {
    const itemCard = this.inventoryItems.filter({ hasText: productName }).first();
    await expect(itemCard).toBeVisible();
    const addToCartButton = itemCard.getByRole('button', { name: /add to cart/i });
    await addToCartButton.click();
  }

  async expectCartCount(expectedCount: number) {
    await expect(this.cartBadge).toHaveText(expectedCount.toString());
  }
}