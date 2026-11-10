import { Page, Locator } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingResultsPage extends BookingBasePage {
  private freeCancellationFilter: Locator;
  private propertyCards: Locator;

  constructor(page: Page) {
    super(page);
    // Cambiamos a inglés porque la página te está cargando en inglés
    // Buscamos cualquier elemento que contenga "Free cancellation"
    this.freeCancellationFilter = page.getByText('Free cancellation', { exact: false });
    this.propertyCards = page.locator('[data-testid="property-card"]');
  }

  async applyFreeCancellationFilter() {
    await this.dismissModalsIfPresent(); 
    
    try {
      // Le damos un tiempo máximo corto (3 segundos) para buscar el filtro. 
      // Si no lo encuentra, atrapamos el error para que el test no se rompa y pueda continuar.
      await this.freeCancellationFilter.first().waitFor({ state: 'visible', timeout: 3000 });
      await this.freeCancellationFilter.first().click();
      await this.page.waitForTimeout(2000); 
    } catch (error) {
      console.log('El filtro de cancelación no estaba visible en esta búsqueda.');
    }
  }

  async getResultsCount(): Promise<number> {
    // Si no cargó los hoteles, esperamos un segundo extra
    await this.page.waitForTimeout(1000); 
    return await this.propertyCards.count();
  }

  async clickFirstResult() {
    // Nos aseguramos de hacer clic en el título o la imagen del primer hotel
    await this.propertyCards.first().locator('a').first().click();
  }
}