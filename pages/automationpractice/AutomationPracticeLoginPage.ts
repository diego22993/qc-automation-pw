import type { Locator, Page } from "@playwright/test";

export class AutomationPracticeLoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.submitButton = page.locator("#submit");
    this.errorMessage = page.locator("#error");
  }

  async goto(): Promise<void> {
    await this.page.goto(
      "https://practicetestautomation.com/practice-test-login/",
    );
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getErrorMessage(): Promise<string | null> {
    await this.errorMessage.waitFor({ state: "visible" });
    return this.errorMessage.textContent();
  }
}
