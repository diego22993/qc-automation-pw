import type { Page } from '@playwright/test';
import { test, expect } from '../../fixtures/bookingFixtures';

test('Actividad 3: abrir un alojamiento en otra pestana y validar su nombre',
  { tag: ['@booking', '@actividad3'] }, async ({ page, context, searchPage, searchResultsPage, hotelTab, detailPage }, testInfo) => {
    test.setTimeout(120000);
    const destination = 'Mendoza';
    const today = new Date();
    const iso = (day: number) => {
      const date = new Date(today.getFullYear(), today.getMonth() + 2, day);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };
    let expectedName: string;
    let detailTab: Page;

    await test.step('Buscar alojamiento y aplicar los filtros de la actividad 2', async () => {
      await searchPage.goto();
      await searchPage.setGuests(3, 2);
      await searchPage.searchDestination(destination, iso(10), iso(15));
      await expect(page).toHaveURL(/\/searchresults/);
      await expect(page.getByRole('heading', { level: 1 })).toContainText(destination);
      await searchResultsPage.applyFreeCancellationFilter();
      await searchResultsPage.applyScoreEightPlusFilter();
      expect(await searchResultsPage.areFiltersApplied()).toBe(true);
      expect(await searchResultsPage.getResultsCount()).toBeGreaterThan(0);
    });
    await test.step('Guardar el nombre y capturar la nueva pestana antes del clic', async () => {
      expectedName = await searchResultsPage.getFirstHotelName();
      expect(expectedName).not.toBe('');
      const [newTab] = await Promise.all([
        context.waitForEvent('page', { timeout: 20000 }),
        searchResultsPage.selectFirstHotel(),
      ]);
      detailTab = newTab;
      hotelTab.bind(newTab);
      expect(detailTab).not.toBe(page);
      expect(await detailTab.opener()).toBe(page);
      await detailTab.waitForLoadState('domcontentloaded');
    });
    await test.step('Usar BookingDetailPage con la nueva Page y comparar el alojamiento', async () => {
      await expect(detailTab).toHaveURL(/\/hotel\//);
      const actualName = await detailPage.getHotelName();
      expect(actualName).toBe(expectedName);
      await expect(page).toHaveURL(/\/searchresults/);
      await testInfo.attach('alojamiento-seleccionado', {
        body: JSON.stringify({ expectedName, actualName, resultsUrl: page.url(), detailUrl: detailTab.url(),
          differentPage: detailTab !== page, openedByResults: await detailTab.opener() === page }, null, 2),
        contentType: 'application/json',
      });
    });
  });
