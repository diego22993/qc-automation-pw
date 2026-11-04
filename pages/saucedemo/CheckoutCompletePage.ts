import { expect, type Download, type Page } from "@playwright/test";

export class CheckoutCompletePage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.page.locator('[data-test="complete-header"]')).toHaveText(
      "Thank you for your order!",
    );
  }

  async generatePdf(): Promise<Download> {
    const downloadPromise = this.page.waitForEvent("download");
    await this.page.locator('[data-test="generate-pdf-order"]').click();
    return downloadPromise;
  }
}