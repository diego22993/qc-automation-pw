import { Page, Locator } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingResultsPage extends BookingBasePage {
  private freeCancellationFilter: Locator;
  private reviewScoreFilter: Locator;
  private propertyCard: Locator;

  constructor(page: Page) {
    super(page);
    this.freeCancellationFilter = page.locator('input[name="fc=1"], text="Free cancellation"').first();
    this.reviewScoreFilter = page.locator('text="Very Good: 8+"').first();
    this.propertyCard = page.locator('[data-testid="property-card"]');
  }

  async applyFreeCancellationFilter() {
    await this.clickElement(this.freeCancellationFilter);
    await this.page.waitForLoadState('networkidle');
  }

  async applyReviewScoreFilter() {
    await this.clickElement(this.reviewScoreFilter);
    await this.page.waitForLoadState('networkidle');
  }

  async getResultsCount(): Promise<number> {
    return await this.propertyCard.count();
  }
}