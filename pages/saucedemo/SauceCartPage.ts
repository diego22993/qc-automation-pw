
import { Locator, Page } from "@playwright/test";

export class SauceCartPage{
    private readonly page: Page;
    private readonly btnCheckout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnCheckout = page.locator('[data-test="checkout"]');
    }
    
    async checkout() {
        await this.btnCheckout.click();
    }
}