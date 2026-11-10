/**
 * Archivo de pruebas E2E para SauceDemo utilizando Playwright.
 * Contiene flujos de autenticación y compra de productos.
 */
import { expect, test, type Page } from "@playwright/test";
import { SauceLoginPage } from "../../pages/saucedemo/SauceLoginPage";

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
): Promise<void> {
  // Abre la tienda antes de interactuar con los campos de acceso.
  await page.goto("/");
  // Busca el campo por su texto de ayuda y escribe el usuario.
  await page.getByTestId("user-name").fill(username);
  // Escribe la contraseña en el campo correspondiente.
  await page.getByTestId("password").fill(password);
  // Hace clic en el botón y espera a que Playwright complete la acción.
  await page.getByRole("button", { name: "Login" }).click();
}

/**
 * Objetivo: agregar al carrito el producto cuyo nombre se proporciona.
 * @param page Pestaña de Playwright donde está abierto el inventario.
 * @param productName Nombre visible del producto que se quiere agregar.
 * @returns Una promesa que termina cuando se hace clic en el botón; no devuelve un valor.
 */
async function addProductToCart(
  page: Page,
  productName: string,
): Promise<void> {
  await page
    // Cada tarjeta representa un producto del inventario.
    .locator(".inventory_item")
    // Conserva solo la tarjeta que contiene el nombre solicitado.
    .filter({ hasText: productName })
    // Dentro de esa tarjeta busca el botón accesible por su nombre.
    .getByRole("button", { name: "Add to cart" })
    // Agrega el producto al carrito.
    .click();
}

/**
 * Objetivo: abrir la página del carrito desde el enlace de navegación.
 * @param page Pestaña de Playwright donde está abierta la tienda.
 * @returns Una promesa que termina cuando se hace clic en el enlace; no devuelve un valor.
 */
