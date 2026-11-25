
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

  // ========================================
  // LOCATORS
  // ========================================

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  // ========================================
  // CONSTRUCTOR
  // ========================================

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.locator(
      '[data-test="username"]'
    );

    this.passwordInput = page.locator(
      '[data-test="password"]'
    );

    this.loginButton = page.locator(
      '[data-test="login-button"]'
    );

    this.errorMessage = page.locator(
      '[data-test="error"]'
    );
  }

  // ========================================
  // ABRIR PAGINA DE LOGIN
  // ========================================

  async open(): Promise<void> {

    await this.navigateTo(
      'https://www.saucedemo.com/'
    );

    await expect(this.loginButton).toBeVisible();

    console.log('Página de login abierta');
  }

  // ========================================
  // REALIZAR LOGIN
  // ========================================

  async login(
    username: string,
    password: string
  ): Promise<void> {

    await this.usernameInput.fill(username);

    await this.passwordInput.fill(password);

    await this.loginButton.click();

    console.log('Login ejecutado:', username);
  }

  // ========================================
  // VALIDAR LOGIN EXITOSO
  // ========================================

  async validateSuccessfulLogin(): Promise<void> {

    await expect(this.page).toHaveURL(
      /inventory\.html/
    );

    console.log('Login exitoso');
  }

  // ========================================
  // VALIDAR MENSAJE DE ERROR
  // ========================================

  async validateError(
    expectedMessage: string
  ): Promise<void> {

    await expect(this.errorMessage).toBeVisible();

    await expect(this.errorMessage).toContainText(
      expectedMessage
    );

    console.log(
      'Mensaje de error validado:',
      expectedMessage
    );
  }
}
