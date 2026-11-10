
import { Locator, Page } from "@playwright/test";

export class SauceCheckoutCompletePage{
    private readonly page: Page;
    private readonly btnBackHome: Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnBackHome = page.locator('[data-test="back-to-products"]');
    }
    
    async backToHome() {
        await this.btnBackHome.click();
    }
}