import { test, expect, Page } from '@playwright/test';
import { BookingSearchPage } from '../../pages/booking/BookingSearchPage';
import { BookingResultsPage } from '../../pages/booking/BookingResultsPage';
import { BookingDetailPage } from '../../pages/booking/BookingDetailPage';

test.use({
  locale: 'en-GB', timezoneId: 'America/Argentina/Buenos_Aires',
  actionTimeout: 15000, navigationTimeout: 30000, screenshot: 'on', trace: 'retain-on-failure',
});

test('Actividad 3: abrir un alojamiento en otra pestana y validar su nombre',
  { tag: ['@booking', '@actividad3'] }, async ({ page, context }, testInfo) => {
    test.setTimeout(120000);
    const searchPage = new BookingSearchPage(page);
    const resultsPage = new BookingResultsPage(page);
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
      await resultsPage.applyFreeCancellationFilter();
      await resultsPage.applyScoreEightPlusFilter();
      expect(await resultsPage.areFiltersApplied()).toBe(true);
      expect(await resultsPage.getResultsCount()).toBeGreaterThan(0);
    });
    await test.step('Guardar el nombre y capturar la nueva pestana antes del clic', async () => {
      expectedName = await resultsPage.getFirstHotelName();
      expect(expectedName).not.toBe('');
      const [newTab] = await Promise.all([
        context.waitForEvent('page', { timeout: 20000 }),
        resultsPage.selectFirstHotel(),
      ]);
      detailTab = newTab;
      expect(detailTab).not.toBe(page);
      expect(await detailTab.opener()).toBe(page);
      await detailTab.waitForLoadState('domcontentloaded');
    });
    await test.step('Usar BookingDetailPage con la nueva Page y comparar el alojamiento', async () => {
      const detailPage = new BookingDetailPage(detailTab);
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
