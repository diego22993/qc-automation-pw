import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';


export class InventoryPage extends BasePage {
    private readonly inventoryItems: Locator;
    private readonly sortSelect: Locator;
    private readonly cartBadge: Locator;

    constructor(page: Page) {
        super(page);
        this.inventoryItems = page.locator('.inventory_item');
        this.sortSelect = page.locator('.product_sort_container')
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async addItemByName(itemName: string): Promise<void> {
        const item = this.inventoryItems.filter({ hasText: itemName });
        await expect(item).toBeVisible();
        await item.getByRole('button', { name: 'Add to cart' }).click();
    }

    async sortByOption(optionValue: "az" | "za" | "lohi" | "hilo"): Promise<void> {
        await this.sortSelect.selectOption(optionValue);
    }

    async getAllProductPrices(): Promise<number[]> {
        const prices = await this.inventoryItems.locator('.inventory_item_price').allInnerTexts();
        return prices.map((price) => parseFloat(price.replace('$', '')));
    }

}