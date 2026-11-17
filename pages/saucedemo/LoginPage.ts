import { expect, type Locator, type Page } from "@playwright/test";

/**
 * Page Object del formulario de login de SauceDemo.
 */
export class LoginPage {
  static readonly URL = "https://www.saucedemo.com/";

  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  /** Abre la pagina de login y espera a que el formulario este visible. */
  async goto(): Promise<void> {
    await this.page.goto(LoginPage.URL);
    await expect(this.usernameInput).toBeVisible();
  }

  /** Completa usuario y contrasena y pulsa Login. */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Valida que el login llevo al inventario (URL y titulo Products). */
  async expectInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.page.locator('[data-test="title"]')).toHaveText("Products");
  }
}
