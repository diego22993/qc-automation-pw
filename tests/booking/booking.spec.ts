import { test, expect } from "@playwright/test";
import { BookingSearchPage } from "../../pages/booking/BookingSearchPage";

test(
  "Actividad 1: Búsqueda dinámica con manejo de modales en Booking",
  { tag: ["@smoke", "@booking"] },
  async ({ page }) => {
    const searchPage = new BookingSearchPage(page);

    await searchPage.goto();
    await searchPage.searchDestination("Madrid", "2026-11-10", "2026-11-15");
    await test.step("Verificar que la búsqueda se realizó correctamente", async () => {
      await expect(page).toHaveURL(/.*searchresults/);
    });
     await test.step("Verificar que el título de la página contiene 'Madrid'", async () => {
    await expect(page.locator("h1")).toContainText(/Madrid/i);
     });
  },
);
