import { Page, Locator, expect } from '@playwright/test';

export abstract class BookingBasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    await this.dismissModalsIfPresent();
  }

  async dismissModalsIfPresent() {
    // Manejo de banners de Cookies o Popups emergentes comunes en Booking
    const cookieAcceptBtn = this.page.locator('#onetrust-accept-btn-handler');
    const closeSignInModalBtn = this.page.locator('button[aria-label="Dismiss sign-in info."]');
    

    try {
      if (await cookieAcceptBtn.isVisible({ timeout: 3000 })) {
        await cookieAcceptBtn.click();
      }
      if (await closeSignInModalBtn.isVisible({ timeout: 3000 })) {
        await closeSignInModalBtn.click();
      }
    } catch (error) {
      // Si no aparecen los modales, continúa la ejecución normalmente
    }
  }

  async clickElement(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async typeText(locator: Locator, text: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }
}
