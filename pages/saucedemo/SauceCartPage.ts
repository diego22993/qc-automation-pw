import { Locator, Page } from "@playwright/test";
import { SauceHeader } from "./SauceHeader";

export class SauceCartPage {
  private readonly page: Page;
  private readonly btnCheckout: Locator;
  private readonly btnContinueShopping: Locator;
  private readonly cartItemNames: Locator;
  private readonly header: SauceHeader;

  constructor(page: Page) {
    this.page = page;
    this.btnCheckout = page.locator('[data-test="checkout"]');
    this.btnContinueShopping = page.locator('[data-test="continue-shopping"]');
    this.cartItemNames = page.locator('[data-test="inventory-item-name"]');
    this.header = new SauceHeader(page);
  }

  async getItemCount(): Promise<number> {
    return this.cartItemNames.count();
  }

  async getItemNames(): Promise<string[]> {
    return this.cartItemNames.allTextContents();
  }

  async getCartBadgeText(): Promise<string> {
    return this.header.getCartBadgeText();
  }

  async isCartBadgeVisible(): Promise<boolean> {
    return this.header.isCartBadgeVisible();
  }

  async checkout(): Promise<void> {
    await this.btnCheckout.click();
  }

  async removeProduct(productName: string): Promise<void> {
    const productId = productName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    await this.page.locator(`[data-test="remove-${productId}"]`).click();
  }

  async continueShopping(): Promise<void> {
    await this.btnContinueShopping.click();
  }

  async goToShoppingCart(): Promise<void> {
    await this.header.openCart();
  }

  async logout(): Promise<void> {
    await this.header.logout();
  }
}
