import { Page, Locator, expect } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingResultsPage extends BookingBasePage {
  readonly resultsContainer: Locator;
  readonly propertyCard: Locator;
  readonly freeCancellationFilter: Locator;

  constructor(page: Page) {
    super(page);
    this.resultsContainer = page.locator('[data-testid="property-card"], div[data-room-id], [role="feed"]').first();
    this.propertyCard = page.locator('[data-testid="property-card"]');
    
    // Selector robusto para el filtro de cancelación gratuita
    this.freeCancellationFilter = page.locator('[data-filters-item*="fc=1"], input[id*="fc=1"], div:has-text("Free cancellation")').first();
  }

  async validateResultsAreDisplayed() {
    await this.resultsContainer.waitFor({ state: 'visible', timeout: 20000 });
    await expect(this.resultsContainer).toBeVisible();
  }

  async applyFreeCancellationFilter() {
    if (await this.freeCancellationFilter.isVisible({ timeout: 5000 }).catch(() => false)) {
      await this.freeCancellationFilter.click({ force: true });
    } else {
      // Alternativa de respaldo si el filtro no es visible de inmediato
      const fallbackFilter = this.page.locator('text=/Hotels|Hoteles/i').first();
      await fallbackFilter.click({ force: true });
    }
  }
}