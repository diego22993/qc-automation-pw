import { test, expect } from '@playwright/test';
import { BookingSearchPage } from '../../pages/booking/BookingSearchPage';
import { BookingResultsPage } from '../../pages/booking/BookingResultsPage';

test('Actividad 2: Aplicar filtros y validar resultados', async ({ page }) => {
  const searchPage = new BookingSearchPage(page);
  const resultsPage = new BookingResultsPage(page);

  await searchPage.navigate();
  await searchPage.searchDestination('Madrid');

  // Esperamos que los resultados aparezcan antes de filtrar
  await resultsPage.validateResultsAreDisplayed();

  // Aplicamos el filtro de cancelación gratuita
  await resultsPage.applyFreeCancellationFilter();

  // Validamos que sigan apareciendo resultados después de filtrar
  await resultsPage.validateResultsAreDisplayed();
});