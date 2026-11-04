import { Page, Locator } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingResultsPage extends BookingBasePage {
  readonly freeCancellationFilter: Locator;
  readonly reviewScoreFilter: Locator;
  readonly propertyCard: Locator;

  constructor(page: Page) {
    super(page);
    // Selectores limpios y robustos basados en expresiones regulares de texto visible
    this.freeCancellationFilter = page.locator('text=/Cancelación gratuita|Free cancellation/i');
    this.reviewScoreFilter = page.locator('text=/Very Good|Muy bueno/i').first();
    this.propertyCard = page.locator('[data-testid="property-card"]');
  }

  async applyFreeCancellationFilter() {
    await this.clickElement(this.freeCancellationFilter.first());
  }

  async applyReviewScoreFilter() {
    await this.clickElement(this.reviewScoreFilter);
  }

  async validateResultsAreDisplayed() {
    await this.propertyCard.first().waitFor({ state: 'visible' });
  }
}