
import { test, expect } from '@playwright/test';

import { BookingCheckoutPage } from '../Booking/page/BookingCheckoutPage';

test('Actividad 4 - Validar campos obligatorios vacíos', async ({ page }) => {

  // TODO:
  // Navegar hasta el formulario real de datos del huésped.
  // Reutilizar la búsqueda y la ficha del alojamiento.

  const checkout = new BookingCheckoutPage(page);

  // Ejecutar solamente cuando el formulario esté visible
  await checkout.submitEmptyForm();

  // Validar errores HTML5
  await checkout.validateRequiredFields();

  console.log('Validaciones negativas verificadas');
});
