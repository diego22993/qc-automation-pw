/**
 * Archivo de pruebas E2E para SauceDemo utilizando Playwright.
 * Contiene flujos de autenticación y compra de productos.
 */
import { expect, test, type Page } from "@playwright/test";
import { SauceCartPage } from "../../pages/saucedemo/SauceCartPage";
import { SauceCheckoutCompletePage } from "../../pages/saucedemo/SauceCheckoutComplete";
import { SauceCheckoutOverviewPage } from "../../pages/saucedemo/SauceCheckoutOverviewPage";
import { SauceLoginPage } from "../../pages/saucedemo/SauceLoginPage";
import { SauceInventoryPage } from "../../pages/saucedemo/SauceInventoryPage";
import { SauceProductDetailPage } from "../../pages/saucedemo/SauceProductDetailPage";
import { SauceCheckoutInformationPage } from "../../pages/saucedemo/SauceCheckoutInformationPAge";

// Estas constantes centralizan las credenciales para reutilizarlas.
const STANDARD_USER = "standard_user";
const PASSWORD = "secret_sauce";

/**
 * Objetivo: iniciar sesión en SauceDemo con las credenciales indicadas.
 * @param page Pestaña de Playwright en la que se realizará el flujo de login.
 * @param username Usuario que se escribirá; por defecto usa standard_user.
 * @param password Contraseña que se escribirá; por defecto usa secret_sauce.
 * @returns Una promesa que termina cuando se envía el formulario; no devuelve un valor.
 */
async function loginTo(
  page: Page,
  username = STANDARD_USER,
  password = PASSWORD,
): Promise<SauceInventoryPage> {
  const sauceLoginPage = new SauceLoginPage(page);
  await sauceLoginPage.goto();
  await sauceLoginPage.login(username, password);
  expect(await sauceLoginPage.getInventoryPageVisible()).toBeTruthy();
  return sauceLoginPage.goToInventoryPage();
}

async function openCheckoutInformation(
  page: Page,
): Promise<SauceCheckoutInformationPage> {
  const inventoryPage = new SauceInventoryPage(page);
  await inventoryPage.addProductToCart("Sauce Labs Backpack");
  await inventoryPage.openCart();
  const cartPage = new SauceCartPage(page);
  await cartPage.checkout();
  return new SauceCheckoutInformationPage(page);
}

