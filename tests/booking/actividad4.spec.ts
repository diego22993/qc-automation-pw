import { test, expect } from "@playwright/test";
import { BookingCheckoutPage } from "../../pages/booking/BookingCheckoutPage";

test("Actividad 4: Validaciones negativas en formulario vacio", async ({ page }) => {
  const checkoutPage = new BookingCheckoutPage(page);
  await checkoutPage.validateRequiredFields();
});