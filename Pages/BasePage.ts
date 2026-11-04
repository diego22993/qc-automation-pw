import { Locator, Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

    async clickElement(locator: Locator) {
    await locator.click();
  }

  async dismissModalIfPresent() {
  }
}