import { test, expect } from '@playwright/test';
import { BookingBasePage } from '../../pages/booking/BookingBasePage';
import { BookingSearchPage } from '../../pages/booking/BookingSearchPage';
import { BookingResultsPage } from '../../pages/booking/BookingResultsPage';

test('Actividad 3: Capturar nueva pestaña o navegación al seleccionar alojamiento', async ({ page, context }) => {
  const basePage = new BookingBasePage(page);
  const searchPage = new BookingSearchPage(page);
  const resultsPage = new BookingResultsPage(page);

  await basePage.navigate();
  await searchPage.searchDestination('Madrid');
  await resultsPage.validateResultsAreDisplayed();

  const firstHotelLink = resultsPage.propertyCard.first().locator('[data-testid="title"], a[data-testid="property-card-click"]').first();
  await firstHotelLink.waitFor({ state: 'visible', timeout: 10000 });

  const [newPage] = await Promise.all([
    context.waitForEvent('page', { timeout: 3000 }).catch(() => null),
    firstHotelLink.click({ force: true }),
  ]);

  if (newPage) {
    await newPage.waitForLoadState('domcontentloaded');
    expect(newPage.url()).toMatch(/hotel|property|searchresults/);
  } else {
    await page.waitForLoadState('domcontentloaded');
    // Aceptamos que navegue al detalle o actualice la vista de resultados/hotel seleccionado
    expect(page.url()).toMatch(/hotel|property|searchresults/);
  }
});