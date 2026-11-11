import { test, expect } from '@playwright/test';
import { BookingSearchPage } from '../Booking/page/BookingSearchPage';

test('Buscar alojamiento en Booking.com', async ({ page }) => {

  const bookingSearch = new BookingSearchPage(page);

  await bookingSearch.searchDestination(
    'Buenos Aires',
    '2026-12-15',
    '2026-12-20',
    2
  );

  await expect(page).toHaveURL(/\/searchresults/);
});
