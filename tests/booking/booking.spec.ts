import { test, expect } from '../../fixtures/bookingFixtures';

test('Actividad 1: buscar alojamiento por destino, fechas y huespedes',
  { tag: ['@smoke', '@booking', '@actividad1'] }, async ({ page, searchPage }, testInfo) => {
    test.setTimeout(90000);
    const destination = 'Madrid';
    const adults = 3;
    const rooms = 2;
    // Dos meses por delante: evita fechas vencidas y ejercita el calendario.
    const today = new Date();
    const dateIso = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const checkIn = dateIso(new Date(today.getFullYear(), today.getMonth() + 2, 10));
    const checkOut = dateIso(new Date(today.getFullYear(), today.getMonth() + 2, 15));
    await test.step('Abrir Booking y configurar tres adultos en dos habitaciones', async () => {
      await searchPage.goto();
      await searchPage.setGuests(adults, rooms);
    });
    await test.step('Elegir Madrid, seleccionar las fechas y buscar', async () => {
      await searchPage.searchDestination(destination, checkIn, checkOut);
    });
    await test.step('Validar resultados y los datos de la busqueda', async () => {
      await expect(page).toHaveURL(/\/searchresults/);
      await expect(page.getByRole('heading', { level: 1 })).toContainText(destination);
      const parameters = new URL(page.url()).searchParams;
      expect(parameters.get('checkin')).toBe(checkIn);
      expect(parameters.get('checkout')).toBe(checkOut);
      expect(parameters.get('group_adults')).toBe(String(adults));
      expect(parameters.get('group_children')).toBe('0');
      expect(parameters.get('no_rooms')).toBe(String(rooms));
      await testInfo.attach('datos-busqueda', {
        body: JSON.stringify({ destination, checkIn, checkOut, adults, rooms, url: page.url() }, null, 2),
        contentType: 'application/json',
      });
    });
  });
