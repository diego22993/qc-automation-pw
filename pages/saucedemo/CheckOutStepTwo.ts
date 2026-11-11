import { Page, Locator } from "@playwright/test";


export class CheckOutStepTwo {
  readonly page: Page;
  readonly FirstName: Locator;
  readonly checkoutButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.FirstName = page.locator('[data-test="first-name"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async goToCart() {
    await this.page.goto("https://www.saucedemo.com/cart.html");
  }

}