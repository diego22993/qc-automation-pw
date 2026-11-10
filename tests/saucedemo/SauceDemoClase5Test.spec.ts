import { expect, test } from "@playwright/test";
import { SauceCartPage } from "../../pages/saucedemo/SauceCartPage";
import { SauceInventoryPage } from "../../pages/saucedemo/SauceInventoryPage";
import { SauceLoginPage } from "../../pages/saucedemo/SauceLoginPage";
import {
  type DataFormat,
  loadSauceDemoCheckoutScenarios,
  loadSauceDemoLoginScenarios,
} from "../../utils/saucedemo/userDataProvider";
import { SauceCheckoutInformationPage } from "../../pages/saucedemo/SauceCheckoutInformationPAge";

// Cambia a "json" para ejecutar los mismos escenarios desde los archivos JSON.
const DATA_FORMAT: DataFormat = "csv";
const loginScenarios = loadSauceDemoLoginScenarios(DATA_FORMAT);
const checkoutScenarios = loadSauceDemoCheckoutScenarios(DATA_FORMAT);

test.describe(
  `SauceDemo Clase 5 - escenarios desde ${DATA_FORMAT.toUpperCase()}`,
  { tag: ["@saucedemo", "@data-driven"] },
  () => {
    for (const scenario of loginScenarios) {
      test(`Login: ${scenario.scenario}`, async ({ page }) => {
        const loginPage = new SauceLoginPage(page);

        await test.step("Ingresar las credenciales del escenario", async () => {
          await loginPage.goto();
          await loginPage.login(scenario.username, scenario.password);
        });

        await test.step(`Validar resultado: ${scenario.expectedOutcome}`, async () => {
          if (scenario.expectedOutcome === "success") {
            await expect(loginPage.getInventoryPageVisible()).resolves.toBe(
              true,
            );
          } else {
            await expect(await loginPage.getErrorMessage()).toContain(
              scenario.expectedError,
            );
          }
        });
      });
    }

    for (const scenario of checkoutScenarios) {
      test(`Checkout: ${scenario.scenario}`, async ({ page }) => {
        const loginPage = new SauceLoginPage(page);

        await test.step("Iniciar sesión con el usuario del escenario", async () => {
          await loginPage.goto();
          await loginPage.login(scenario.username, scenario.password);
          await expect(loginPage.getInventoryPageVisible()).resolves.toBe(true);
        });

        const inventoryPage = new SauceInventoryPage(page);
        await inventoryPage.addProductToCart("Sauce Labs Backpack");
        await inventoryPage.openCart();

        const cartPage = new SauceCartPage(page);
        await cartPage.checkout();

        await test.step("Completar los datos del escenario", async () => {
          const informationPage = new SauceCheckoutInformationPage(page);
          await informationPage.fillData(
            scenario.firstName,
            scenario.lastName,
            scenario.postalCode,
          );

          await expect(await informationPage.getErrorMessage()).toContain(
            scenario.expectedError,
          );
          await expect(page).toHaveURL(/checkout-step-one.html/);
        });
      });
    }
  },
);
