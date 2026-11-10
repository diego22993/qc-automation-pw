import { Page, Locator, test } from '@playwright/test';

export abstract class BookingBasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = '/') {
    await test.step(`Navegar a la Pagina ${path}`, async () => { // Agregar una descripción para el reporte de Playwright
    await this.page.goto(path, { waitUntil: 'domcontentloaded' }); }); // Navegar a la URL especificada y esperar a que el DOM esté completamente cargado
    await this.dismissModalsIfPresent(); // Despues de navegar, intentar cerrar cualquier modal o banner que pueda aparecer
  }

  async dismissModalsIfPresent() {
    // Manejo de banners de Cookies o Popups emergentes comunes en Booking
    await test.step('Cerrar modales si están presentes', async () => { // Agregar una descripción para el reporte de Playwright
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
      });
  }

  async clickElement(locator: Locator) {
    await test.step('Hacer clic en el elemento', async () => { // Agregar una descripción para el reporte de Playwright
    await locator.waitFor({ state: 'visible' });
    await locator.click();
    });
  }

  async typeText(locator: Locator, text: string) {
    await test.step('Escribir texto en el elemento', async () => { // Agregar una descripción para el reporte de Playwright
      await locator.waitFor({ state: 'visible' });
      await locator.fill(text);
    });
  }
}
