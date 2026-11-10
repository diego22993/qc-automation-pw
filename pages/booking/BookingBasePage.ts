import { Page, Locator, test } from '@playwright/test';

export abstract class BookingBasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async dismissModalsIfPresent() {
    // Selector más genérico para el botón "X" de cerrar el popup de inicio de sesión de Booking
    const closeSignInModalBtn = this.page.locator('button[aria-label="Dismiss sign-in info."], button[aria-label="Cerrar el cuadro de diálogo de inicio de sesión"]');
    
    try {
      // Esperamos un momento breve por si el popup tarda un segundo en aparecer
      await this.page.waitForTimeout(1500);
      
      if (await closeSignInModalBtn.isVisible()) {
        await closeSignInModalBtn.click();
        // Le damos tiempo a que la animación de cierre termine
        await this.page.waitForTimeout(1000);
      }
    } catch (error) {
      // Si falla o no aparece, ignoramos el error para que el test siga
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