// Suite principal: sus etiquetas se heredan en los tests internos.
test.describe(
  "SauceDemo - Flujos E2E de compra",
  { tag: ["@saucedemo", "@regression"] },
  () => {
    // Pruebas que verifican acceso, rechazo de acceso y cierre de sesión.
    test.describe("Autenticación", { tag: "@auth" }, () => {
      test(
        "Iniciar sesión con credenciales válidas",
        { tag: "@smoke" },
        async ({ page }) => {
          // instanciamos el page de sauceLoginPage para poder interactuar con el login
          const sauceLoginPage = new SauceLoginPage(page);

          await test.step("Paso 1: Abrir la página de inicio de sesión", async () => {
            await sauceLoginPage.goto();
          });

          await test.step("Paso 2: Ingresar credenciales válidas", async () => {
            // Completa ambos campos con el usuario estándar de SauceDemo.
            await sauceLoginPage.login(STANDARD_USER, PASSWORD);
          });

          await test.step("Paso 3: Verificar que se abrió el inventario", async () => {
            // Comprueba la URL de destino y que el título del inventario sea visible.
            expect(await sauceLoginPage.getInventoryPageVisible()).toBeTruthy();
          });
        },
      );

      test("Rechazar credenciales inválidas", async ({ page }) => {
        const sauceLoginPage = new SauceLoginPage(page);

        await test.step("Paso 1: Abrir la página de inicio de sesión", async () => {
          // Empieza en una página limpia de login.
          await sauceLoginPage.goto();
        });

        await test.step("Paso 2: Enviar una contraseña incorrecta", async () => {
          // Usa un usuario conocido, pero una contraseña que no es válida.
          // Envía el formulario para provocar la respuesta de error    .
          await sauceLoginPage.login(STANDARD_USER, "wrong_password");
        });

        await test.step("Paso 3: Verificar el mensaje de error", async () => {
          // Confirma el texto del error y que el formulario de login siga visible.
          // definimos una constante con el mensaje de error esperado.
          const msjError =
            "Epic sadface: Username and password do not match any user in this service";
          expect(await sauceLoginPage.getErrorMessage()).toContain(msjError);
        });
      });

      test("Impedir el acceso al usuario bloqueado", async ({ page }) => {
        const sauceLoginPage = new SauceLoginPage(page);
        await test.step("Paso 1: Abrir la página de inicio de sesión", async () => {
          // Abre el formulario antes de probar el usuario bloqueado.
          // invocando el método goto del page object SauceLoginPage.
          await sauceLoginPage.goto();
        });

        await test.step("Paso 2: Intentar ingresar con locked_out_user", async () => {
          // Completa el formulario con el usuario bloqueado y la contraseña de demo.
          // invocando el método login del page object SauceLoginPage con el usuario bloqueado y la contraseña de demo.
          await sauceLoginPage.login("locked_out_user", PASSWORD);
        });

        await test.step("Paso 3: Verificar que el acceso fue bloqueado", async () => {
          // Comprueba que SauceDemo informa que la cuenta está bloqueada.
          // definimos una constante con el msj de error
          const msjError = "Sorry, this user has been locked out";
          expect(await sauceLoginPage.getErrorMessage()).toContain(msjError);
        });
      });

      test("Cerrar sesión e impedir el acceso directo al inventario", async ({
        page,
      }) => {
        const sauceLoginPage = new SauceLoginPage(page);
        await test.step("Paso 1: Iniciar sesión", async () => {
          // invocando el método goto del page object SauceLoginPage y luego login con usuario estándar y contraseña de demo.
          await sauceLoginPage.goto();
          await sauceLoginPage.login(STANDARD_USER, PASSWORD);
          expect(await sauceLoginPage.getInventoryPageVisible()).toBeTruthy();
        });

        await test.step("Paso 2: Cerrar sesión desde el menú", async () => {
          // Abre la navegación lateral y selecciona la opción para salir.
          await sauceLoginPage.logout();
        });

        await test.step("Paso 3: Verificar el regreso al login", async () => {
          // La presencia del campo de usuario confirma que terminó la sesión.
          // invocamos los métodos del page object SauceLoginPage para verificar la visibilidad de los campos y el botón de login.
          expect(await sauceLoginPage.isUsernameVisible()).toBeTruthy();
          expect(await sauceLoginPage.isPasswordVisible()).toBeTruthy();
          expect(await sauceLoginPage.isLoginButtonVisible()).toBeTruthy();
        });

        await test.step("Paso 4: Verificar que el inventario requiere autenticación", async () => {
          // Intenta abrir directamente una ruta protegida después de salir.
          await new SauceInventoryPage(page).openInventoryDirectly();
          // Confirma que el sitio redirige al formulario de acceso.();
          expect(await sauceLoginPage.isUsernameVisible()).toBeTruthy();
          expect(await sauceLoginPage.isPasswordVisible()).toBeTruthy();
          expect(await sauceLoginPage.isLoginButtonVisible()).toBeTruthy();
        });
      });
    });

    // Suite para las opciones de ordenamiento y el detalle de producto.
    test.describe("Inventario", { tag: "@inventory" }, () => {
      test.beforeEach(async ({ page }) => {
        const sauceLoginPage = new SauceLoginPage(page);

        await test.step("Preparación: Iniciar sesión", async () => {
          // instanciar un objeto de la clase SauceLoginPage y realizar el login.
          await sauceLoginPage.goto();
          await sauceLoginPage.login(STANDARD_USER, PASSWORD);
          await sauceLoginPage.getInventoryPageVisible();
        });
      });

      test("Ordenar productos por nombre y precio", async ({ page }) => {
        // Estos locators representan los nombres y precios visibles del inventario.
        // instaciar un SauceInventoryPage para interactuar con la página de inventario.
        const sauceLoginPage = new SauceLoginPage(page);
        const sauceInventoryPage = await sauceLoginPage.goToInventoryPage();

        await test.step("Paso 1: Ordenar nombres de A a Z", async () => {
          // El valor "az" selecciona el orden alfabético ascendente.
          await sauceInventoryPage.orderByName("az", "Sauce Labs Backpack");

          const productNames = await sauceInventoryPage.getProductNames();
          await expect(productNames).toEqual([
            "Sauce Labs Backpack",
            "Sauce Labs Bike Light",
            "Sauce Labs Bolt T-Shirt",
            "Sauce Labs Fleece Jacket",
            "Sauce Labs Onesie",
            "Test.allTheThings() T-Shirt (Red)",
          ]);
        });

        await test.step("Paso 2: Ordenar nombres de Z a A", async () => {
          // El valor "za" selecciona el orden alfabético descendente.
          await sauceInventoryPage.orderByName(
            "za",
            "Test.allTheThings() T-Shirt (Red)",
          );
          const productNames = await sauceInventoryPage.getProductNames();
          await expect(productNames).toEqual([
            "Test.allTheThings() T-Shirt (Red)",
            "Sauce Labs Onesie",
            "Sauce Labs Fleece Jacket",
            "Sauce Labs Bolt T-Shirt",
            "Sauce Labs Bike Light",
            "Sauce Labs Backpack",
          ]);
        });

        await test.step("Paso 3: Ordenar precios de menor a mayor", async () => {
          // El valor "lohi" ordena los precios de menor a mayor.
          await sauceInventoryPage.orderByPrice("lohi", "$7.99");
          const productPrices = await sauceInventoryPage.getProductPrices();
          await expect(productPrices).toEqual([
            "$7.99",
            "$9.99",
            "$15.99",
            "$15.99",
            "$29.99",
            "$49.99",
          ]);
        });

        await test.step("Paso 4: Ordenar precios de mayor a menor", async () => {
          // El valor "hilo" ordena los precios de mayor a menor.
          await sauceInventoryPage.orderByPrice("hilo", "$49.99");
          const productPrices = await sauceInventoryPage.getProductPrices();
          await expect(productPrices).toEqual([
            "$49.99",
            "$29.99",
            "$15.99",
            "$15.99",
            "$9.99",
            "$7.99",
          ]);
        });
      });

      test("Abrir el detalle de un producto y regresar al inventario", async ({
        page,
      }) => {
        const sauceInventoryPage = new SauceInventoryPage(page);
        const sauceProductDetailPage = new SauceProductDetailPage(page);

        await test.step("Paso 1: Abrir el detalle de Sauce Labs Backpack", async () => {
          await sauceInventoryPage.openProductDetail("Sauce Labs Backpack");
          expect(await sauceProductDetailPage.validateUrl()).toBeTruthy();
        });

        await test.step("Paso 2: Verificar la información del producto", async () => {
          // invocar métodos de instancia de SauceProductDetailPage para verificar visibilidad de elementos
          expect(
            await sauceProductDetailPage.isProductNameVisible(),
          ).toBeTruthy();
          expect(
            await sauceProductDetailPage.isProductDescriptionVisible(),
          ).toBeTruthy();
          expect(
            await sauceProductDetailPage.isProductPriceVisible(),
          ).toBeTruthy();
          expect(
            await sauceProductDetailPage.isAddToCartButtonVisible(),
          ).toBeTruthy();
        });

        await test.step("Paso 3: Regresar al inventario", async () => {
          await sauceProductDetailPage.goBackToProducts();
          await expect(page).toHaveURL(/inventory.html/);
        });
      });
    });

    // Suite para agregar, quitar y conservar artículos del carrito.
    test.describe("Carrito", { tag: "@cart" }, () => {
      test.beforeEach(async ({ page }) => {
        await loginTo(page);
      });

      test("Agregar y quitar productos del carrito", async ({ page }) => {
        const inventoryPage = new SauceInventoryPage(page);
        const cartPage = new SauceCartPage(page);

        await test.step("Paso 1: Agregar Sauce Labs Backpack", async () => {
          await inventoryPage.addProductToCart("Sauce Labs Backpack");
          await expect.poll(() => inventoryPage.getCartBadgeText()).toBe("1");
        });

        await test.step("Paso 2: Abrir el carrito y verificar el producto", async () => {
          await inventoryPage.openCart();
          await expect.poll(() => cartPage.getItemCount()).toBe(1);
          await expect
            .poll(() => cartPage.getItemNames())
            .toContain("Sauce Labs Backpack");
        });

        await test.step("Paso 3: Quitar el producto", async () => {
          await cartPage.removeProduct("Sauce Labs Backpack");
          await expect.poll(() => cartPage.getItemCount()).toBe(0);
          await expect.poll(() => cartPage.isCartBadgeVisible()).toBe(false);
        });
      });

      test("Conservar productos al navegar entre inventario y carrito", async ({
        page,
      }) => {
        const inventoryPage = new SauceInventoryPage(page);
        const cartPage = new SauceCartPage(page);

        await test.step("Paso 1: Agregar dos productos", async () => {
          await inventoryPage.addProductToCart("Sauce Labs Backpack");
          await inventoryPage.addProductToCart("Sauce Labs Bike Light");
          await expect(await inventoryPage.getCartBadgeText()).toBe("2");
        });

        await test.step("Paso 2: Verificar ambos productos en el carrito", async () => {
          await inventoryPage.openCart();
          await expect(await cartPage.getItemCount()).toBe(2);
          await expect(await cartPage.getItemNames()).toEqual([
            "Sauce Labs Backpack",
            "Sauce Labs Bike Light",
          ]);
        });

        await test.step("Paso 3: Volver al inventario", async () => {
          await cartPage.continueShopping();
          await expect(page).toHaveURL(/inventory.html/);
          await expect(await inventoryPage.getCartBadgeText()).toBe("2");
        });

        await test.step("Paso 4: Confirmar que los productos siguen en el carrito", async () => {
          await inventoryPage.openCart();
          await expect(await cartPage.getItemCount()).toBe(2);
          await expect(await cartPage.getItemNames()).toEqual([
            "Sauce Labs Backpack",
            "Sauce Labs Bike Light",
          ]);
        });
      });
    });

    // Suite para completar una compra y verificar errores de datos obligatorios.
    test.describe("Checkout", { tag: "@checkout" }, () => {
      test.beforeEach(async ({ page }) => {
        await loginTo(page);
      });

      test(
        "Completar la compra de dos productos",
        { tag: "@smoke" },
        async ({ page }) => {
          const inventoryPage = new SauceInventoryPage(page);
          const cartPage = new SauceCartPage(page);

          await test.step("Paso 1: Agregar dos productos al carrito", async () => {
            await inventoryPage.addProductToCart("Sauce Labs Backpack");
            await inventoryPage.addProductToCart("Sauce Labs Bike Light");
            await expect(await inventoryPage.getCartBadgeText()).toBe("2");
          });

          await test.step("Paso 2: Revisar el carrito y comenzar el checkout", async () => {
            await inventoryPage.openCart();
            await expect(await cartPage.getItemCount()).toBe(2);
            await expect(await cartPage.getItemNames()).toEqual([
              "Sauce Labs Backpack",
              "Sauce Labs Bike Light",
            ]);
            await cartPage.checkout();
            await expect(page).toHaveURL(/checkout-step-one.html/);
          });

          await test.step("Paso 3: Completar los datos del comprador", async () => {
            const informationPage = new SauceCheckoutInformationPage(page);
            await informationPage.fillData("Ada", "Lovelace", "12345");
            await expect(page).toHaveURL(/checkout-step-two.html/);
          });

          await test.step("Paso 4: Verificar productos y totales", async () => {
            const overviewPage = new SauceCheckoutOverviewPage(page);
            expect(await overviewPage.getItemCount()).toBe(2);
            expect(await overviewPage.getSubtotal()).toBe("Item total: $39.98");
            expect(await overviewPage.getTax()).toBe("Tax: $3.20");
            expect(await overviewPage.getTotal()).toBe("Total: $43.18");
          });

          await test.step("Paso 5: Finalizar y validar la confirmación", async () => {
            await new SauceCheckoutOverviewPage(page).finish();
            await expect(page).toHaveURL(/checkout-complete.html/);
            const completePage = new SauceCheckoutCompletePage(page);
            expect(await completePage.getCompleteHeaderText()).toBe(
              "Thank you for your order!",
            );
            expect(await completePage.isBackToHomeButtonVisible()).toBe(true);
            await completePage.backToHome();
            await expect(page).toHaveURL(/inventory.html/);
          });
        },
      );

      test(
        "Completar checkout y descargar el PDF de la orden",
        { tag: "@pdf" },
        async ({ page }) => {
          const inventoryPage = new SauceInventoryPage(page);
          const cartPage = new SauceCartPage(page);

          await test.step("Paso 1: Agregar un producto al carrito", async () => {
            await inventoryPage.addProductToCart("Sauce Labs Backpack");
            await expect(await inventoryPage.getCartBadgeText()).toBe("1");
          });

          await test.step("Paso 2: Abrir el carrito e iniciar el checkout", async () => {
            await inventoryPage.openCart();
            await expect(await cartPage.getItemNames()).toContain(
              "Sauce Labs Backpack",
            );
            await cartPage.checkout();
            await expect(page).toHaveURL(/checkout-step-one.html/);
          });

          await test.step("Paso 3: Completar los datos del comprador", async () => {
            await new SauceCheckoutInformationPage(page).fillData(
              "Ada",
              "Lovelace",
              "12345",
            );
            await expect(page).toHaveURL(/checkout-step-two.html/);
          });

          await test.step("Paso 4: Confirmar el resumen de la orden", async () => {
            await expect(
              await new SauceCheckoutOverviewPage(page).getItemNames(),
            ).toContain("Sauce Labs Backpack");
          });

          await test.step("Paso 5: Finalizar la compra", async () => {
            await new SauceCheckoutOverviewPage(page).finish();
            await expect(page).toHaveURL(/checkout-complete.html/);
            await expect(
              await new SauceCheckoutCompletePage(page).getCompleteHeaderText(),
            ).toBe("Thank you for your order!");
          });

          await test.step("Paso 6: Generar y validar el PDF descargado", async () => {
            await new SauceCheckoutCompletePage(page).generatePDF();
          });
        },
      );

      // Estos tres tests repiten los escenarios de forma explícita, sin arreglos ni bucles.
      /*test.describe(
        "Validaciones escritas paso a paso",
        { tag: "@checkout-explicit" },
        () => {
          test("Validar checkout sin nombre", async ({ page }) => {
            const informationPage = await openCheckoutInformation(page);
            await informationPage.fillData("", "Lovelace", "12345");
            await expect(await informationPage.getErrorMessage()).toBe(
              "Error: First Name is required",
            );
            await expect(page).toHaveURL(/checkout-step-one.html/);
          });

          test("Validar checkout sin apellido", async ({ page }) => {
            const informationPage = await openCheckoutInformation(page);
            await informationPage.fillData("Ada", "", "12345");
            await expect(await informationPage.getErrorMessage()).toBe(
              "Error: Last Name is required",
            );
            await expect(page).toHaveURL(/checkout-step-one.html/);
          });

          test("Validar checkout sin código postal", async ({ page }) => {
            const informationPage = await openCheckoutInformation(page);
            await informationPage.fillData("Ada", "Lovelace", "");
            await expect(await informationPage.getErrorMessage()).toBe(
              "Error: Postal Code is required",
            );
            await expect(page).toHaveURL(/checkout-step-one.html/);
          });
        },
      );
    */
    });
  },
);

