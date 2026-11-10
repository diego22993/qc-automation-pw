import { Locator, Page } from "@playwright/test";

export class SauceCheckoutInformationPage {
  private readonly page: Page;
  private readonly btnContinue: Locator;
  private readonly btnCancel: Locator;
  private readonly inputFirstName: Locator;
  private readonly inputLastname: Locator;
  private readonly inputPostalCode: Locator;
  private readonly shoppingCartLink: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnContinue = page.locator('[data-test="continue"]');
    this.btnCancel = page.locator('[data-test="cancel"]');
    this.inputFirstName = page.locator('[data-test="firstName"]');
    this.inputLastname = page.locator('[data-test="lastName"]');
    this.inputPostalCode = page.locator('[data-test="postalCode"]');
    this.shoppingCartLink = page.locator(".shopping_cart_link");
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async continue() {
    await this.btnContinue.click();
  }

  async getErrorMessage() {
    return this.errorMessage.textContent();
  }

  async cancel() {
    await this.btnCancel.click();
  }

  async goToShoppingCart() {
    await this.shoppingCartLink.click();
  }

  async logout() {
    await this.page.locator("#logout_sidebar_link").click();
  }

  async isContinueButtonVisible() {
    return await this.btnContinue.isVisible();
  }
  async isCancelButtonVisible() {
    return await this.btnCancel.isVisible();
  }

  async isFirstNameVisible() {
    return await this.inputFirstName.isVisible();
  }
  async isLastNameVisible() {
    return await this.inputLastname.isVisible();
  }
  async isPostalCodeVisible() {
    return await this.inputPostalCode.isVisible();
  }
  async fillData(firstName: string, lastName: string, postalCode: string) {
    await this.inputFirstName.fill(firstName);
    await this.inputLastname.fill(lastName);
    await this.inputPostalCode.fill(postalCode);
    await this.btnContinue.click();
  }
}
