import { Page, Locator } from '@playwright/test';

export class BookingBasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navega a la URL base configurada en playwright.config.ts
   */
  // pages/booking/BookingBasePage.ts
// pages/booking/BookingBasePage.ts
async navigate() {
  await this.page.goto('/', { waitUntil: 'domcontentloaded' });
}

  /**
   * Espera a que un elemento esté visible y realiza un clic
   */
  async clickElement(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /**
   * Espera a que un campo de texto esté visible y completa su contenido
   */
  async typeText(locator: Locator, text: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }
}