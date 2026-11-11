
import { test, expect } from '@playwright/test';

import { BookingSearchPage } from '../Booking/page/BookingSearchPage';
import { BookingDetailPage } from '../Booking/page/BookingDetailPage';

test('Actividad 3 - Abrir alojamiento en nueva pestaña', async ({
  page,
  context
}) => {

  // PASO 1 - Buscar alojamiento
  const bookingSearch = new BookingSearchPage(page);

  await bookingSearch.searchDestination(
    'Buenos Aires',
    '2026-12-15',
    '2026-12-20',
    2
  );

  console.log('URL después de buscar:', page.url());

  // PASO 2 - Validar navegación
  await expect(page).toHaveURL(
    /\/searchresults|\/city\//
  );

  // PASO 3 - Seleccionar alojamiento
  const hotelCard = page.locator(
    '[data-testid="property-card"]'
  ).first();

  await expect(hotelCard).toBeVisible({
    timeout: 15000
  });

  const hotelName = hotelCard.locator(
    '[data-testid="title"]'
  );

  await expect(hotelName).toBeVisible();

  const selectedHotel = (
    await hotelName.innerText()
  ).trim();

  console.log('Hotel seleccionado:', selectedHotel);

  // PASO 4 - Capturar nueva pestaña
  const newPagePromise = context.waitForEvent('page', {
    timeout: 15000
  });

  await hotelName.click();

  const newPage = await newPagePromise;

  await newPage.waitForLoadState('domcontentloaded');

  console.log('Nueva pestaña:', newPage.url());

  expect(newPage).not.toBe(page);

  // PASO 5 - Crear Page Object
  const bookingDetail = new BookingDetailPage(newPage);

  // PASO 6 - Validar título
  await bookingDetail.validateHotelTitle(
    selectedHotel
  );

  console.log('Actividad 3 completada correctamente');
});

