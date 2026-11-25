import { Locator, Page } from "@playwright/test";

export class SauceCheckoutOverviewPage {
  private readonly page: Page;
  private readonly btnFinish: Locator;
  private readonly btnCancel: Locator;
  private readonly cartItemNames: Locator;
  private readonly subtotalLabel: Locator;
  private readonly taxLabel: Locator;
  private readonly totalLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnFinish = page.locator('[data-test="finish"]');
    this.btnCancel = page.locator('[data-test="cancel"]');
    this.cartItemNames = page.locator('[data-test="inventory-item-name"]');
    this.subtotalLabel = page.locator(".summary_subtotal_label");
    this.taxLabel = page.locator(".summary_tax_label");
    this.totalLabel = page.locator(".summary_total_label");
  }

  async getItemCount(): Promise<number> {
    return this.cartItemNames.count();
  }

  async getItemNames(): Promise<string[]> {
    return this.cartItemNames.allTextContents();
  }

  async getSubtotal(): Promise<string> {
    return this.subtotalLabel.innerText();
  }

  async getTax(): Promise<string> {
    return this.taxLabel.innerText();
  }

  async getTotal(): Promise<string> {
    return this.totalLabel.innerText();
  }

  async finish(): Promise<void> {
    await this.btnFinish.click();
  }

  async cancel(): Promise<void> {
    await this.btnCancel.click();
  }
}
