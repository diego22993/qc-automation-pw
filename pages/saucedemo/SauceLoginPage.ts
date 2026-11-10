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
        this.errorMsg = page.getByTestId("error");
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
        return await this.page.getByText("Products", { exact: true }).isVisible();
    }
}
