import { test, expect } from '../../fixtures/bookingFixtures';

// Pruebas tecnicas locales de inyeccion y aislamiento. No acreditan flujos de Booking.
test('Fixtures: detalle y checkout utilizan la nueva pestana asignada',
  { tag: ['@fixtures', '@actividad5-tecnica'] }, async ({ page, context, hotelTab, detailPage, checkoutPage }, testInfo) => {
    expect(() => hotelTab.page).toThrow(/Primero debe asignar/);
    await expect(detailPage.getHotelName()).rejects.toThrow(/Primero debe asignar/);
    await expect(checkoutPage.waitForGuestForm()).rejects.toThrow(/Primero debe asignar/);

    const form = (title: string, value: string) => `
      <h1 class="pp-header__title">${title}</h1>
      <p>Comprobacion tecnica local de fixtures. Esta pagina NO es Booking.</p>
      <form id="bookForm">
        <label>Nombre<input name="firstname" value="${value}"></label>
        <label>Apellido<input name="lastname" value="${value}"></label>
        <label>Email<input name="email" value="${value}@example.test"></label>
        <button type="button">Next: Final details</button>
      </form>`;
    await page.setContent(form('Verificacion tecnica: pagina original', 'original'));
    const tab = await context.newPage();
    await tab.setContent(form('Verificacion tecnica: nueva pestana', 'alojamiento'));
    hotelTab.bind(tab);

    expect(await detailPage.getHotelName()).toBe('Verificacion tecnica: nueva pestana');
    await checkoutPage.submitEmptyForm();
    for (const field of ['firstname', 'lastname', 'email'] as const) {
      expect((await checkoutPage.getFieldValidation(field)).value).toBe('');
    }
    // Detecta una regresion en que checkoutPage se construya con la pagina original.
    await expect(page.getByLabel('Nombre', { exact: true })).toHaveValue('original');
    await expect(page.getByLabel('Apellido', { exact: true })).toHaveValue('original');
    await expect(page.getByLabel('Email', { exact: true })).toHaveValue('original@example.test');
    await testInfo.attach('comprobacion-tecnica-fixtures', {
      body: JSON.stringify({ technicalOnly: true, differentPage: hotelTab.page !== page,
        originalFieldsPreserved: true, hotelFieldsCleared: true }),
      contentType: 'application/json',
    });
  });

test('Fixtures: estado aislado y rechazo de pestanas incorrectas',
  { tag: ['@fixtures', '@actividad5-tecnica'] }, async ({ page, context, browser, hotelTab }) => {
    await page.setContent('<h1>Verificacion tecnica local: aislamiento de fixtures</h1><p>No es una prueba de Booking.</p>');
    expect(() => hotelTab.page).toThrow(/Primero debe asignar/);
    expect(() => hotelTab.bind(page)).toThrow(/nueva pestana abierta/);
    const otherContext = await browser.newContext();
    try {
      const otherPage = await otherContext.newPage();
      expect(() => hotelTab.bind(otherPage)).toThrow(/contexto de esta prueba/);
    } finally {
      await otherContext.close();
    }
    const selectedTab = await context.newPage();
    hotelTab.bind(selectedTab);
    await selectedTab.close();
    expect(() => hotelTab.page).toThrow(/cerrada/);
  });
