import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

   async goto() {
      await this.page.goto("https://www.saucedemo.com/");
      await expect(this.page).toHaveURL("https://www.saucedemo.com/");
   }

   async login(username: string, password: string) {  
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
   } 
   
   async expectLoginError(message?: RegExp | string): Promise<void> {
     await expect(this.errorMessage).toBeVisible();
     if (message) await expect(this.errorMessage).toContainText(message);
   }

   async expectInventoryPage(): Promise<void> {
     await expect(this.page).toHaveURL(/inventory\.html/);
     await expect(this.page.locator('[data-test="title"]')).toHaveText("Products");
   }

}