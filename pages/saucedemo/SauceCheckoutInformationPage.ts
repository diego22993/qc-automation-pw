import { Locator, Page } from "@playwright/test";

export class SauceCheckoutInformationPage{
    private readonly page: Page;
    private readonly btnAddToCart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnAddToCart = page.locator('[data-test="continue"]');
    }
    
    async addToCart() {
        await this.btnAddToCart.click();
    }
}