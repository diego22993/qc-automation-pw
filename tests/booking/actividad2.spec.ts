import { test, expect } from "@playwright/test";
import { BookingSearchPage } from "../../pages/booking/BookingSearchPage";
import { BookingResultsPage } from "../../pages/booking/BookingResultsPage";

test("Actividad 2: Aplicar filtros y validar resultados", async ({ page }) => {
  const searchPage = new BookingSearchPage(page);
  const resultsPage = new BookingResultsPage(page);

  await searchPage.goto();
  await searchPage.searchDestination("Madrid", "2026-11-10", "2026-11-15");

  await resultsPage.applyFreeCancellationFilter();
  await resultsPage.applyReviewScoreFilter();

  const count = await resultsPage.getResultsCount();
  expect(count).toBeGreaterThan(0);
});