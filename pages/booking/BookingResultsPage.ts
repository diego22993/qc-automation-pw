import { expect, Locator, Page } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingResultsPage extends BookingBasePage {
  private readonly propertyCards: Locator;
  private readonly freeCancellation: Locator;
  private readonly scoreEightPlus: Locator;

  constructor(page: Page) {
    super(page);
    this.propertyCards = page.getByTestId('property-card');
    this.freeCancellation = page.getByRole('checkbox', { name: /^Free cancellation/ }).first();
    this.scoreEightPlus = page.getByRole('checkbox', { name: /^Very good: 8\+/ }).first();
  }

  async applyFreeCancellationFilter(): Promise<void> {
    await this.applyFilter(this.freeCancellation, 'fc=2');
  }

  async applyScoreEightPlusFilter(): Promise<void> {
    await this.applyFilter(this.scoreEightPlus, 'review_score=80');
  }

  async getResultsCount(): Promise<number> {
    // Cuenta tarjetas cargadas en el DOM, no el total anunciado por Booking.
    await expect(this.propertyCards.first()).toBeVisible({ timeout: 15000 });
    return this.propertyCards.count();
  }

  async getReviewScores(): Promise<number[]> {
    const texts = await this.propertyCards.getByTestId('review-score').allTextContents();
    return texts.map(text => {
      const score = text.match(/(?:Scored\s+)?(\d{1,2}[.,]\d)\b/);
      if (!score) throw new Error(`No se pudo interpretar la puntuacion: ${text}`);
      return Number(score[1].replace(',', '.'));
    });
  }

  async areFiltersApplied(): Promise<boolean> {
    return await this.freeCancellation.isChecked() && await this.scoreEightPlus.isChecked();
  }

  private async applyFilter(checkbox: Locator, filter: string): Promise<void> {
    await expect(checkbox).toBeVisible({ timeout: 15000 });
    if (await checkbox.isChecked()) return;

    // Registrar la espera ANTES del clic para no perder una respuesta rapida.
    // Se acepta la navegacion tradicional o la peticion AJAX de resultados.
    const [response] = await Promise.all([
      this.page.waitForResponse(response => {
        const request = response.request();
        const data = decodeURIComponent(request.url() + (request.postData() ?? ''));
        return response.ok() && /searchresults|graphql/.test(request.url()) && data.includes(filter);
      }, { timeout: 20000 }),
      checkbox.check(),
    ]);
    await response.finished();
    await expect(checkbox).toBeChecked();
    await expect(this.page).toHaveURL(url => (url.searchParams.get('nflt') ?? '').split(';').includes(filter));
    await expect(this.propertyCards.first()).toBeVisible({ timeout: 15000 });
  }
}
