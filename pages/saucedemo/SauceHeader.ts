import { Locator, Page } from "@playwright/test";

export class SauceHeader {
  private readonly cartLink: Locator;
  private readonly cartBadge: Locator;
  private readonly menuButton: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.menuButton = page.getByRole("button", { name: "Open Menu" });
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async isCartLinkVisible(): Promise<boolean> {
    return this.cartLink.isVisible();
  }

  async getCartBadgeText(): Promise<string> {
    return this.cartBadge.innerText();
  }

  async isCartBadgeVisible(): Promise<boolean> {
    return this.cartBadge.isVisible();
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
