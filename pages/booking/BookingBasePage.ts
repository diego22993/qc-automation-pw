import { Page, Locator } from '@playwright/test';

export abstract class BookingBasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    // Booking redirige/recarga la home a los pocos segundos (idioma o verificación anti-bot).
    // Esperamos a que la red quede quieta para no escribir en una página que se va a recargar.
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    await this.dismissModalsIfPresent();
  }

  async dismissModalsIfPresent() {
    // Manejo de banners de Cookies o Popups emergentes comunes en Booking
    const cookieAcceptBtn = this.page.locator('#onetrust-accept-btn-handler');
    const closeSignInModalBtn = this.page.locator('button[aria-label="Dismiss sign-in info."]');

    if (await cookieAcceptBtn.isVisible()) {
      await cookieAcceptBtn.click();
    }

    // El modal de login aparece con unos segundos de demora:
    // esperamos hasta 5s a que aparezca; si no aparece, seguimos normalmente.
    try {
      await closeSignInModalBtn.waitFor({ state: 'visible', timeout: 5000 });
      await closeSignInModalBtn.click();
    } catch {
      // No apareció el modal
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
