import { Locator, Page } from "@playwright/test";

export class SauceCheckoutCompletePage {
  private readonly page: Page;
  private readonly titleLocator: Locator;
  private readonly btnGeneratePDF: Locator;
  private readonly btnBackToHome: Locator;
  private readonly ponyExpressImage: Locator;
  private readonly completeHeader: Locator;
  private readonly completeText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleLocator = page.locator('[data-test="title"]');
    this.btnGeneratePDF = page.getByRole("button", {
      name: "Generate PDF order",
    });
    this.btnBackToHome = page.locator('[data-test="back-to-products"]');
    this.ponyExpressImage = page.locator('[data-test="pony-express"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
  }

  async backToHome() {
    await this.btnBackToHome.click();
  }

  async goToShoppingCart() {
    await this.page.locator(".shopping_cart_link").click();
  }

  async isTitleVisible() {
    return await this.titleLocator.isVisible();
  }
  async isGeneratePDFButtonVisible() {
    return await this.btnGeneratePDF.isVisible();
  }
  async isPonyExpressImageVisible() {
    return await this.ponyExpressImage.isVisible();
  }
  async isCompleteHeaderVisible() {
    return await this.completeHeader.isVisible();
  }
  async getCompleteHeaderText() {
    return this.completeHeader.textContent();
  }
  async isCompleteTextVisible() {
    return await this.completeText.isVisible();
  }

  async generatePDF() {
    await this.btnGeneratePDF.click();
  }
  async isBackToHomeButtonVisible() {
    return await this.btnBackToHome.isVisible();
  }
}
