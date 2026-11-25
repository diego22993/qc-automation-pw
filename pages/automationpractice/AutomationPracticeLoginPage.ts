import { Locator, Page } from "@playwright/test";

export class AutomationPracticeLoginPage {
  private readonly page: Page;
  private readonly inputUsername: Locator;
  private readonly inputPassword: Locator;
  private readonly submitButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputUsername = page.locator("#username");
    this.inputPassword = page.locator("#password");
    this.submitButton = page.locator("#submit");
    this.errorMessage = page.locator("#error");
  }

  async goto() {
    await this.page.goto(
      "https://practicetestautomation.com/practice-test-login/",
    );
  }

  async login(username: string, password: string) {
    await this.inputUsername.fill(username);
    await this.inputPassword.fill(password);
    await this.submitButton.click();
  }

  getErrorMessage() {
    return this.errorMessage;
  }
}
