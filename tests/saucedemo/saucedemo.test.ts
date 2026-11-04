import { expect, test, type Page } from "@playwright/test";
import { CartPage } from "../../pages/saucedemo/CartPage";
import { CheckoutCompletePage } from "../../pages/saucedemo/CheckoutCompletePage";
import { CheckoutInformationPage } from "../../pages/saucedemo/CheckoutInformationPage";
import { CheckoutOverviewPage } from "../../pages/saucedemo/CheckoutOverviewPage";
import { InventoryPage } from "../../pages/saucedemo/InventoryPage";
import { LoginPage } from "../../pages/saucedemo/LoginPage";

async function loginToInventory(page: Page): Promise<InventoryPage> {
  return test.step("Iniciar sesión y abrir el inventario", async () => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await loginPage.expectInventoryPage();
    return new InventoryPage(page);
  });
}

async function openCheckoutOverview(page: Page): Promise<CheckoutOverviewPage> {
  const inventoryPage = await loginToInventory(page);
  await test.step("Agregar Backpack y abrir el carrito", async () => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.openCart();
  });

  const cartPage = new CartPage(page);
  await test.step("Iniciar el checkout", async () => {
    await cartPage.checkout();
  });

  const informationPage = new CheckoutInformationPage(page);
  await test.step("Completar los datos del cliente", async () => {
    await informationPage.continueWithCustomer("Juan", "Perez", "5000");
  });

  const overviewPage = new CheckoutOverviewPage(page);
  await test.step("Validar que se abrió el resumen de compra", async () => {
    await overviewPage.expectLoaded();
  });
  return overviewPage;
}

async function completeCheckout(page: Page): Promise<CheckoutCompletePage> {
  const overviewPage = await openCheckoutOverview(page);
  await test.step("Finalizar la compra", async () => {
    await overviewPage.finish();
  });

  const completePage = new CheckoutCompletePage(page);
  await test.step("Validar la confirmación del pedido", async () => {
    await completePage.expectLoaded();
  });
  return completePage;
}

test(
  "completar checkout y generar PDF de confirmación",
  async ({ page }, testInfo) => {
    const overviewPage = await openCheckoutOverview(page);
    await test.step("Verificar el producto antes de confirmar", async () => {
      await overviewPage.expectProduct("Sauce Labs Backpack");
    });

    await overviewPage.finish();
    const completePage = new CheckoutCompletePage(page);
    await completePage.expectLoaded();

    await test.step("Generar y validar el PDF del pedido", async () => {
      const download = await completePage.generatePdf();
      expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

      const pdfPath = testInfo.outputPath(download.suggestedFilename());
      await download.saveAs(pdfPath);
      expect(await download.failure()).toBeNull();
    });
  },
);

