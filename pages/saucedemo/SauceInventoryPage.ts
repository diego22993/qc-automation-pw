import { Locator, Page } from "@playwright/test";
import { SauceHeader } from "./SauceHeader";

export type ProductSortOption = "az" | "za" | "lohi" | "hilo";

export class SauceInventoryPage {
  private readonly page: Page;
  private readonly inventoryTitle: Locator;
  private readonly productNames: Locator;
  private readonly productPrices: Locator;
  private readonly inventoryItems: Locator;
  private readonly sortSelect: Locator;
  private readonly header: SauceHeader;

  constructor(page: Page) {
    this.page = page;
    this.inventoryTitle = page.locator('[data-test="title"]');
    this.productNames = page.locator('[data-test="inventory-item-name"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.header = new SauceHeader(page);
  }

  async waitUntilLoaded(): Promise<void> {
    await this.inventoryTitle.waitFor({ state: "visible" });
  }

  async sortBy(option: ProductSortOption): Promise<void> {
    await this.sortSelect.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return this.productNames.allTextContents();
  }

  async getProductPrices(): Promise<string[]> {
    return this.productPrices.allTextContents();
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.inventoryItems
      .filter({ hasText: productName })
      .getByRole("button", { name: "Add to cart" })
      .click();
  }

  async getCartBadgeText(): Promise<string> {
    return this.header.getCartBadgeText();
  }

  async isCartBadgeVisible(): Promise<boolean> {
    return this.header.isCartBadgeVisible();
  }

  async openCart(): Promise<void> {
    await this.header.openCart();
  }

  async openProductDetail(productName: string): Promise<void> {
    await this.page.getByText(productName, { exact: true }).click();
  }

  async openInventoryDirectly(): Promise<void> {
    await this.page.goto("/inventory.html");
  }
}
