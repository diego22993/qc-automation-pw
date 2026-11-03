import { test, expect } from '../../fixtures/bookingFixtures';

test('Actividad 2: filtrar por cancelacion gratuita y puntuacion 8+',
  { tag: ['@booking', '@actividad2'] }, async ({ page, searchPage, searchResultsPage }, testInfo) => {
    test.setTimeout(120000);
    const today = new Date();
    const iso = (day: number) => {
      const date = new Date(today.getFullYear(), today.getMonth() + 2, day);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };
    let initialCount = 0;

    await test.step('Reutilizar la busqueda de la actividad 1', async () => {
      await searchPage.goto();
      await searchPage.setGuests(3, 2);
      await searchPage.searchDestination('Madrid', iso(10), iso(15));
      await expect(page).toHaveURL(/\/searchresults/);
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Madrid');
      initialCount = await searchResultsPage.getResultsCount();
      expect(initialCount).toBeGreaterThan(0);
      await testInfo.attach('antes-de-filtrar', { body: await page.screenshot(), contentType: 'image/png' });
    });
    await test.step('Aplicar cancelacion gratuita y esperar la actualizacion', async () => {
      await searchResultsPage.applyFreeCancellationFilter();
    });
    await test.step('Aplicar puntuacion 8+ y esperar la actualizacion', async () => {
      await searchResultsPage.applyScoreEightPlusFilter();
    });
    await test.step('Validar filtros, tarjetas y puntuaciones', async () => {
      expect(await searchResultsPage.areFiltersApplied()).toBe(true);
      const filteredCount = await searchResultsPage.getResultsCount();
      expect(filteredCount).toBeGreaterThan(0);
      // No exigir una reduccion: Booking puede volver a cargar 25 tarjetas.
      const scores = await searchResultsPage.getReviewScores();
      expect(scores).toHaveLength(filteredCount);
      for (const score of scores) expect(score).toBeGreaterThanOrEqual(8);
      await testInfo.attach('resultados-filtros', {
        body: JSON.stringify({ initialCount, filteredCount, scores, url: page.url() }, null, 2),
        contentType: 'application/json',
      });
    });
  });
