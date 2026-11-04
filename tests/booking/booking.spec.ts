import { test, expect } from "@playwright/test";
import { BookingSearchPage } from "../../pages/booking/BookingSearchPage";
import { BookingResultsPage } from "../../pages/booking/BookingResultsPage";
import { BookingDetailPage } from "../../pages/booking/BookingDetailPage";
import { BookingCheckoutPage } from "../../pages/booking/BookingCheckoutPage";
import { BookingFlightsPage } from "../../pages/booking/BookingFlightsPage";

// Destinos y fechas fijos para que los ejemplos sean fáciles de reproducir.
const DESTINO_ALOJAMIENTO = "Córdoba";
const FECHA_INGRESO = "2026-11-10";
const FECHA_SALIDA = "2026-11-15";

const ORIGEN_VUELO = "Córdoba";
const DESTINO_VUELO = "Mendoza";
const FECHA_IDA_VUELO = "2026-11-10";
const FECHA_REGRESO_VUELO = "2026-11-26";

test.describe("Actividades de Booking sin custom fixtures", () => {
  test.setTimeout(120_000);

  test(
    "Actividad 1: buscar alojamiento con fechas fijas",
    { tag: ["@smoke", "@booking"] },
    async ({ page }) => {
      const searchPage = new BookingSearchPage(page);
      await searchPage.goto();
      await searchPage.searchDestination(
        DESTINO_ALOJAMIENTO,
        FECHA_INGRESO,
        FECHA_SALIDA,
      );

      await expect(page).toHaveURL(/\/searchresults/);
      await expect(
        page.getByRole("heading", {
          name: new RegExp(DESTINO_ALOJAMIENTO, "i"),
        }).first(),
      ).toBeVisible();

      await expect(page).toHaveURL(
        (url) =>
          url.searchParams.get("checkin") === FECHA_INGRESO &&
          url.searchParams.get("checkout") === FECHA_SALIDA &&
          url.searchParams.get("group_adults") === "2",
      );
    },
  );

  test(
    "Actividad 2: aplicar filtros y verificar resultados",
    { tag: ["@booking"] },
    async ({ page }) => {
      const searchPage = new BookingSearchPage(page);
      await searchPage.goto();
      await searchPage.searchDestination(
        DESTINO_ALOJAMIENTO,
        FECHA_INGRESO,
        FECHA_SALIDA,
      );

      const resultsPage = new BookingResultsPage(page);

      await resultsPage.applyFreeCancellationFilter();
      await resultsPage.applyRatingFilter();

      expect(await resultsPage.getResultsCount()).toBeGreaterThan(0);

      await expect(page).toHaveURL((url) => {
        const filters = (url.searchParams.get("nflt") ?? "").split(";");

        return filters.includes("fc=2") &&
          filters.includes("review_score=80");
      });
    },
  );

  test(
    "Actividad 3: abrir hotel en nueva pestaña e iniciar reserva",
    { tag: ["@booking"] },
    async ({ page }) => {
      const searchPage = new BookingSearchPage(page);
      await searchPage.goto();
      await searchPage.searchDestination(
        DESTINO_ALOJAMIENTO,
        FECHA_INGRESO,
        FECHA_SALIDA,
      );

      const resultsPage = new BookingResultsPage(page);
      const hotel = await resultsPage.openFirstHotel();
      const detailPage = new BookingDetailPage(hotel.page);
      await detailPage.dismissModalsIfPresent();
      await detailPage.expectHotelName(hotel.hotelName);

      expect(detailPage.page).not.toBe(page);
      await expect(detailPage.page).toHaveURL(/\/hotel\//);

      await detailPage.reserveRoom();

      const checkoutPage = new BookingCheckoutPage(detailPage.page);
      await checkoutPage.expectLoaded();
    },
  );

  test(
    "Actividad 4: validar datos obligatorios del huésped",
    { tag: ["@booking"] },
    async ({ page }) => {
      const searchPage = new BookingSearchPage(page);
      await searchPage.goto();
      await searchPage.searchDestination(
        DESTINO_ALOJAMIENTO,
        FECHA_INGRESO,
        FECHA_SALIDA,
      );

      const resultsPage = new BookingResultsPage(page);
      const hotel = await resultsPage.openFirstHotel();
      const detailPage = new BookingDetailPage(hotel.page);
      await detailPage.dismissModalsIfPresent();
      await detailPage.expectHotelName(hotel.hotelName);
      await detailPage.reserveRoom();

      const checkoutPage = new BookingCheckoutPage(detailPage.page);
      await checkoutPage.submitEmptyForm();
      await checkoutPage.expectRequiredErrors();
    },
  );

  test(
    "Actividad 5 adaptada: integrar búsqueda y checkout sin custom fixtures",
    { tag: ["@booking"] },
    async ({ page }) => {
      const searchPage = new BookingSearchPage(page);
      await searchPage.goto();
      await searchPage.searchDestination(
        DESTINO_ALOJAMIENTO,
        FECHA_INGRESO,
        FECHA_SALIDA,
      );

      const resultsPage = new BookingResultsPage(page);
      const hotel = await resultsPage.openFirstHotel();
      const detailPage = new BookingDetailPage(hotel.page);
      await detailPage.dismissModalsIfPresent();
      await detailPage.expectHotelName(hotel.hotelName);
      await detailPage.reserveRoom();

      const checkoutPage = new BookingCheckoutPage(detailPage.page);

      await expect(checkoutPage.firstNameInput).toBeVisible();
      await expect(checkoutPage.lastNameInput).toBeVisible();
      await expect(checkoutPage.emailInput).toBeVisible();
      await expect(checkoutPage.submitBtn).toBeVisible();

      // No confirmar reservas reales.
    },
  );

  test(
    "Booking: seleccionar español de Argentina",
    { tag: ["@smoke", "@booking"] },
    async ({ page }) => {
      const flightsPage = new BookingFlightsPage(page);

      await flightsPage.goto();
      await flightsPage.selectSpanishArgentina();

      await expect(page.locator("html")).toHaveAttribute("lang", /^es/i);
    },
  );

  test(
    "Booking Flights: buscar Córdoba-Mendoza con fechas fijas",
    { tag: ["@smoke", "@booking"] },
    async ({ page }) => {
      const flightsPage = new BookingFlightsPage(page);

      await flightsPage.goto();
      await flightsPage.selectSpanishArgentina();
      await flightsPage.searchRoundTrip(
        ORIGEN_VUELO,
        DESTINO_VUELO,
        FECHA_IDA_VUELO,
        FECHA_REGRESO_VUELO,
      );
      await flightsPage.selectCheapestFlight();

      await expect(page).toHaveURL(/\/flights/i);
    },
  );
});