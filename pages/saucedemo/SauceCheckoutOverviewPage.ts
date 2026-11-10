import { Locator, Page } from "@playwright/test";

export class SauceCheckoutOverviewPage {
  private readonly page: Page;
  private readonly btnFinish: Locator;
  private readonly btnCancel: Locator;
  private readonly cartItems: Locator;
  private readonly cartItemNames: Locator;
  private readonly subtotalLabel: Locator;
  private readonly taxLabel: Locator;
  private readonly totalLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnFinish = page.locator('[data-test="finish"]');
    this.btnCancel = page.locator('[data-test="cancel"]');
    this.cartItems = page.locator(".cart_item");
    this.cartItemNames = page.locator(".inventory_item_name");
    this.subtotalLabel = page.locator(".summary_subtotal_label");
    this.taxLabel = page.locator(".summary_tax_label");
    this.totalLabel = page.locator(".summary_total_label");
  }

  async getItemCount() {
    return this.cartItems.count();
  }

  async getItemNames() {
    return this.cartItemNames.allTextContents();
  }

  async getSubtotal() {
    return this.subtotalLabel.textContent();
  }

  async getTax() {
    return this.taxLabel.textContent();
  }

  async getTotal() {
    return this.totalLabel.textContent();
  }

  async finish() {
    await this.btnFinish.click();
  }

  async cancel() {
    await this.btnCancel.click();
  }
}
