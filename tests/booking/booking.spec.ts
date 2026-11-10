import { test, expect } from "@playwright/test";
import { BookingSearchPage } from "../../pages/booking/BookingSearchPage";
import { daysFromToday } from "../../utils/dates";

test(
  "Actividad 1: Búsqueda de alojamiento con destino, fechas y personas",
  { tag: ["@smoke", "@booking"] },
  async ({ page }) => {
    test.setTimeout(60_000); // Booking es lento: le damos 60s en vez de 30s
    const searchPage = new BookingSearchPage(page);

    await searchPage.goto();
    await searchPage.searchDestination("Madrid", daysFromToday(7), daysFromToday(10), 3);

    await expect(page).toHaveURL(/\/searchresults/);
    await expect(page).toHaveURL(/group_adults=3/);
    await expect(page.locator("h1")).toContainText(/Madrid/i);
  },
);
