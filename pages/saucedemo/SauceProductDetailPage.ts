import { Locator, Page } from "@playwright/test";
import { SauceHeader } from "./SauceHeader";

export class SauceProductDetailPage {
  private readonly page: Page;
  private readonly productImage: Locator;
  private readonly productName: Locator;
  private readonly productDescription: Locator;
  private readonly productPrice: Locator;
  private readonly addToCartButton: Locator;
  private readonly removeFromCartButton: Locator;
  private readonly btnBackToProducts: Locator;
  private readonly header: SauceHeader;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.getByRole("button", {
      name: "Add to cart",
      exact: true,
    });
    this.removeFromCartButton = page.getByRole("button", {
      name: "Remove",
      exact: true,
    });
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.productDescription = page.locator('[data-test="inventory-item-desc"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.productImage = page.locator('[data-test$="-img"]');
    this.btnBackToProducts = page.locator('[data-test="back-to-products"]');
    this.header = new SauceHeader(page);
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async removeFromCart(): Promise<void> {
    await this.removeFromCartButton.click();
  }

  async isRemoveButtonVisible(): Promise<boolean> {
    return this.removeFromCartButton.isVisible();
  }

  async isAddToCartButtonVisible(): Promise<boolean> {
    return this.addToCartButton.isVisible();
  }

  async isProductNameVisible(): Promise<boolean> {
    return this.productName.isVisible();
  }

  async isProductDescriptionVisible(): Promise<boolean> {
    return this.productDescription.isVisible();
  }

  async isProductPriceVisible(): Promise<boolean> {
    return this.productPrice.isVisible();
  }

  async toggleAddToCart(): Promise<void> {
    if (await this.isAddToCartButtonVisible()) {
      await this.addToCart();
      return;
    }

    await this.removeFromCart();
  }

  async isShoppingCartLinkVisible(): Promise<boolean> {
    return this.header.isCartLinkVisible();
  }

  async isProductImageVisible(): Promise<boolean> {
    return this.productImage.isVisible();
  }

  async goToShoppingCart(): Promise<void> {
    await this.header.openCart();
  }

  async goBackToProducts(): Promise<void> {
    await this.btnBackToProducts.click();
  }

  async validateUrl(): Promise<boolean> {
    return this.page.url().includes("inventory-item.html");
  }
}
