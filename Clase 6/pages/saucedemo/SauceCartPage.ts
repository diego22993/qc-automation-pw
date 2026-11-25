import { Locator, Page } from "@playwright/test";

export class SauceCartPage {
  private readonly page: Page;
  private readonly btnCheckout: Locator;
  private readonly txtTitle: Locator;
  private readonly btnRemove: Locator;
  private readonly btnContinueShopping: Locator;
  private readonly txtQuantity: Locator;
  private readonly txtDescription: Locator;
  private readonly shoppingCartLink: Locator;
  private readonly lblTitle: Locator;
  private readonly lblQuantity: Locator;
  private readonly lblDescription: Locator;
  private readonly cartItems: Locator;
  private readonly cartItemNames: Locator;
  private readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtTitle = page.locator('[data-test="title"]');
    this.btnCheckout = page.locator('[data-test="checkout"]');
    this.btnRemove = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.btnContinueShopping = page.locator('[data-test="continue-shopping"]');
    this.txtQuantity = page.locator('[data-test="cart-quantity-label"]');
    this.txtDescription = page.locator('[data-test="cart-desc-label"]');
    this.shoppingCartLink = page.locator(".shopping_cart_link");
    this.lblTitle = page.locator('[data-test="inventory-item-name"]');
    this.lblQuantity = page.locator('[data-test="inventory-item-quantity"]');
    this.lblDescription = page.locator('[data-test="inventory-item-desc"]');
    this.cartItems = page.locator(".cart_item");
    this.cartItemNames = page.locator(".inventory_item_name");
    this.cartBadge = page.locator(".shopping_cart_badge");
  }

  async getItemCount() {
    return this.cartItems.count();
  }

  async getItemNames() {
    return this.cartItemNames.allTextContents();
  }

  async getCartBadgeText() {
    return this.cartBadge.textContent();
  }

  async isCartBadgeVisible() {
    return this.cartBadge.isVisible();
  }

  async checkout() {
    await this.btnCheckout.click();
  }

  async removeItem() {
    await this.btnRemove.click();
  }

  async removeProduct(productName: string) {
    await this.cartItems
      .filter({ hasText: productName })
      .getByRole("button", { name: "Remove" })
      .click();
  }

  async continueShopping() {
    await this.btnContinueShopping.click();
  }

  async goToShoppingCart() {
    await this.shoppingCartLink.click();
  }

  async logout() {
    await this.page.locator("#logout_sidebar_link").click();
  }
}
