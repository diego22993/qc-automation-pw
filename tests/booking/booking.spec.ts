
import { test, expect } from '../../Fixtures/BookingFixture';
import { BookingDetail } from '../../pages/booking/BookingDetail';

test('Búsqueda, Filtros y Nueva Pestaña (Actividades 1, 2 y 3)', async ({ page, context, searchPage, resultsPage }) => {
  
  // --- ACT 1: BÚSQUEDA ---
  await searchPage.goto();
  await searchPage.searchDestination('Madrid');
  
  // --- ACT 2: RESULTADOS Y FILTROS ---
  await resultsPage.applyFreeCancellationFilter();
  const hotelesEncontrados = await resultsPage.getResultsCount();
  expect(hotelesEncontrados).toBeGreaterThan(0);
  
  // --- MANEJO DE POPUP INESPERADO ---
  // Buscamos el botón de cerrar usando su 'name' accesible (aria-label)
  const closePopupButton = page.getByRole('button', { name: 'Dismiss sign-in info.' });
  if (await closePopupButton.isVisible()) {
      await closePopupButton.click();
  }
  
  // --- ACT 3: ABRIR LA NUEVA PESTAÑA ---
const pagePromise = context.waitForEvent('page');

// El clic que ocurre acá adentro debe disparar la apertura de la pestaña nueva
await resultsPage.clickFirstResult(); 

const nuevaPestana = await pagePromise;
await nuevaPestana.waitForLoadState('domcontentloaded');

const detailPage = new BookingDetail(nuevaPestana);
const tituloHotel = await detailPage.getHotelTitle();
expect(tituloHotel.length).toBeGreaterThan(0);
});