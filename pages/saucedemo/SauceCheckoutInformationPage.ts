import { Locator, Page } from "@playwright/test";
import { SauceHeader } from "./SauceHeader";

export class SauceCheckoutInformationPage {
  private readonly btnContinue: Locator;
  private readonly btnCancel: Locator;
  private readonly inputFirstName: Locator;
  private readonly inputLastname: Locator;
  private readonly inputPostalCode: Locator;
  private readonly errorMessage: Locator;
  private readonly header: SauceHeader;

  constructor(page: Page) {
    this.btnContinue = page.locator('[data-test="continue"]');
    this.btnCancel = page.locator('[data-test="cancel"]');
    this.inputFirstName = page.locator('[data-test="firstName"]');
    this.inputLastname = page.locator('[data-test="lastName"]');
    this.inputPostalCode = page.locator('[data-test="postalCode"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.header = new SauceHeader(page);
  }

  async continue(): Promise<void> {
    await this.btnContinue.click();
  }

  async getErrorMessage(): Promise<string> {
    return this.errorMessage.innerText();
  }

  async cancel(): Promise<void> {
    await this.btnCancel.click();
  }

  async goToShoppingCart(): Promise<void> {
    await this.header.openCart();
  }

  async logout(): Promise<void> {
    await this.header.logout();
  }

  async isContinueButtonVisible(): Promise<boolean> {
    return this.btnContinue.isVisible();
  }

  async isCancelButtonVisible(): Promise<boolean> {
    return this.btnCancel.isVisible();
  }

  async isFirstNameVisible(): Promise<boolean> {
    return this.inputFirstName.isVisible();
  }

  async isLastNameVisible(): Promise<boolean> {
    return this.inputLastname.isVisible();
  }

  async isPostalCodeVisible(): Promise<boolean> {
    return this.inputPostalCode.isVisible();
  }

  async fillDataAndContinue(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    await this.inputFirstName.fill(firstName);
    await this.inputLastname.fill(lastName);
    await this.inputPostalCode.fill(postalCode);
    await this.btnContinue.click();
  }
}
