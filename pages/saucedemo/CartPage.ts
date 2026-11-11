import { Page, Locator } from "@playwright/test";


export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async goToCart() {
    await this.page.goto("https://www.saucedemo.com/cart.html");
  }

}