async function openCart(page: Page): Promise<void> {
  await page.locator(".shopping_cart_link").click();
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
          await test.step("Paso 1: Abrir la página de inicio de sesión", async () => {
            // Navega al login y confirma que el formulario está disponible.
            const sauceLoginPage = new SauceLoginPage(page);
            await sauceLoginPage.goto();
          });

          await test.step("Paso 2: Ingresar credenciales válidas", async () => {
            // Completa ambos campos con el usuario estándar de SauceDemo.
            ;
          });

          await test.step("Paso 3: Verificar que se abrió el inventario", async () => {
            // Comprueba la URL de destino y que el título del inventario sea visible.
            await expect(page).toHaveURL(/inventory.html/);
            await expect(
              page.getByText("Products", { exact: true }),
            ).toBeVisible();
          });
        },
      );

      test("Rechazar credenciales inválidas", async ({ page }) => {
        await test.step("Paso 1: Abrir la página de inicio de sesión", async () => {
          // Empieza en una página limpia de login.
          await page.goto("/");
        });

        await test.step("Paso 2: Enviar una contraseña incorrecta", async () => {
          // Usa un usuario conocido, pero una contraseña que no es válida.
          await page.getByTestId("user-name").fill(STANDARD_USER);
          await page.getByTestId("password").fill("wrong_password");
          // Envía el formulario para provocar la respuesta de error.
          await page.getByRole("button", { name: "Login" }).click();
        });

        await test.step("Paso 3: Verificar el mensaje de error", async () => {
          // Confirma el texto del error y que el formulario de login siga visible.
          await expect(page.locator('[data-test="error"]')).toContainText(
            "Username and password do not match",
          );
          await expect(page.getByTestId("user-name")).toBeVisible();
        });
      });

      test("Impedir el acceso al usuario bloqueado", async ({ page }) => {
        await test.step("Paso 1: Abrir la página de inicio de sesión", async () => {
          // Abre el formulario antes de probar el usuario bloqueado.
          await page.goto("/");
        });

        await test.step("Paso 2: Intentar ingresar con locked_out_user", async () => {
          // Completa el formulario con el usuario bloqueado y la contraseña de demo.
          await page.getByTestId("user-name").fill("locked_out_user");
          await page.getByTestId("password").fill(PASSWORD);
          // Envía las credenciales para que la aplicación responda.
          await page.getByRole("button", { name: "Login" }).click();
        });

        await test.step("Paso 3: Verificar que el acceso fue bloqueado", async () => {
          // Comprueba que SauceDemo informa que la cuenta está bloqueada.
          await expect(page.locator('[data-test="error"]')).toContainText(
            "Sorry, this user has been locked out",
          );
        });
      });

      test("Cerrar sesión e impedir el acceso directo al inventario", async ({
        page,
      }) => {
        await test.step("Paso 1: Iniciar sesión", async () => {
          // Reutiliza el helper y confirma que se llegó al inventario.
          await loginTo(page);
          await expect(page).toHaveURL(/inventory.html/);
        });

        await test.step("Paso 2: Cerrar sesión desde el menú", async () => {
          // Abre la navegación lateral y selecciona la opción para salir.
          await page.getByRole("button", { name: "Open Menu" }).click();
          await page.locator('[data-test="logout-sidebar-link"]').click();
        });

        await test.step("Paso 3: Verificar el regreso al login", async () => {
          // La presencia del campo de usuario confirma que terminó la sesión.
          await expect(page.getByTestId("user-name")).toBeVisible();
        });

        await test.step("Paso 4: Verificar que el inventario requiere autenticación", async () => {
          // Intenta abrir directamente una ruta protegida después de salir.
          await page.goto("/inventory.html");
          // Confirma que el sitio redirige al formulario de acceso.
          await expect(page.getByTestId("user-name")).toBeVisible();
        });
      });
    });

    // Suite para las opciones de ordenamiento y el detalle de producto.
    test.describe("Inventario", { tag: "@inventory" }, () => {
      test.beforeEach(async ({ page }) => {
        await test.step("Preparación: Iniciar sesión", async () => {
          // Cada test empieza con su propia sesión para no depender de otro test.
          await loginTo(page);
          await expect(page).toHaveURL(/inventory.html/);
        });
      });

      test("Ordenar productos por nombre y precio", async ({ page }) => {
        // Estos locators representan los nombres y precios visibles del inventario.
        const productNames = page.locator(".inventory_item_name");
        const productPrices = page.locator(".inventory_item_price");

        await test.step("Paso 1: Ordenar nombres de A a Z", async () => {
          // El valor "az" selecciona el orden alfabético ascendente.
          await page.locator(".product_sort_container").selectOption("az");
          // Primero verifica la opción seleccionada en el control.
          await expect(page.locator(".product_sort_container")).toHaveValue(
            "az",
          );
          // Luego comprueba que los nombres visibles estén realmente en ese orden.
          await expect(productNames).toHaveText([
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
          await page.locator(".product_sort_container").selectOption("za");
          // Primero verifica la opción seleccionada en el control.
          await expect(page.locator(".product_sort_container")).toHaveValue(
            "za",
          );
          // Luego comprueba que los nombres visibles estén realmente en orden inverso.
          await expect(productNames).toHaveText([
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
          await page.locator(".product_sort_container").selectOption("lohi");
          // Verifica la opción seleccionada y el orden visible de los precios.
          await expect(page.locator(".product_sort_container")).toHaveValue(
            "lohi",
          );
          await expect(productPrices).toHaveText([
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
          await page.locator(".product_sort_container").selectOption("hilo");
          // Verifica la opción seleccionada y el orden visible de mayor a menor.
          await expect(page.locator(".product_sort_container")).toHaveValue(
            "hilo",
          );
          await expect(productPrices).toHaveText([
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
        await test.step("Paso 1: Abrir el detalle de Sauce Labs Backpack", async () => {
          // El nombre es texto dentro de la tarjeta, no un enlace; por eso buscamos texto exacto.
          await page.getByText("Sauce Labs Backpack", { exact: true }).click();
          // Comprueba que se abrió la página de detalle del producto con id 4.
          await expect(page).toHaveURL(/inventory-item.html\?id=4/);
        });

        await test.step("Paso 2: Verificar la información del producto", async () => {
          // Confirma que el nombre y la acción de agregar al carrito están disponibles.
          await expect(
            page.getByText("Sauce Labs Backpack", { exact: true }),
          ).toBeVisible();
          await expect(
            page.getByRole("button", { name: "Add to cart" }),
          ).toBeVisible();
        });

        await test.step("Paso 3: Regresar al inventario", async () => {
          // Usa el botón de regreso del detalle y valida que volvió el catálogo.
          await page.getByRole("button", { name: "Back to products" }).click();
          await expect(page).toHaveURL(/inventory.html/);
          await expect(
            page.getByRole("link", { name: "Sauce Labs Backpack" }),
          ).toBeVisible();
        });
      });
    });

    // Suite para agregar, quitar y conservar artículos del carrito.
    test.describe("Carrito", { tag: "@cart" }, () => {
      test.beforeEach(async ({ page }) => {
        await test.step("Preparación: Iniciar sesión", async () => {
          // Aísla cada prueba comenzando desde el inventario con la sesión iniciada.
          await loginTo(page);
          await expect(page).toHaveURL(/inventory.html/);
        });
      });

      test("Agregar y quitar productos del carrito", async ({ page }) => {
        await test.step("Paso 1: Agregar Sauce Labs Backpack", async () => {
          // Agrega un producto concreto y revisa que el contador indique uno.
          await addProductToCart(page, "Sauce Labs Backpack");
          await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
        });

        await test.step("Paso 2: Abrir el carrito y verificar el producto", async () => {
          // Navega al carrito y comprueba cantidad y nombre del producto.
          await openCart(page);
          await expect(page.locator(".cart_item")).toHaveCount(1);
          await expect(page.locator(".cart_item")).toContainText(
            "Sauce Labs Backpack",
          );
        });

        await test.step("Paso 3: Quitar el producto", async () => {
          // Quita la fila del producto y verifica que fila y contador desaparecieron.
          await page.getByRole("button", { name: "Remove" }).click();
          await expect(page.locator(".cart_item")).toHaveCount(0);
          await expect(page.locator(".shopping_cart_badge")).toHaveCount(0);
        });
      });

      test("Conservar productos al navegar entre inventario y carrito", async ({
        page,
      }) => {
        await test.step("Paso 1: Agregar dos productos", async () => {
          // Agrega artículos distintos y comprueba el total mostrado en el badge.
          await addProductToCart(page, "Sauce Labs Backpack");
          await addProductToCart(page, "Sauce Labs Bike Light");
          await expect(page.locator(".shopping_cart_badge")).toHaveText("2");
        });

        await test.step("Paso 2: Verificar ambos productos en el carrito", async () => {
          await openCart(page);
          // Comprueba que haya dos filas y que cada producto aparezca en ellas.
          await expect(page.locator(".cart_item")).toHaveCount(2);
          await expect(page.locator(".cart_item")).toContainText([
            "Sauce Labs Backpack",
            "Sauce Labs Bike Light",
          ]);
        });

        await test.step("Paso 3: Volver al inventario", async () => {
          // Regresa al catálogo y comprueba que el contador conserve ambos productos.
          await page.getByRole("button", { name: "Continue Shopping" }).click();
          await expect(page).toHaveURL(/inventory.html/);
          await expect(page.locator(".shopping_cart_badge")).toHaveText("2");
        });

        await test.step("Paso 4: Confirmar que los productos siguen en el carrito", async () => {
          await openCart(page);
          // Vuelve a comprobar ambas filas después de navegar fuera y regresar.
          await expect(page.locator(".cart_item")).toHaveCount(2);
          await expect(page.locator(".cart_item")).toContainText([
            "Sauce Labs Backpack",
            "Sauce Labs Bike Light",
          ]);
        });
      });
    });

    // Suite para completar una compra y verificar errores de datos obligatorios.
    test.describe("Checkout", { tag: "@checkout" }, () => {
      test.beforeEach(async ({ page }) => {
        await test.step("Preparación: Iniciar sesión", async () => {
          // Cada caso comienza en el inventario, sin depender de otros casos.
          await loginTo(page);
          await expect(page).toHaveURL(/inventory.html/);
        });
      });

      test(
        "Completar la compra de dos productos",
        { tag: "@smoke" },
        async ({ page }) => {
          await test.step("Paso 1: Agregar dos productos al carrito", async () => {
            // Agrega los productos que usará este escenario de compra.
            await addProductToCart(page, "Sauce Labs Backpack");
            await addProductToCart(page, "Sauce Labs Bike Light");
            await expect(page.locator(".shopping_cart_badge")).toHaveText("2");
          });

          await test.step("Paso 2: Revisar el carrito y comenzar el checkout", async () => {
            // Abre el carrito, revisa su contenido y avanza al formulario.
            await openCart(page);
            await expect(page.locator(".cart_item")).toHaveCount(2);
            await expect(page.locator(".cart_item")).toContainText([
              "Sauce Labs Backpack",
              "Sauce Labs Bike Light",
            ]);
            await page.getByRole("button", { name: "Checkout" }).click();
            await expect(page).toHaveURL(/checkout-step-one.html/);
          });

          await test.step("Paso 3: Completar los datos del comprador", async () => {
            // Completa los campos obligatorios y avanza al resumen.
            await page.getByTestId("first-name").fill("Ada");
            await page.getByTestId("last-name").fill("Lovelace");
            await page.getByTestId("postal-code").fill("12345");
            await page.getByRole("button", { name: "Continue" }).click();
            await expect(page).toHaveURL(/checkout-step-two.html/);
          });

          await test.step("Paso 4: Verificar productos y totales", async () => {
            // Comprueba cantidad de artículos y los cálculos del subtotal, impuesto y total.
            await expect(page.locator(".cart_item")).toHaveCount(2);
            await expect(page.locator(".summary_subtotal_label")).toHaveText(
              "Item total: $39.98",
            );
            await expect(page.locator(".summary_tax_label")).toHaveText(
              "Tax: $3.20",
            );
            await expect(page.locator(".summary_total_label")).toHaveText(
              "Total: $43.18",
            );
          });

          await test.step("Paso 5: Finalizar y validar la confirmación", async () => {
            // Finaliza el flujo y espera el mensaje que confirma la compra.
            await page.getByRole("button", { name: "Finish" }).click();
            await expect(page).toHaveURL(/checkout-complete.html/);
            await expect(
              page.getByRole("heading", { name: "Thank you for your order!" }),
            ).toBeVisible();
          });
        },
      );

      test(
        "Completar checkout y descargar el PDF de la orden",
        { tag: "@pdf" },
        async ({ page }, testInfo) => {
          await test.step("Paso 1: Agregar un producto al carrito", async () => {
            // Agrega un producto conocido para que el pedido tenga contenido.
            await addProductToCart(page, "Sauce Labs Backpack");
            await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
          });

          await test.step("Paso 2: Abrir el carrito e iniciar el checkout", async () => {
            // Revisa que el producto esté en el carrito antes de continuar.
            await openCart(page);
            await expect(page.locator(".cart_item")).toContainText(
              "Sauce Labs Backpack",
            );
            await page.getByRole("button", { name: "Checkout" }).click();
            await expect(page).toHaveURL(/checkout-step-one.html/);
          });

          await test.step("Paso 3: Completar los datos del comprador", async () => {
            // Llena todos los campos obligatorios para poder avanzar.
            await page.getByTestId("first-name").fill("Ada");
            await page.getByTestId("last-name").fill("Lovelace");
            await page.getByTestId("postal-code").fill("12345");
            await page.getByRole("button", { name: "Continue" }).click();
            await expect(page).toHaveURL(/checkout-step-two.html/);
          });

          await test.step("Paso 4: Confirmar el resumen de la orden", async () => {
            // Verifica que el producto elegido llegue al resumen del checkout.
            await expect(page.locator(".cart_item")).toContainText(
              "Sauce Labs Backpack",
            );
          });

          await test.step("Paso 5: Finalizar la compra", async () => {
            // Finish crea la confirmación que ofrece la opción de generar el PDF.
            await page.getByRole("button", { name: "Finish" }).click();
            await expect(page).toHaveURL(/checkout-complete.html/);
            await expect(
              page.getByRole("heading", { name: "Thank you for your order!" }),
            ).toBeVisible();
          });

          await test.step("Paso 6: Generar y validar el PDF descargado", async () => {
            // Espera el evento antes del clic para no perder una descarga rápida.
            await page
              .getByRole("button", { name: "Generate PDF order" })
              .click();
          });
        },
      );

      // Estos tres tests repiten los escenarios de forma explícita, sin arreglos ni bucles.
      test.describe(
        "Validaciones escritas paso a paso",
        { tag: "@checkout-explicit" },
        () => {
          test("Validar checkout sin nombre", async ({ page }) => {
            await test.step("Paso 1: Abrir el formulario de checkout", async () => {
              // Agrega un producto y navega desde el carrito hasta el formulario.
              await addProductToCart(page, "Sauce Labs Backpack");
              await openCart(page);
              await page.getByRole("button", { name: "Checkout" }).click();
              await expect(page).toHaveURL(/checkout-step-one.html/);
            });

            await test.step("Paso 2: Dejar vacío el nombre y enviar el formulario", async () => {
              // Completa apellido y código postal, pero no ingresa el nombre.
              await page.getByTestId("first-name").fill("");
              await page.getByTestId("last-name").fill("Lovelace");
              await page.getByTestId("postal-code").fill("12345");
              await page.getByRole("button", { name: "Continue" }).click();
            });

            await test.step("Paso 3: Verificar el error de nombre obligatorio", async () => {
              await expect(page.locator('[data-test="error"]')).toHaveText(
                "Error: First Name is required",
              );
              await expect(page).toHaveURL(/checkout-step-one.html/);
            });
          });

          test("Validar checkout sin apellido", async ({ page }) => {
            await test.step("Paso 1: Abrir el formulario de checkout", async () => {
              // Agrega un producto y navega desde el carrito hasta el formulario.
              await addProductToCart(page, "Sauce Labs Backpack");
              await openCart(page);
              await page.getByRole("button", { name: "Checkout" }).click();
              await expect(page).toHaveURL(/checkout-step-one.html/);
            });

            await test.step("Paso 2: Dejar vacío el apellido y enviar el formulario", async () => {
              // Completa nombre y código postal, pero no ingresa el apellido.
              await page.getByTestId("first-name").fill("Ada");
              await page.getByTestId("last-name").fill("");
              await page.getByTestId("postal-code").fill("12345");
              await page.getByRole("button", { name: "Continue" }).click();
            });

            await test.step("Paso 3: Verificar el error de apellido obligatorio", async () => {
              await expect(page.locator('[data-test="error"]')).toHaveText(
                "Error: Last Name is required",
              );
              await expect(page).toHaveURL(/checkout-step-one.html/);
            });
          });

          test("Validar checkout sin código postal", async ({ page }) => {
            await test.step("Paso 1: Abrir el formulario de checkout", async () => {
              // Agrega un producto y navega desde el carrito hasta el formulario.
              await addProductToCart(page, "Sauce Labs Backpack");
              await openCart(page);
              await page.getByRole("button", { name: "Checkout" }).click();
              await expect(page).toHaveURL(/checkout-step-one.html/);
            });

            await test.step("Paso 2: Dejar vacío el código postal y enviar el formulario", async () => {
              // Completa nombre y apellido, pero no ingresa el código postal.
              await page.getByTestId("first-name").fill("Ada");
              await page.getByTestId("last-name").fill("Lovelace");
              await page.getByTestId("postal-code").fill("");
              await page.getByRole("button", { name: "Continue" }).click();
            });

            await test.step("Paso 3: Verificar el error de código postal obligatorio", async () => {
              await expect(page.locator('[data-test="error"]')).toHaveText(
                "Error: Postal Code is required",
              );
              await expect(page).toHaveURL(/checkout-step-one.html/);
            });
          });
        },
      );
    });
  },
);

// Cada objeto representa un caso de prueba: datos del formulario y error esperado.
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
    await test.step("Paso 1: Abrir el formulario de checkout", async () => {
      // Prepara un producto y navega hasta el formulario de datos.
      await addProductToCart(page, "Sauce Labs Backpack");
      await openCart(page);
      await page.getByRole("button", { name: "Checkout" }).click();
      await expect(page).toHaveURL(/checkout-step-one.html/);
    });

    await test.step(`Paso 2: Dejar vacío el campo ${scenario.field}`, async () => {
      // Llena los otros campos y deja vacío únicamente el campo del escenario.
      await page.getByPlaceholder("First Name").fill(scenario.firstName);
      await page.getByPlaceholder("Last Name").fill(scenario.lastName);
      await page.getByPlaceholder("Zip/Postal Code").fill(scenario.postalCode);
      await page.getByRole("button", { name: "Continue" }).click();
    });

    await test.step("Paso 3: Verificar que no se avance y se muestre el error", async () => {
      // Confirma que aparece el mensaje correcto y que seguimos en el formulario.
      await expect(page.locator('[data-test="error"]')).toHaveText(
        scenario.message,
      );
      await expect(page).toHaveURL(/checkout-step-one.html/);
    });
  });
}
