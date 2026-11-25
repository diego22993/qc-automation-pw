import { expect, Locator, Page } from "@playwright/test";

export class SauceLoginPage {
  private readonly page: Page;
  private readonly inputUsername: Locator;
  private readonly inputPassword: Locator;
  private readonly btnLogin: Locator;
  private readonly errorMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputUsername = page.locator('[data-test="username"]');
    this.inputPassword = page.locator('[data-test="password"]');
    this.btnLogin = page.locator('[data-test="login-button"]');
    this.errorMsg = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(username: string, password: string) {
    await this.inputUsername.fill(username);
    await this.inputPassword.fill(password);
    await this.btnLogin.click();
  }

  async getErrorMessage() {
    return await this.errorMsg.textContent();
  }

  async getInventoryPageVisible() {
    await this.page.waitForURL(/inventory.html/);
    await expect(this.page.getByText("Products", { exact: true })).toBeVisible();
    return true;
  }

  // definimos el método async logout para cerrar sesión desde el menú lateral.
  async logout() {
    await this.page.getByRole("button", { name: "Open Menu" }).click();
    await this.page.locator('[data-test="logout-sidebar-link"]').click();
    await this.inputUsername.waitFor({ state: "visible" });
  }

  // método async para validar visibilidad del campo de usuario.
  async isUsernameVisible() {
    return await this.inputUsername.isVisible();
  }
  // método async para validar visibilidad del campo de contraseña.
  async isPasswordVisible() {
    return await this.inputPassword.isVisible();
  }
  // método async para validar visibilidad del botón de login.
  async isLoginButtonVisible() {
    return await this.btnLogin.isVisible();
  }

  // método asyncrono que retorne la creación de una instancia de inventory page después del login exitoso.
  async goToInventoryPage() {
    await this.page.waitForURL(/inventory.html/);
    const { SauceInventoryPage } = await import("./SauceInventoryPage");
    return new SauceInventoryPage(this.page);
  }
}
