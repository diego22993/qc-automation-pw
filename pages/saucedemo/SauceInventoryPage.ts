import { expect, Locator, Page } from "@playwright/test";

export class SauceInventoryPage {
  private readonly page: Page;
  private readonly inventoryTitle: Locator;
  private readonly productNames: Locator;
  private readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryTitle = page.getByText("Products", { exact: true });
    this.productNames = page.locator(".inventory_item_name");
    this.productPrices = page.locator(".inventory_item_price");
  }
  async orderByName(option: string, expectedResult: string) {
    await this.page.locator(".product_sort_container").selectOption(option);
    const firstProductName = await this.page
      .locator(".inventory_item_name")
      .first()
      .textContent();
    expect(firstProductName).toBe(expectedResult);
  }

  // Luego comprueba que los nombres visibles estén realmente en ese orden.
  async getProductNames() {
    return this.productNames.allTextContents();
  }
  // Luego comprueba que los precios visibles estén realmente en ese orden.
  async getProductPrices() {
    return this.productPrices.allTextContents();
  }

  async addProductToCart(productName: string) {
    await this.page
      .locator(".inventory_item")
      .filter({ hasText: productName })
      .getByRole("button", { name: "Add to cart" })
      .click();
  }

  async getCartBadgeText() {
    return this.page.locator(".shopping_cart_badge").textContent();
  }

  async isCartBadgeVisible() {
    return this.page.locator(".shopping_cart_badge").isVisible();
  }

  async openCart() {
    await this.page.locator(".shopping_cart_link").click();
  }

  async orderByPrice(option: string, expectedResult: string) {
    await this.page.locator(".product_sort_container").selectOption(option);
    const firstProductPrice = await this.page
      .locator(".inventory_item_price")
      .first()
      .textContent();
    expect(firstProductPrice).toBe(expectedResult);
  }

  async openProductDetail(productName: string) {
    await this.page.getByText(productName, { exact: true }).click();
  }

  async openInventoryDirectly() {
    await this.page.goto("/inventory.html");
  }
}
