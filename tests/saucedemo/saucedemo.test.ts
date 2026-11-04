import { expect, test } from "@playwright/test";
import { CartPage } from "../../pages/saucedemo/CartPage";
import { CheckoutCompletePage } from "../../pages/saucedemo/CheckoutCompletePage";
import { CheckoutInformationPage } from "../../pages/saucedemo/CheckoutInformationPage";
import { CheckoutOverviewPage } from "../../pages/saucedemo/CheckoutOverviewPage";
import { InventoryPage } from "../../pages/saucedemo/InventoryPage";
import { LoginPage } from "../../pages/saucedemo/LoginPage";

test(
  "completar checkout y generar PDF de confirmación",
  async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await loginPage.expectInventoryPage();

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.expectCartCount(1);
    await inventoryPage.openCart();

    const cartPage = new CartPage(page);
    await cartPage.expectLoaded();
    await cartPage.expectProduct("Sauce Labs Backpack");
    await cartPage.checkout();

    const informationPage = new CheckoutInformationPage(page);
    await informationPage.expectLoaded();
    await informationPage.continueWithCustomer("Juan", "Pérez", "5000");

    const overviewPage = new CheckoutOverviewPage(page);
    await overviewPage.expectLoaded();
    await overviewPage.expectProduct("Sauce Labs Backpack");
    await overviewPage.finish();

    const completePage = new CheckoutCompletePage(page);
    await completePage.expectLoaded();

    const download = await completePage.generatePdf();
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    const pdfPath = testInfo.outputPath(download.suggestedFilename());
    await download.saveAs(pdfPath);
    expect(await download.failure()).toBeNull();
  },
);