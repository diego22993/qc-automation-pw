import { test, expect } from '@playwright/test';
import { BookingSearchPage } from '../../pages/booking/BookingSearchPage';
import { BookingResultsPage } from '../../pages/booking/BookingResultsPage';

test('Actividad 5: Búsqueda usando Custom Fixtures', async ({ page }) => {
  const searchPage = new BookingSearchPage(page);
  const resultsPage = new BookingResultsPage(page);

  await searchPage.navigate();
  await searchPage.searchDestination('Barcelona');
  
  await resultsPage.validateResultsAreDisplayed();
  expect(page.url()).toContain('Barcelona');
});