import { Locator, Page } from "@playwright/test";
import { SauceHeader } from "./SauceHeader";

export class SauceCheckoutCompletePage {
  private readonly titleLocator: Locator;
  private readonly btnGeneratePDF: Locator;
  private readonly btnBackToHome: Locator;
  private readonly ponyExpressImage: Locator;
  private readonly completeHeader: Locator;
  private readonly completeText: Locator;
  private readonly header: SauceHeader;

  constructor(page: Page) {
    this.titleLocator = page.locator('[data-test="title"]');
    this.btnGeneratePDF = page.getByRole("button", {
      name: "Generate PDF order",
    });
    this.btnBackToHome = page.locator('[data-test="back-to-products"]');
    this.ponyExpressImage = page.locator('[data-test="pony-express"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.header = new SauceHeader(page);
  }

  async backToHome(): Promise<void> {
    await this.btnBackToHome.click();
  }

  async goToShoppingCart(): Promise<void> {
    await this.header.openCart();
  }

  async isTitleVisible(): Promise<boolean> {
    return this.titleLocator.isVisible();
  }

  async isGeneratePDFButtonVisible(): Promise<boolean> {
    return this.btnGeneratePDF.isVisible();
  }

  async isPonyExpressImageVisible(): Promise<boolean> {
    return this.ponyExpressImage.isVisible();
  }

  async isCompleteHeaderVisible(): Promise<boolean> {
    return this.completeHeader.isVisible();
  }

  async getCompleteHeaderText(): Promise<string> {
    return this.completeHeader.innerText();
  }

  async isCompleteTextVisible(): Promise<boolean> {
    return this.completeText.isVisible();
  }

  async generatePDF(): Promise<void> {
    await this.btnGeneratePDF.click();
  }

  async isBackToHomeButtonVisible(): Promise<boolean> {
    return this.btnBackToHome.isVisible();
  }
}