// Cada objeto representa un caso de prueba: datos del formulario y error esperado.
/*
const missingCheckoutFields = [
  {
    field: "First Name",
    firstName: "",
    lastName: "Lovelace",
    postalCode: "12345",
    message: "Error: First Name is required",
  },
  {
    field: "Last Name",
    firstName: "Ada",
    lastName: "",
    postalCode: "12345",
    message: "Error: Last Name is required",
  },
  {
    field: "Zip/Postal Code",
    firstName: "Ada",
    lastName: "Lovelace",
    postalCode: "",
    message: "Error: Postal Code is required",
  },
];

// for...of toma un escenario por vuelta y recorre el arreglo en orden.
for (const scenario of missingCheckoutFields) {
  // Playwright registra un test independiente usando los datos del escenario actual.
  test(`Validar checkout sin completar ${scenario.field}`, async ({ page }) => {
    await loginTo(page);
    const informationPage = await openCheckoutInformation(page);

    await test.step("Paso 1: Abrir el formulario de checkout", async () => {
      await expect(page).toHaveURL(/checkout-step-one.html/);
    });

    await test.step(`Paso 2: Dejar vacío el campo ${scenario.field}`, async () => {
      await informationPage.fillData(
        scenario.firstName,
        scenario.lastName,
        scenario.postalCode,
      );
    });

    await test.step("Paso 3: Verificar que no se avance y se muestre el error", async () => {
      await expect(await informationPage.getErrorMessage()).toBe(
        scenario.message,
      );
      await expect(page).toHaveURL(/checkout-step-one.html/);
    });
  });
}
  */
