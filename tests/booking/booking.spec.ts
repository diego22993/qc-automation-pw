import { test, expect } from '@playwright/test';
import { BookingSearchPage } from "../../pages/booking/BookingSearchPage";

test.describe("Booking Search Tests", () => {

    test('Actividad 1: Busqueda dinamica con manejo de modales en Booking', { tag: ["@smoke", "@booking"] }, async ({ page }) => {

        const bookingSearchPage = new BookingSearchPage(page);
        await bookingSearchPage.goto();
        await bookingSearchPage.dismissModalIfPresent();
        await bookingSearchPage.searchDestination("Madrid", "2026-11-15", "2026-11-15");
        await expect(page).toHaveURL(/.*searchresults/);

    })
});