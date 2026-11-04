import { test, expect } from "@playwright/test";
import { BookingSearchPage } from "../../pages/booking/BookingSearchPage";
import { BookingDetailPage } from "../../pages/booking/BookingDetailPage";

test("Actividad 3: Capturar nueva pestaña al seleccionar alojamiento", async ({ page, context }) => {
  const searchPage = new BookingSearchPage(page);

  await searchPage.goto();
  await searchPage.searchDestination("Madrid", "2026-11-10", "2026-11-15");

  const firstHotelLink = page.locator('[data-testid="title-link"]').first();

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    firstHotelLink.click(),
  ]);

  await newPage.waitForLoadState();
  const detailPage = new BookingDetailPage(newPage);
  
  await expect(newPage).toHaveURL(/.*hotel/);
});