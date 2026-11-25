import { Locator, Page } from "@playwright/test";

export class PracticeTestLoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly errorMessage: Locator;
  private readonly successMessage: Locator;
  private readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.submitButton = page.locator("#submit");
    this.errorMessage = page.locator("#error");
    this.successMessage = page.getByText(
      /Congratulations|successfully logged in/i,
    );
    this.logoutButton = page.getByRole("link", { name: "Log out" });
  }

  async goto() {
    await this.page.goto(
      "https://practicetestautomation.com/practice-test-login/",
    );
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  getErrorMessage() {
    return this.errorMessage;
  }

  getSuccessMessage() {
    return this.successMessage;
  }

  getLogoutButton() {
    return this.logoutButton;
  }
}
