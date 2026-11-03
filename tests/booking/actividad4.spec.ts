import type { Page } from '@playwright/test';
import { test, expect } from '../../fixtures/bookingFixtures';
import type { GuestField, GuestFieldValidation } from '../../pages/booking/BookingCheckoutPage';

test('Actividad 4: rechazar nombre, apellido y email vacios en checkout',
  { tag: ['@booking', '@actividad4'] }, async ({ page, context, searchPage, searchResultsPage, hotelTab, detailPage, checkoutPage }, testInfo) => {
    test.setTimeout(150000);
    const today = new Date();
    const iso = (day: number) => {
      const date = new Date(today.getFullYear(), today.getMonth() + 2, day);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };
    let detailTab: Page;
    let checkoutUrl: string;

    await test.step('Preparar busqueda y filtros reutilizando las actividades anteriores', async () => {
      await searchPage.goto();
      await searchPage.setGuests(2, 1);
      await searchPage.searchDestination('Madrid', iso(10), iso(15));
      // Recuperacion acotada ante la redireccion observada en la actividad 3.
      if (new URL(page.url()).pathname.startsWith('/city/')) {
        await testInfo.attach('redireccion-en-preparacion', {
          body: JSON.stringify({ url: page.url(), action: 'Volver al inicio y repetir una vez la busqueda desde la interfaz' }),
          contentType: 'application/json',
        });
        await searchPage.goto();
        await searchPage.setGuests(2, 1);
        await searchPage.searchDestination('Madrid', iso(10), iso(15));
      }
      await expect(page).toHaveURL(/\/searchresults/);
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Madrid');
      await searchResultsPage.applyFreeCancellationFilter();
      await searchResultsPage.applyScoreEightPlusFilter();
      expect(await searchResultsPage.getResultsCount()).toBeGreaterThan(0);
    });
    await test.step('Abrir la ficha en otra pestana y elegir una habitacion', async () => {
      const expectedName = await searchResultsPage.getFirstHotelName();
      const [newTab] = await Promise.all([
        context.waitForEvent('page', { timeout: 20000 }), searchResultsPage.selectFirstHotel(),
      ]);
      detailTab = newTab;
      hotelTab.bind(newTab);
      expect(await detailTab.opener()).toBe(page);
      await detailTab.waitForLoadState('domcontentloaded');
      expect(await detailPage.getHotelName()).toBe(expectedName);
      await detailPage.proceedToCheckout();
      await checkoutPage.waitForGuestForm();
      checkoutUrl = detailTab.url();
      await testInfo.attach('formulario-antes-de-enviar', {
        body: await detailTab.screenshot(), contentType: 'image/png',
      });
    });
    await test.step('Enviar el formulario con los tres campos vacios', async () => {
      await checkoutPage.submitEmptyForm();
    });
    await test.step('Verificar rechazo de los campos y permanencia en el formulario', async () => {
      const fields: GuestField[] = ['firstname', 'lastname', 'email'];
      const patterns: Record<GuestField, RegExp> = {
        firstname: /first\s*name|required|enter|provide|fill/i,
        lastname: /last\s*name|required|enter|provide|fill/i,
        email: /e-?mail|required|enter|provide|fill/i,
      };
      const validations: Partial<Record<GuestField, GuestFieldValidation>> = {};
      for (const field of fields) {
        await expect.poll(async () => {
          const state = await checkoutPage.getFieldValidation(field);
          validations[field] = state;
          const nativeError = state.nativeValidationEnabled && state.userInvalid && state.required &&
            state.valueMissing && state.validationMessage.length > 0;
          const customError = state.ariaInvalid && state.messages.some(message => patterns[field].test(message));
          return state.value === '' && (nativeError || customError);
        }, { message: `El campo ${field} debe rechazar el valor vacio`, timeout: 10000 }).toBe(true);
      }
      await expect(detailTab).toHaveURL(checkoutUrl);
      await checkoutPage.waitForGuestForm();
      await testInfo.attach('validaciones-campos-vacios', {
        body: JSON.stringify({ validations, checkoutUrl, finalUrl: detailTab.url() }, null, 2),
        contentType: 'application/json',
      });
    });
  });
