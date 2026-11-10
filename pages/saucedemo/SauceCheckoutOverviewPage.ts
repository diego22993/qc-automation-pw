
import { Locator, Page } from "@playwright/test";

export class SauceCheckoutOverviewPage{
    private readonly page: Page;
    private readonly btnFinish: Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnFinish = page.locator('[data-test="finish"]');
    }
    
    async finish() {
        await this.btnFinish.click();
    }
}