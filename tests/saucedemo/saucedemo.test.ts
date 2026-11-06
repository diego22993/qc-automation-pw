import { expect, test, type Page } from "@playwright/test";
import { CartPage } from "../../pages/saucedemo/CartPage";
import { CheckoutCompletePage } from "../../pages/saucedemo/CheckoutCompletePage";
import { CheckoutInformationPage } from "../../pages/saucedemo/CheckoutInformationPage";
import { CheckoutOverviewPage } from "../../pages/saucedemo/CheckoutOverviewPage";
import { InventoryPage } from "../../pages/saucedemo/InventoryPage";
import { LoginPage } from "../../pages/saucedemo/LoginPage";
import { loadSauceDemoUsers } from "../../utils/saucedemo/userDataProvider";

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

async function openCheckoutInformation(
  page: Page,
): Promise<CheckoutInformationPage> {
  const inventoryPage = await loginToInventory(page);
  await inventoryPage.addProductToCart("Sauce Labs Backpack");
  await inventoryPage.openCart();
  await new CartPage(page).checkout();

  const informationPage = new CheckoutInformationPage(page);
  await informationPage.expectLoaded();
  return informationPage;
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

test.describe("SauceDemo - Ejercicios 1 al 20", () => {
  test("Ejercicio 1: completar usuario con getByPlaceholder", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step("Abrir login y completar el usuario por placeholder", async () => {
      await loginPage.goto();
      await page.getByPlaceholder("Username").fill("standard_user");
      await expect(page.getByPlaceholder("Username")).toHaveValue("standard_user");
    });
  });

  test("Ejercicio 2: completar contraseña con getByPlaceholder", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step("Abrir login y completar la contraseña por placeholder", async () => {
      await loginPage.goto();
      await page.getByPlaceholder("Password").fill("secret_sauce");
      await expect(page.getByPlaceholder("Password")).toHaveValue("secret_sauce");
    });
  });

  test("Ejercicio 3: iniciar sesión con getByRole", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step("Ingresar credenciales válidas", async () => {
      await loginPage.goto();
      await page.getByPlaceholder("Username").fill("standard_user");
      await page.getByPlaceholder("Password").fill("secret_sauce");
    });
    await test.step("Pulsar Login por rol y validar acceso", async () => {
      await page.getByRole("button", { name: "Login" }).click();
      await loginPage.expectInventoryPage();
    });
  });

  test("Ejercicio 4: validar error vacío con getByText", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step("Intentar iniciar sesión sin credenciales", async () => {
      await loginPage.goto();
      await page.getByRole("button", { name: "Login" }).click();
    });
    await test.step("Encontrar el mensaje de error con getByText", async () => {
      await expect(
        page.getByText("Epic sadface: Username is required", { exact: true }),
      ).toBeVisible();
    });
  });

  test("Ejercicio 5: completar usuario con selector CSS ID", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step("Completar usuario usando #user-name", async () => {
      await loginPage.goto();
      await page.locator("#user-name").fill("standard_user");
      await expect(page.locator("#user-name")).toHaveValue("standard_user");
    });
  });

  test("Ejercicio 6: iniciar sesión con selectores CSS ID", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step("Completar los campos con sus IDs", async () => {
      await loginPage.goto();
      await page.locator("#user-name").fill("standard_user");
      await page.locator("#password").fill("secret_sauce");
    });
    await test.step("Pulsar #login-button y validar el inventario", async () => {
      await page.locator("#login-button").click();
      await loginPage.expectInventoryPage();
    });
  });

  test("Ejercicio 7: validar el título Swag Labs después del login", async ({ page }) => {
    await test.step("Iniciar sesión y verificar el título del documento", async () => {
      await loginToInventory(page);
      await expect(page).toHaveTitle("Swag Labs");
    });
  });

  test("Ejercicio 8: encontrar Backpack con getByText", async ({ page }) => {
    await test.step("Abrir el catálogo y localizar el producto", async () => {
      await loginToInventory(page);
      await expect(page.getByText("Sauce Labs Backpack", { exact: true })).toBeVisible();
    });
  });

  test("Ejercicio 9: localizar imagen con getByAltText", async ({ page }) => {
    await test.step("Abrir el catálogo y localizar la imagen de Bolt T-Shirt", async () => {
      await loginToInventory(page);
      await expect(page.getByAltText("Sauce Labs Bolt T-Shirt")).toBeVisible();
    });
  });

  test("Ejercicio 10: agregar el primer producto con first()", async ({ page }) => {
    const inventoryPage = await loginToInventory(page);
    await test.step("Pulsar el primer botón Add to cart", async () => {
      await page.getByRole("button", { name: "Add to cart" }).first().click();
    });
    await test.step("Validar que se agregó un producto", async () => {
      await inventoryPage.expectCartCount(1);
    });
  });

  test("Ejercicio 11: agregar el último producto con last()", async ({ page }) => {
    const inventoryPage = await loginToInventory(page);
    await test.step("Pulsar el último botón Add to cart", async () => {
      await page.getByRole("button", { name: "Add to cart" }).last().click();
    });
    await test.step("Validar el badge del carrito", async () => {
      await inventoryPage.expectCartCount(1);
    });
  });

  test("Ejercicio 12: seleccionar el segundo producto con nth()", async ({ page }) => {
    await test.step("Abrir el detalle de la imagen del segundo producto", async () => {
      await loginToInventory(page);
      await page.locator(".inventory_item").nth(1).locator(".inventory_item_img img").click();
    });
    await test.step("Validar que se abrió el detalle de Bike Light", async () => {
      await expect(page).toHaveURL(/inventory-item\.html/);
      await expect(page.getByText("Sauce Labs Bike Light", { exact: true })).toBeVisible();
    });
  });

  test.skip("Ejercicio 13: validar el encabezado QTY en el carrito", async ({ page }) => {
    await test.step("Abrir el carrito con un producto", async () => {
      const inventoryPage = await loginToInventory(page);
      await inventoryPage.addProductToCart("Sauce Labs Backpack");
      await inventoryPage.openCart();
    });
    await test.step("Verificar la columna QTY con getByText", async () => {
      await expect(page.getByText("QTY", { exact: true })).toBeVisible();
    });
  });

  test("Ejercicio 14: validar el encabezado Description en el carrito", async ({ page }) => {
    await test.step("Abrir el carrito con un producto", async () => {
      const inventoryPage = await loginToInventory(page);
      await inventoryPage.addProductToCart("Sauce Labs Backpack");
      await inventoryPage.openCart();
    });
    await test.step("Verificar la columna Description con getByText", async () => {
      await expect(page.getByText("Description", { exact: true })).toBeVisible();
    });
  });

  test("Ejercicio 15: volver al inventario con Continue Shopping", async ({ page }) => {
    await test.step("Abrir el carrito", async () => {
      const inventoryPage = await loginToInventory(page);
      await inventoryPage.addProductToCart("Sauce Labs Backpack");
      await inventoryPage.openCart();
    });
    await test.step("Pulsar Continue Shopping y validar el inventario", async () => {
      await page.getByRole("button", { name: "Continue Shopping" }).click();
      await expect(page).toHaveURL(/inventory\.html/);
    });
  });

  test("Ejercicio 16: completar First Name con getByPlaceholder", async ({ page }) => {
    await test.step("Llegar al formulario de checkout", async () => {
      await openCheckoutInformation(page);
    });
    await test.step("Completar y validar First Name", async () => {
      await page.getByPlaceholder("First Name").fill("Juan");
      await expect(page.getByPlaceholder("First Name")).toHaveValue("Juan");
    });
  });

  test("Ejercicio 17: completar Last Name con getByPlaceholder", async ({ page }) => {
    await test.step("Llegar al formulario de checkout", async () => {
      await openCheckoutInformation(page);
    });
    await test.step("Completar y validar Last Name", async () => {
      await page.getByPlaceholder("Last Name").fill("Perez");
      await expect(page.getByPlaceholder("Last Name")).toHaveValue("Perez");
    });
  });

  test("Ejercicio 18: completar Zip con getByPlaceholder", async ({ page }) => {
    await test.step("Llegar al formulario de checkout", async () => {
      await openCheckoutInformation(page);
    });
    await test.step("Completar y validar Zip/Postal Code", async () => {
      await page.getByPlaceholder("Zip/Postal Code").fill("5000");
      await expect(page.getByPlaceholder("Zip/Postal Code")).toHaveValue("5000");
    });
  });

  test("Ejercicio 19: validar Payment Information en el resumen", async ({ page }) => {
    await test.step("Completar el checkout hasta el resumen", async () => {
      await openCheckoutOverview(page);
    });
    await test.step("Localizar Payment Information con getByText", async () => {
      await expect(page.getByText("Payment Information:", { exact: true })).toBeVisible();
    });
  });

  test("Ejercicio 20: validar el encabezado de confirmación con getByRole", async ({ page }) => {
    await test.step("Completar la compra", async () => {
      await completeCheckout(page);
    });
    await test.step("Verificar el heading de confirmación", async () => {
      await expect(
        page.getByRole("heading", { name: "Thank you for your order!" }),
      ).toBeVisible();
    });
  });
});

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

for (const user of loadSauceDemoUsers()) {
  test(`login desde CSV: ${user.username}`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step("Abrir login e ingresar credenciales del CSV", async () => {
      await loginPage.goto();
      await loginPage.login(user.username, user.password);
    });

    await test.step(`Validar resultado esperado: ${user.expectedOutcome}`, async () => {
      if (user.expectedOutcome === "success") {
        await loginPage.expectInventoryPage();
      } else {
        await loginPage.expectLoginError(/locked out/i);
      }
    });
  });
}