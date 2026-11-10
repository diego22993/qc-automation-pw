import { expect, Locator, Page } from "@playwright/test";

export class SauceInventoryPage {
  private readonly page: Page;
  private readonly inventoryTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryTitle = page.getByText("Products", { exact: true });
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async orderBy(option: string, expectedResult: string) {
    await this.page.locator(".product_sort_container").selectOption(option);
    const firstProductName = await this.page
      .locator(".inventory_item_name")
      .first()
      .textContent();
    expect(firstProductName).toBe(expectedResult);
  }
}
