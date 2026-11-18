import { Locator, Page } from "@playwright/test";

export class SauceProductDetailPage {
  private readonly page: Page;
  private readonly shoppingCartLink: Locator;
  private readonly productImage: Locator;
  private readonly productName: Locator;
  private readonly productDescription: Locator;
  private readonly productPrice: Locator;
  private readonly btnAddToCart: Locator;
  private readonly btnRemove: Locator;
  private readonly btnBackToProducts: Locator;

  constructor(page: Page) {
    this.page = page;
    const productDetails = page.locator(".inventory_details");
    this.btnAddToCart = page.locator('[data-test="add-to-cart"]');
    this.productName = productDetails.locator(
      '[data-test="inventory-item-name"]',
    );
    this.productDescription = productDetails.locator(
      '[data-test="inventory-item-desc"]',
    );
    this.productPrice = productDetails.locator(
      '[data-test="inventory-item-price"]',
    );
    this.btnRemove = page.getByRole("button", { name: "Remove", exact: true });
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.productImage = page.locator(
      '[data-test="item-sauce-labs-backpack-img"]',
    );
    this.btnBackToProducts = page.locator('[data-test="back-to-products"]');
  }

  async addToCart() {
    await this.btnAddToCart.click();
  }

  async isRemoveButtonVisible() {
    return await this.btnRemove.isVisible();
  }
  async isAddToCartButtonVisible() {
    return await this.btnAddToCart.isVisible();
  }

  async isProductNameVisible() {
    return await this.productName.isVisible();
  }

  async isProductDescriptionVisible() {
    return await this.productDescription.isVisible();
  }

  async isProductPriceVisible() {
    return await this.productPrice.isVisible();
  }

  async toggleAddToCart() {
    if (await this.isAddToCartButtonVisible()) {
      await this.addToCart();
    } else if (await this.isRemoveButtonVisible()) {
      await this.btnRemove.click();
    }
  }

  async isShoppingCartLinkVisible() {
    return await this.shoppingCartLink.isVisible();
  }
  async isProductImageVisible() {
    return await this.productImage.isVisible();
  }

  async goToShoppingCart() {
    await this.shoppingCartLink.click();
  }
  async goBackToProducts() {
    await this.btnBackToProducts.click();
  }
  async validateUrl() {
    return this.page.url().includes("inventory-item.html");
  }
}
