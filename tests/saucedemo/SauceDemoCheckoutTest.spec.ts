import { expect, test } from "../fixtures/saucedemo.fixture";
import { SauceCartPage } from "../../pages/saucedemo/SauceCartPage";
import { SauceCheckoutCompletePage } from "../../pages/saucedemo/SauceCheckoutComplete";
import { SauceCheckoutInformationPage } from "../../pages/saucedemo/SauceCheckoutInformationPage";
import { SauceCheckoutOverviewPage } from "../../pages/saucedemo/SauceCheckoutOverviewPage";
import { SauceInventoryPage } from "../../pages/saucedemo/SauceInventoryPage";
import { SauceProductDetailPage } from "../../pages/saucedemo/SauceProductDetailPage";
import { loadSauceDemoLoginScenarios } from "../../utils/saucedemo/loginScenarioProvider";
import { loadSauceDemoCheckoutScenarios } from "../../utils/saucedemo/checkoutScenarioProvider";

const validLoginScenario = loadSauceDemoLoginScenarios().find(
  (scenario) => scenario.expectedOutcome === "success",
);

if (!validLoginScenario) {
  throw new Error("No se encontró un escenario de login exitoso.");
}

test.describe(
  "SauceDemo - Carrito y checkout",
  { tag: ["@saucedemo", "@cart", "@checkout"] },
  () => {
    for (const scenario of loadSauceDemoCheckoutScenarios()) {
      test(
        `agrega productos al carrito (${scenario.scenario})`,
        { tag: "@cart" },
        async ({ page, sauceLoginPage }) => {
          await sauceLoginPage.login(
            validLoginScenario.username,
            validLoginScenario.password,
          );
          await sauceLoginPage.waitForInventoryPage();

          const inventoryPage = new SauceInventoryPage(page);
          for (const product of scenario.products) {
            await inventoryPage.addProductToCart(product);
          }

          expect(await inventoryPage.getCartBadgeText()).toBe(
            String(scenario.products.length),
          );

          await inventoryPage.openCart();
          const cartPage = new SauceCartPage(page);

          expect(await cartPage.getItemCount()).toBe(scenario.products.length);
          expect(await cartPage.getItemNames()).toEqual(scenario.products);
        },
      );

      test(
        `elimina un producto del carrito (${scenario.scenario})`,
        { tag: "@cart" },
        async ({ page, sauceLoginPage }) => {
          await sauceLoginPage.login(
            validLoginScenario.username,
            validLoginScenario.password,
          );
          await sauceLoginPage.waitForInventoryPage();

          const inventoryPage = new SauceInventoryPage(page);
          for (const product of scenario.products) {
            await inventoryPage.addProductToCart(product);
          }
          await inventoryPage.openCart();

          const cartPage = new SauceCartPage(page);
          await cartPage.removeProduct(scenario.products[0]);

          expect(await cartPage.getItemCount()).toBe(
            scenario.products.length - 1,
          );
          expect(await cartPage.getItemNames()).toEqual(
            scenario.products.slice(1),
          );
        },
      );

      test(
        `alterna agregar y quitar un producto (${scenario.scenario})`,
        async ({ page, sauceLoginPage }) => {
          await sauceLoginPage.login(
            validLoginScenario.username,
            validLoginScenario.password,
          );
          await sauceLoginPage.waitForInventoryPage();

          const inventoryPage = new SauceInventoryPage(page);
          await inventoryPage.openProductDetail(scenario.products[0]);
          const productDetailPage = new SauceProductDetailPage(page);

          expect(await productDetailPage.isAddToCartButtonVisible()).toBe(true);
          await productDetailPage.toggleAddToCart();
          expect(await productDetailPage.isRemoveButtonVisible()).toBe(true);

          await productDetailPage.toggleAddToCart();
          expect(await productDetailPage.isAddToCartButtonVisible()).toBe(true);
          expect(await inventoryPage.isCartBadgeVisible()).toBe(false);
        },
      );

      test(
        `completa el checkout (${scenario.scenario})`,
        { tag: "@smoke" },
        async ({ page, sauceLoginPage }) => {
          await sauceLoginPage.login(
            validLoginScenario.username,
            validLoginScenario.password,
          );
          await sauceLoginPage.waitForInventoryPage();

          const inventoryPage = new SauceInventoryPage(page);
          for (const product of scenario.products) {
            await inventoryPage.addProductToCart(product);
          }
          await inventoryPage.openCart();

          const cartPage = new SauceCartPage(page);
          expect(await cartPage.getItemNames()).toEqual(scenario.products);
          await cartPage.checkout();

          const informationPage = new SauceCheckoutInformationPage(page);
          await informationPage.fillDataAndContinue(
            scenario.customer.firstName,
            scenario.customer.lastName,
            scenario.customer.postalCode,
          );

          const overviewPage = new SauceCheckoutOverviewPage(page);
          expect(await overviewPage.getItemCount()).toBe(
            scenario.products.length,
          );
          expect(await overviewPage.getItemNames()).toEqual(scenario.products);
          expect(await overviewPage.getSubtotal()).toBe(
            scenario.expected.subtotal,
          );
          expect(await overviewPage.getTax()).toBe(scenario.expected.tax);
          expect(await overviewPage.getTotal()).toBe(scenario.expected.total);

          await overviewPage.finish();
          const completePage = new SauceCheckoutCompletePage(page);
          await expect
            .poll(() => completePage.getCompleteHeaderText())
            .toBe(scenario.expected.confirmation);
        },
      );
    }
  },
);
