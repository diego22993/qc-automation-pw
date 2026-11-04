import { test } from '@playwright/test';
import { BookingBasePage } from '../../pages/booking/BookingBasePage';
import { BookingSearchPage } from '../../pages/booking/BookingSearchPage';
import { BookingResultsPage } from '../../pages/booking/BookingResultsPage';
import { BookingCheckoutPage } from '../../pages/booking/BookingCheckoutPage';

test('Actividad 4: Validaciones negativas en formulario vacío', async ({ page, context }) => {
  const basePage = new BookingBasePage(page);
  const searchPage = new BookingSearchPage(page);
  const resultsPage = new BookingResultsPage(page);
  const checkoutPage = new BookingCheckoutPage(page);

  // 1. Navegar a Booking con estrategia domcontentloaded para evitar bloqueos
  await basePage.navigate();

  // 2. Buscar destino
  await searchPage.searchDestination('Madrid');

  // 3. Validar resultados y seleccionar un alojamiento
  await resultsPage.validateResultsAreDisplayed();
  const firstHotelLink = resultsPage.propertyCard.first().locator('a').first();

  const [newPage] = await Promise.all([
    context.waitForEvent('page', { timeout: 5000 }).catch(() => null),
    firstHotelLink.click({ force: true }),
  ]);

  const targetPage = newPage || page;
  
  // Espera segura sin bloquear la ejecución si el estado ya cargó
  await targetPage.waitForLoadState('domcontentloaded').catch(() => {});

  // 4. Ir al checkout / formulario de reserva de forma resiliente
  const reserveButton = targetPage.locator('button:has-text("I\'ll reserve"), button:has-text("Reservar"), a:has-text("Reserve"), button[type="submit"]').first();
  if (await reserveButton.isVisible({ timeout: 6000 }).catch(() => false)) {
    await reserveButton.click({ force: true });
  }

  // 5. Validar las restricciones en el formulario
  await checkoutPage.validateRequiredFields();
});