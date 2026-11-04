import { test, expect } from '@playwright/test';
import { BookingSearchPage } from '../../pages/booking/BookingSearchPage';
import { BookingResultsPage } from '../../pages/booking/BookingResultsPage';

test('Actividad 1: Búsqueda dinámica con manejo de modales en Booking', { tag: ['@booking', '@smoke'] }, async ({ page }) => {
  const searchPage = new BookingSearchPage(page);
  const resultsPage = new BookingResultsPage(page);

  await searchPage.navigate();
  
  // Si aparece algún modal o cartel de cookies inicial, lo cerramos o manejamos si es necesario
  await searchPage.searchDestination('Madrid');
  await resultsPage.validateResultsAreDisplayed();
  
  expect(page.url()).toContain('searchresults');
});