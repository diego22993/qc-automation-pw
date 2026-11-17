import { expect, type Locator, type Page } from "@playwright/test";

/**
 * Opciones del selector de orden: etiqueta visible y valor interno del <select>.
 */
export const SortOption = {
  PriceLowToHigh: "Price (low to high)",
  NameZToA: "Name (Z to A)",
  PriceLowToHighValue: "lohi",
  NameZToAValue: "za",
} as const;

/**
 * Page Object del catalogo de productos (inventory.html) de SauceDemo.
 */
export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  private readonly sortControl: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator(".inventory_item");
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.sortControl = page.getByRole("combobox");
  }

  /** Selecciona una opcion de orden por su etiqueta y verifica el valor resultante. */
  async sortBy(label: string, expectedValue: string): Promise<void> {
    await this.sortControl.selectOption({ label });
    await expect(this.sortControl).toHaveValue(expectedValue);
  }

  /** Verifica que exactamente una tarjeta coincide con el producto y que es visible. */
  async expectOnlyProduct(productName: string): Promise<void> {
    const matchingProduct = this.inventoryItems.filter({ hasText: productName });
    await expect(matchingProduct).toHaveCount(1);
    await expect(matchingProduct).toBeVisible();
  }

  /** Agrega un producto al carrito desde su propia tarjeta del catalogo. */
  async addProductToCart(productName: string): Promise<void> {
    const item = this.inventoryItems.filter({ hasText: productName }).first();
    await expect(item).toBeVisible();
    await item.getByRole("button", { name: "Add to cart" }).click();
  }

  /** Verifica el numero mostrado en el badge del carrito. */
  async expectCartCount(count: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(count));
  }
}
