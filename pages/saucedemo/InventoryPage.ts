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

  async orderItem(criterio: string, resultadoEsperado: string) {
    await this.page.getByRole('combobox').selectOption(criterio);
    await expect(this.page.getByRole('option', { name: resultadoEsperado }));
    //await this.page.getByRole('button', { name: 'Add to cart' }).first().click();
  }

  async verifySingleVisibleItem(name: string) {
    const items = this.inventoryItems.filter({ hasText: name });
    await expect(items).toHaveCount(1);
    await expect(items).toBeVisible();
  }

  async addItemToCart(name: string) {
    await this.inventoryItems
      .filter({ hasText: name })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async verifyCartBadge(count: string) {
    await expect(this.cartBadge).toHaveText(count);
  }

}