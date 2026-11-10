import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(path: string): Promise<void> {
        await this.page.goto(path);
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }
}