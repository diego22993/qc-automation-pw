import { test, expect } from '@playwright/test';
import { BookingSearchPage } from '../../pages/booking/BookingSearchPage';
import { BookingResultsPage } from '../../pages/booking/BookingResultsPage';

test('Actividad 3: Capturar nueva pestaña al seleccionar alojamiento', async ({ page, context }) => {
  const searchPage = new BookingSearchPage(page);
  const resultsPage = new BookingResultsPage(page);

  await searchPage.navigate();
  await searchPage.searchDestination('Madrid');

  await resultsPage.validateResultsAreDisplayed();

  const firstHotelLink = resultsPage.propertyCard.locator('[data-testid="title-link"]').first();
  await firstHotelLink.waitFor({ state: 'visible' });

  // Manejo de la nueva pestaña asegurando el click con { force: true } para evitar overlays
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    firstHotelLink.click({ force: true }),
  ]);

  await newPage.waitForLoadState();
  expect(newPage.url()).toContain('hotel');
});