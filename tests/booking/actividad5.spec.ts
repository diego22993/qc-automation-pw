import { test, expect } from "../../fixtures/bookingFixtures";

test("Actividad 5: Búsqueda usando Custom Fixtures", async ({ searchPage, page }) => {
  await searchPage.goto();
  await searchPage.searchDestination("Madrid", "2026-11-10", "2026-11-15");
  await expect(page).toHaveURL(/.*searchresults/);
});