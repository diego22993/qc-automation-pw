import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly items: Locator;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.locator('[data-test="inventory-item"]');
    this.subtotal = page.locator('[data-test="subtotal-label"]');
    this.tax = page.locator('[data-test="tax-label"]');
    this.total = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
  }

  async expectProduct(name: string) {
    await expect(this.items.filter({ hasText: name })).toBeVisible();
  }

  async finish() {
    await this.finishButton.click();
  }
}
