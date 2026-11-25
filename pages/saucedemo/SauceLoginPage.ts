import { Locator, Page } from "@playwright/test";
import { SauceHeader } from "./SauceHeader";
import { SauceInventoryPage } from "./SauceInventoryPage";

export class SauceLoginPage {
  private readonly page: Page;
  private readonly inputUsername: Locator;
  private readonly inputPassword: Locator;
  private readonly btnLogin: Locator;
  private readonly errorMsg: Locator;
  private readonly header: SauceHeader;

  constructor(page: Page) {
    this.page = page;
    this.inputUsername = page.locator('[data-test="username"]');
    this.inputPassword = page.locator('[data-test="password"]');
    this.btnLogin = page.locator('[data-test="login-button"]');
    this.errorMsg = page.locator('[data-test="error"]');
    this.header = new SauceHeader(page);
  }

  async goto() {
    await this.page.goto("/");
  }

  async login(username: string, password: string) {
    await this.inputUsername.fill(username);
    await this.inputPassword.fill(password);
    await this.btnLogin.click();
  }

  async getErrorMessage() {
    return this.errorMsg.innerText();
  }

  async waitForInventoryPage(): Promise<void> {
    await this.page.waitForURL(/inventory.html/);
    await this.page.locator('[data-test="title"]').waitFor({ state: "visible" });
  }

  async logout() {
    await this.header.logout();
    await this.inputUsername.waitFor({ state: "visible" });
  }

  async isUsernameVisible() {
    return this.inputUsername.isVisible();
  }

  async isPasswordVisible() {
    return this.inputPassword.isVisible();
  }

  async isLoginButtonVisible() {
    return this.btnLogin.isVisible();
  }

  async goToInventoryPage() {
    await this.waitForInventoryPage();
    return new SauceInventoryPage(this.page);
  }
}