test.describe("SauceDemo - Ejercicios de locators y checkout", () => {
  test("Ejercicio 21: seleccionar login con CSS data-test", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step("Abrir el formulario de inicio de sesión", async () => {
      await loginPage.goto();
    });
    await test.step("Seleccionar Login con el atributo CSS data-test", async () => {
      await page.locator('[data-test="login-button"]').click();
    });
    await test.step("Validar el error por usuario obligatorio", async () => {
      await loginPage.expectLoginError(/username is required/i);
    });
  });

  test("Ejercicio 22: ordenar productos por precio ascendente", async ({ page }) => {
    const inventoryPage = await loginToInventory(page);
    await test.step("Ordenar de menor a mayor precio y validar el valor lohi", async () => {
      await inventoryPage.sortBy("Price (low to high)", "lohi");
    });
  });

  test("Ejercicio 23: ordenar productos por nombre descendente", async ({ page }) => {
    const inventoryPage = await loginToInventory(page);
    await test.step("Ordenar por nombre descendente y validar el valor za", async () => {
      await inventoryPage.sortBy("Name (Z to A)", "za");
    });
  });

  test("Ejercicio 24: filtrar el producto Sauce Labs Onesie", async ({ page }) => {
    const inventoryPage = await loginToInventory(page);
    await test.step("Filtrar las tarjetas por Sauce Labs Onesie", async () => {
      await inventoryPage.expectOnlyProduct("Sauce Labs Onesie");
    });
  });

  test("Ejercicio 25: agregar Bike Light desde su tarjeta", async ({ page }) => {
    const inventoryPage = await loginToInventory(page);
    await test.step("Agregar Bike Light desde su tarjeta de producto", async () => {
      await inventoryPage.addProductToCart("Sauce Labs Bike Light");
    });
    await test.step("Validar que el badge del carrito indique 1", async () => {
      await inventoryPage.expectCartCount(1);
    });
  });

  test("Ejercicio 26: encadenar la búsqueda de precios del inventario", async ({ page }) => {
    const inventoryPage = await loginToInventory(page);
    await test.step("Encadenar desde el inventario hasta los precios", async () => {
      await inventoryPage.expectInventoryPriceCount(6);
    });
  });

  test("Ejercicio 27: validar el precio de Fleece Jacket", async ({ page }) => {
    const inventoryPage = await loginToInventory(page);
    await test.step("Filtrar Fleece Jacket y verificar su precio", async () => {
      await inventoryPage.expectProductPrice("Sauce Labs Fleece Jacket", "$49.99");
    });
  });

  test("Ejercicio 28: agregar dos productos y validar badge encadenado", async ({ page }) => {
    const inventoryPage = await loginToInventory(page);
    await test.step("Agregar Backpack y Bike Light", async () => {
      await inventoryPage.addProductToCart("Sauce Labs Backpack");
      await inventoryPage.addProductToCart("Sauce Labs Bike Light");
    });
    await test.step("Encadenar al badge y validar que indique 2", async () => {
      await inventoryPage.expectCartCountFromContainer(2);
    });
  });

  test("Ejercicio 29: quitar Backpack filtrado en el carrito", async ({ page }) => {
    const inventoryPage = await loginToInventory(page);
    await test.step("Agregar Backpack y abrir el carrito", async () => {
      await inventoryPage.addProductToCart("Sauce Labs Backpack");
      await inventoryPage.openCart();
    });

    const cartPage = new CartPage(page);
    await test.step("Filtrar Backpack y quitarlo del carrito", async () => {
      await cartPage.removeProduct("Sauce Labs Backpack");
    });
    await test.step("Validar que no queden items en el carrito", async () => {
      await cartPage.expectItemCount(0);
    });
  });

  test("Ejercicio 30: quitar todos los productos y validar carrito vacío", async ({ page }) => {
    const inventoryPage = await loginToInventory(page);
    await test.step("Agregar dos productos y entrar al carrito", async () => {
      await inventoryPage.addProductToCart("Sauce Labs Backpack");
      await inventoryPage.addProductToCart("Sauce Labs Bike Light");
      await inventoryPage.openCart();
    });

    const cartPage = new CartPage(page);
    await test.step("Quitar todos los productos", async () => {
      await cartPage.removeAllProducts();
    });
    await test.step("Verificar que la lista .cart_item esté vacía", async () => {
      await cartPage.expectItemCount(0);
    });
  });

  test("Ejercicio 31: ir al checkout con el botón Checkout", async ({ page }) => {
    const inventoryPage = await loginToInventory(page);
    await test.step("Agregar un producto y abrir el carrito", async () => {
      await inventoryPage.addProductToCart("Sauce Labs Backpack");
      await inventoryPage.openCart();
    });

    await test.step("Seleccionar Checkout y validar la navegación", async () => {
      await new CartPage(page).checkout();
      await expect(page).toHaveURL(/checkout-step-one\.html/);
    });
  });

  test("Ejercicio 35: validar el prefijo Item total del resumen", async ({ page }) => {
    const overviewPage = await openCheckoutOverview(page);
    await test.step("Verificar el prefijo del subtotal", async () => {
      await overviewPage.expectSubtotalPrefix("Item total:");
    });
  });

  test("Ejercicio 36: validar que el impuesto esté visible", async ({ page }) => {
    const overviewPage = await openCheckoutOverview(page);
    await test.step("Validar la visibilidad del impuesto", async () => {
      await overviewPage.expectTaxVisible();
    });
  });

  test("Ejercicio 37: validar que el total final esté visible", async ({ page }) => {
    const overviewPage = await openCheckoutOverview(page);
    await test.step("Validar la visibilidad del total final", async () => {
      await overviewPage.expectTotalVisible();
    });
  });

  test("Ejercicio 38: finalizar el checkout con el botón Finish", async ({ page }) => {
    const overviewPage = await openCheckoutOverview(page);
    await test.step("Pulsar Finish desde el resumen", async () => {
      await overviewPage.finish();
    });
    await test.step("Validar la pantalla de confirmación", async () => {
      await expect(page).toHaveURL(/checkout-complete\.html/);
    });
  });

  test("Ejercicio 39: validar mensaje descriptivo de confirmación", async ({ page }) => {
    const completePage = await completeCheckout(page);
    await test.step("Verificar el mensaje de despacho del pedido", async () => {
      await completePage.expectDispatchedMessage();
    });
  });

  test("Ejercicio 40: volver al inventario desde la confirmación", async ({ page }) => {
    const completePage = await completeCheckout(page);
    await test.step("Pulsar Back Home", async () => {
      await completePage.goBackHome();
    });
    await test.step("Validar el retorno al inventario", async () => {
      await new InventoryPage(page).expectLoaded();
    });
  });
});