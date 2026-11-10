import { Locator, Page } from "@playwright/test";

export class SauceProductDetailPage{
    private readonly page: Page;
    private readonly btnAddToCart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    }
    
    async addToCart() {
        await this.btnAddToCart.click();
    }
}