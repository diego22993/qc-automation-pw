import { test } from '@playwright/test';
import { BookingCheckoutPage } from '../../pages/booking/BookingCheckoutPage';

test('Actividad 4: Validaciones negativas en formulario vacío', async ({ page }) => {
  const checkoutPage = new BookingCheckoutPage(page);

  // Navegamos o simulamos la llegada al checkout si tu flujo lo requiere, 
  // o validamos directamente sobre la página actual de checkout
  await checkoutPage.validateRequiredFields();
});