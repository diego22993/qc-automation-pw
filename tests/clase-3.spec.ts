import { test, expect, type Page } from "@playwright/test";

test.describe("LOGIN.HTML - Nivel Principiante", { tag: ["@login"] },() => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });

  test("Ejercicio 1(getByPlaceholder)", async ({ page }) => {
    const username = page.getByPlaceholder('Username');
    await username.fill('standard_user');
    await expect(username).toHaveValue('standard_user');
  });

  test("Ejercicio 2(getByPlaceholder)", { tag: ["@smoke"] }, async ({ page }) => {
    const password = page.getByPlaceholder('Password');
    await password.fill('secret_sauce');
    await expect(password).toHaveValue('secret_sauce'); 
  });

  test("Ejercicio 3(getByRole):", async ({ page }) => {
    await page.getByRole('button', {name:'Login'}).click();
  });

  test("Ejercicio 4(getByText):", async ({ page }) =>{
    await page.getByRole('button', {name:'Login'}).click();
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();

  });

  test("Ejercicio 5(CSS Selector ID):", async ({ page}) =>{
    const username = page.locator('#user-name');
    await username.fill('standard_user');
    await expect(username).toHaveValue('standard_user');
  });

  test("Ejercicio 6(CSS Selector ID)", async ({ page}) =>{
    const password = page.locator('#password');
    await password.fill('secret_sauce');
    await expect(password).toHaveValue('secret_sauce');
  });
});

test.describe("INVENTARIO.HTML - Nivel Básico", {tag: ["@Inventario"]}, () =>{

  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveURL("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test("Ejercicio 7 (getByRole - Heading)", async ({page}) =>{
    await expect(page.getByText( 'Swag Labs')).toBeVisible();
    
  });

  test("Ejercicio 8 (getByText)", async ({page}) => {
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

  });

    test("Ejercicio 9 (getByAltText)", async ({page}) => {
    await expect(page.getByAltText('Sauce Labs Bolt T-Shirt')).toBeVisible();

  });

  test("Ejercicio 10 (.first())", async ({page}) => {
    const btnAgregar = page.getByRole('button', {name: 'Add to cart'})
    await btnAgregar.first().click();

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

  });

  test("Ejercicio 11 (.last())", async ({page}) => {
    const btnAgregar = page.getByRole('button', {name: 'Add to cart'})
    await btnAgregar.last().click();

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

  });

  test("Ejercicio 12 (.nth())", async ({page}) => {
    const ImgProductos = page.locator(".inventory_item img");
    await ImgProductos.nth(1).click();


  });
  
});

test.describe("CART.HTML - Nivel Básico", { tag: ["@cart"] },() => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveURL("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/.*inventory.html/);
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/.*cart.html/);
  });

  test("Ejercicio 13 (getByText)", async ({ page }) => {
    await expect(page.getByText('QTY')).toBeVisible();
 
  });

  test("Ejercicio 14 (getByText)", async ({ page }) => {
    await expect(page.getByText('Description')).toBeVisible();
  });

  test("Ejercicio 15 (getByRole)", async ({ page }) =>{
    const btnContinuar = page.getByRole('button', {name:'Continue Shopping'});
    await expect(btnContinuar).toBeVisible();
  });

});
test.describe("CHECKOUT-STEP-ONE.HTML - Nivel Básico", { tag: ["@cart"] },() => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveURL("https://www.saucedemo.com/");
    // Iniciar sesión
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();

    // Agregar un producto
    await page.getByRole("button", { name: "Add to cart" }).first().click();
    
    // Ingresar al carrito
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Comenzar el checkout
    await page.getByRole("button", { name: "Checkout" }).click();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test("Ejercicio 16 (getByPlaceholder)", async ({ page }) =>{
    const firstName = page.getByPlaceholder('First Name');
    await firstName.fill('Yohana');
    await expect(firstName).toHaveValue('Yohana');
  });

  test("Ejercicio 17 (getByPlaceholder)", async ({ page }) =>{
    const lastName = page.getByPlaceholder('Last Name');
    await lastName.fill('Cortez');
    await expect(lastName).toHaveValue('Cortez');
  });

  test("Ejercicio 18 (getByPlaceholder)", async ({ page }) =>{
    const zipCode = page.getByPlaceholder('Zip/Postal Code');
    await zipCode.fill('5000');
    await expect(zipCode).toHaveValue('5000');
  });
  
});

test.describe(
  "CHECKOUT - Nivel Básico",
  { tag: ["@checkout"] },
  () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("https://www.saucedemo.com/");

      // Login
      await page.locator("#user-name").fill("standard_user");
      await page.locator("#password").fill("secret_sauce");
      await page.getByRole("button", { name: "Login" }).click();

      // Agregar el primer producto
      await page
        .getByRole("button", { name: "Add to cart" })
        .first()
        .click();

      // Ir al carrito
      await page
        .locator('[data-test="shopping-cart-link"]')
        .click();

      await page.getByRole("button", { name: "Checkout" }).click();

      // Completar información del comprador
      await page.getByPlaceholder("First Name").fill("Yohana");
      await page.getByPlaceholder("Last Name").fill("Cortez");
      await page.getByPlaceholder("Zip/Postal Code").fill("5000");

      await page.getByRole("button", { name: "Continue" }).click();

      await expect(page).toHaveURL(/checkout-step-two\.html/);
    });

    test(
      'Ejercicio 19 - ubicar "Payment Information:"',
      async ({ page }) => {
        const paymentInformation = page.getByText(
          "Payment Information:",
          { exact: true }
        );

        await expect(paymentInformation).toBeVisible();
      }
    );

    test(
      "Ejercicio 20 - validar título de agradecimiento",
      async ({ page }) => {
        await page.getByRole("button", { name: "Finish" }).click();

        await expect(page).toHaveURL(/checkout-complete\.html/);

        const tituloAgradecimiento = page.getByRole("heading", {
          name: "Thank you for your order!",
        });

        await expect(tituloAgradecimiento).toBeVisible();
      }
    );
  }
);

test.describe(
  "LOGIN E INVENTARIO - Nivel Intermedio",
  {
    tag: [
      "@login-inventario",
      "@level-intermedio",
    ],
  },
  () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("https://www.saucedemo.com/");
    });

    async function iniciarSesion(page: Page) {
      await page.locator("#user-name").fill("standard_user");
      await page.locator("#password").fill("secret_sauce");
      await page
        .locator('[data-test="login-button"]')
        .click();

      await expect(page).toHaveURL(/inventory\.html/);
    }

    test(
      "Ejercicio 21 - CSS atributo personalizado",
      async ({ page }) => {
        await page.locator("#user-name").fill("standard_user");
        await page.locator("#password").fill("secret_sauce");

        const botonLogin = page.locator(
          '[data-test="login-button"]'
        );

        await expect(botonLogin).toBeVisible();
        await botonLogin.click();

        await expect(page).toHaveURL(/inventory\.html/);
      }
    );

    test(
      "Ejercicio 22 - ordenar Price low to high",
      async ({ page }) => {
        await iniciarSesion(page);

        const selectorOrdenamiento =
          page.getByRole("combobox");

        await selectorOrdenamiento.selectOption({
          label: "Price (low to high)",
        });

        await expect(selectorOrdenamiento).toHaveValue("lohi");
      }
    );

    test(
      "Ejercicio 23 - ordenar Name Z to A",
      async ({ page }) => {
        await iniciarSesion(page);
        const selectorOrdenamiento =
          page.getByRole("combobox");

        await selectorOrdenamiento.selectOption({
          label: "Name (Z to A)",
        });

        await expect(selectorOrdenamiento).toHaveValue("za");
      }
    );

    test(
      "Ejercicio 24 - filtrar Sauce Labs Onesie",
      async ({ page }) => {
        await iniciarSesion(page);
        const producto = page
          .locator(".inventory_item")
          .filter({ hasText: "Sauce Labs Onesie" });

        await expect(producto).toBeVisible();
        await expect(producto).toHaveCount(1);
      }
    );

    test(
      "Ejercicio 25 - filtrar y agregar Bike Light",
      async ({ page }) => {
        await iniciarSesion(page);
        const producto = page
          .locator(".inventory_item")
          .filter({ hasText: "Sauce Labs Bike Light" });

        await producto
          .getByRole("button", { name: "Add to cart" })
          .click();

        await expect(
          page.locator('[data-test="shopping-cart-badge"]')
        ).toHaveText("1");
      }
    );

    test(
      "Ejercicio 26 - obtener todos los precios",
      async ({ page }) => {
        await iniciarSesion(page);
        const precios = page
          .locator("#inventory_container")
          .locator(".inventory_item")
          .locator(".inventory_item_price");

        await expect(precios).toHaveCount(6);
      }
    );

    test(
      "Ejercicio 27 - validar precio de Fleece Jacket",
      async ({ page }) => {
        await iniciarSesion(page);
        const producto = page
          .locator(".inventory_item")
          .filter({ hasText: "Sauce Labs Fleece Jacket" });

        const precio = producto.locator(
          ".inventory_item_price"
        );

        await expect(precio).toHaveText("$49.99");
      }
    );
  }
);

test.describe(
  "CARRITO Y NAVEGACIÓN - Nivel Intermedio",
  {
    tag: [
      "@carrito-navegacion",
      "@level-intermedio",
    ],
  },
  () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("https://www.saucedemo.com/");

      await page.locator("#user-name").fill("standard_user");
      await page.locator("#password").fill("secret_sauce");
      await page
        .locator('[data-test="login-button"]')
        .click();

      await expect(page).toHaveURL(/inventory\.html/);
    });

    async function agregarDosProductos(page: Page) {
      const botonesAgregar = page.getByRole("button", {
        name: "Add to cart",
      });

      // Después del primer clic, el botón cambia a "Remove".
      // Por eso volvemos a seleccionar el primero disponible.
      await botonesAgregar.first().click();
      await botonesAgregar.first().click();
    }

    async function irAlCarrito(page: Page) {
      await page
        .locator('[data-test="shopping-cart-link"]')
        .click();

      await expect(page).toHaveURL(/cart\.html/);
    }

    test(
      "Ejercicio 28 - validar badge del carrito",
      async ({ page }) => {
        await agregarDosProductos(page);

        const badge = page
          .locator(".shopping_cart_container")
          .locator(".shopping_cart_badge");

        await expect(badge).toHaveText("2");
      }
    );

    test(
      "Ejercicio 29 - filtrar y remover Backpack",
      async ({ page }) => {
        await agregarDosProductos(page);
        await irAlCarrito(page);

        const backpack = page
          .locator(".cart_item")
          .filter({ hasText: "Sauce Labs Backpack" });

        await backpack
          .getByRole("button", { name: "Remove" })
          .click();

        await expect(backpack).toHaveCount(0);

        await expect(
          page.locator(".shopping_cart_badge")
        ).toHaveText("1");
      }
    );

    test(
      "Ejercicio 30 - remover todos los productos",
      async ({ page }) => {
        await agregarDosProductos(page);
        await irAlCarrito(page);

        const itemsCarrito = page.locator(".cart_item");
        const botonesRemove = page.getByRole("button", {
          name: "Remove",
        });

        // Se elimina el primer botón disponible dos veces.
        await botonesRemove.first().click();
        await botonesRemove.first().click();

        const cantidadItems = await itemsCarrito.count();

        expect(cantidadItems).toBe(0);
      }
    );

    test(
      "Ejercicio 31 - navegar al checkout",
      async ({ page }) => {
        await agregarDosProductos(page);
        await irAlCarrito(page);

        await page
          .getByRole("button", { name: "Checkout" })
          .click();

        await expect(page).toHaveURL(
          /checkout-step-one\.html/
        );
      }
    );
  }
);
test.describe(
  "FORMULARIO CHECKOUT-STEP-ONE - Nivel Intermedio",
  {
    tag: [
      "@checkout-step-one",
      "@level-intermedio",
    ],
  },
  () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("https://www.saucedemo.com/");

      // Login
      await page.locator("#user-name").fill("standard_user");
      await page.locator("#password").fill("secret_sauce");
      await page
        .locator('[data-test="login-button"]')
        .click();

      // Agregar producto
      await page
        .getByRole("button", { name: "Add to cart" })
        .first()
        .click();

      // Ingresar al carrito
      await page
        .locator('[data-test="shopping-cart-link"]')
        .click();

      // Iniciar checkout
      await page
        .getByRole("button", { name: "Checkout" })
        .click();

      await expect(page).toHaveURL(
        /checkout-step-one\.html/
      );
    });

    test(
      "Ejercicio 32 - validar formulario vacío",
      async ({ page }) => {
        await page
          .getByRole("button", { name: "Continue" })
          .click();

        const mensajeError = page.getByText(
          "Error: First Name is required",
          { exact: true }
        );

        await expect(mensajeError).toBeVisible();
      }
    );

    test(
      "Ejercicio 33 - completar formulario con placeholders",
      async ({ page }) => {
        const firstName =
          page.getByPlaceholder("First Name");

        const lastName =
          page.getByPlaceholder("Last Name");

        const postalCode =
          page.getByPlaceholder("Zip/Postal Code");

        await firstName.fill("Yohana");
        await lastName.fill("Cortez");
        await postalCode.fill("5000");

        await expect(firstName).toHaveValue("Yohana");
        await expect(lastName).toHaveValue("Cortez");
        await expect(postalCode).toHaveValue("5000");
      }
    );

    test(
      "Ejercicio 34 - cancelar checkout",
      async ({ page }) => {
        await page
          .getByRole("button", { name: "Cancel" })
          .click();

        await expect(page).toHaveURL(/cart\.html/);
      }
    );
  }
);

test.describe(
  "FORMULARIO CHECKOUT-STEP-TWO & COMPLETE - Nivel Intermedio",
  {
    tag: [
      "@checkout-complete",
      "@level-intermedio",
    ],
  },
  () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("https://www.saucedemo.com/");

      // Login
      await page.locator("#user-name").fill("standard_user");
      await page.locator("#password").fill("secret_sauce");
      await page
        .locator('[data-test="login-button"]')
        .click();

      // Agregar producto
      await page
        .getByRole("button", { name: "Add to cart" })
        .first()
        .click();

      // Ir al carrito
      await page
        .locator('[data-test="shopping-cart-link"]')
        .click();

      // Iniciar checkout
      await page
        .getByRole("button", { name: "Checkout" })
        .click();

      // Completar formulario
      await page
        .getByPlaceholder("First Name")
        .fill("Yohana");

      await page
        .getByPlaceholder("Last Name")
        .fill("Cortez");

      await page
        .getByPlaceholder("Zip/Postal Code")
        .fill("5000");

      await page
        .getByRole("button", { name: "Continue" })
        .click();

      await expect(page).toHaveURL(
        /checkout-step-two\.html/
      );
    });

    test(
      "Ejercicio 35 - validar Item total",
      async ({ page }) => {
        const itemTotal = page.locator(
          ".summary_subtotal_label"
        );

        await expect(itemTotal).toBeVisible();
        await expect(itemTotal).toContainText("Item total:");
      }
    );

    test(
      "Ejercicio 36 - validar impuestos",
      async ({ page }) => {
        const impuesto = page.locator(
          ".summary_tax_label"
        );

        await expect(impuesto).toBeVisible();
        await expect(impuesto).toContainText("Tax:");
      }
    );

    test(
      "Ejercicio 37 - validar total final",
      async ({ page }) => {
        const totalFinal = page.locator(
          ".summary_total_label"
        );

        await expect(totalFinal).toBeVisible();
        await expect(totalFinal).toContainText("Total:");
      }
    );

    test(
      "Ejercicio 38 - confirmar envío con Finish",
      async ({ page }) => {
        await page
          .getByRole("button", { name: "Finish" })
          .click();

        await expect(page).toHaveURL(
          /checkout-complete\.html/
        );
      }
    );

    test(
      "Ejercicio 39 - validar texto de confirmación",
      async ({ page }) => {
        await page
          .getByRole("button", { name: "Finish" })
          .click();

        await expect(page).toHaveURL(
          /checkout-complete\.html/
        );

        const textoConfirmacion = page.getByText(
          /Your order has been dispatched/
        );

        await expect(textoConfirmacion).toBeVisible();
      }
    );

    test(
      "Ejercicio 40 - regresar al inventario",
      async ({ page }) => {
        // Llegar a la página de confirmación
        await page
          .getByRole("button", { name: "Finish" })
          .click();

        await expect(page).toHaveURL(
          /checkout-complete\.html/
        );

        // Regresar al inicio
        await page
          .getByRole("button", { name: "Back Home" })
          .click();

        await expect(page).toHaveURL(/inventory\.html/);

        await expect(
          page.locator('[data-test="title"]')
        ).toHaveText("Products");
      }
    );
  }
);

test.describe(
  "MENÚ LATERAL & ACCESIBILIDAD - Nivel Avanzado",
  {
    tag: [
      "@menu-lateral",
      "@level-avanzado",
    ],
  },
  () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("https://www.saucedemo.com/");

      await page.locator("#user-name").fill("standard_user");
      await page.locator("#password").fill("secret_sauce");

      await page
        .locator('[data-test="login-button"]')
        .click();

      await expect(page).toHaveURL(/inventory\.html/);
    });

    test(
      "Ejercicio 41 - abrir menú hamburguesa",
      async ({ page }) => {
        const botonMenu = page.locator(
          "#react-burger-menu-btn"
        );

        await botonMenu.click();

        await expect(
          page.getByRole("button", { name: "Logout" })
        ).toBeVisible();
      }
    );

    test(
      "Ejercicio 42 - logout desde el menú",
      async ({ page }) => {
        await page
          .locator("#react-burger-menu-btn")
          .click();

        const botonLogout = page.getByRole("button", {
          name: "Logout",
        });

        await expect(botonLogout).toBeVisible();

        await botonLogout.click();

        await expect(page).toHaveURL(
          "https://www.saucedemo.com/"
        );

        await expect(
          page.getByRole("button", { name: "Login" })
        ).toBeVisible();
      }
    );

    test(
      "Ejercicio 43 - Reset App State",
      async ({ page }) => {
        await page
          .getByRole("button", { name: "Add to cart" })
          .first()
          .click();

        const badge = page.locator(
          ".shopping_cart_badge"
        );

        await expect(badge).toHaveText("1");

        await page
          .locator("#react-burger-menu-btn")
          .click();

        const botonReset = page.getByRole("button", {
          name: "Reset App State",
        });

        await expect(botonReset).toBeVisible();

        await botonReset.click();

        await expect(badge).toHaveCount(0);
      }
    );
  }
);
test.describe(
  "MANIPULACIÓN AVANZADA DE COLECCIONES - Nivel Avanzado",
  {
    tag: [
      "@manipulacion-colecciones",
      "@level-avanzado",
    ],
  },
  () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("https://www.saucedemo.com/");

      await page.locator("#user-name").fill("standard_user");
      await page.locator("#password").fill("secret_sauce");
      await page
        .locator('[data-test="login-button"]')
        .click();

      await expect(page).toHaveURL(/inventory\.html/);
      await expect(page.locator(".inventory_item")).toHaveCount(6);
    });

    test(
      "Ejercicio 44 - agregar el 1.o, 3.o y 5.o producto",
      async ({ page }) => {
        const productos = page.locator(".inventory_item");

        await productos
          .nth(0)
          .getByRole("button", { name: "Add to cart" })
          .click();

        await productos
          .nth(2)
          .getByRole("button", { name: "Add to cart" })
          .click();

        await productos
          .nth(4)
          .getByRole("button", { name: "Add to cart" })
          .click();

        await expect(
          page.locator(".shopping_cart_badge")
        ).toHaveText("3");
      }
    );

    test(
      "Ejercicio 45 - filtrar productos sin agregar",
      async ({ page }) => {
        const productosSinAgregar = page
          .locator(".inventory_item")
          .filter({
            has: page.getByRole("button", {
              name: "Add to cart",
            }),
          });

        await expect(productosSinAgregar).toHaveCount(6);
      }
    );

    test(
      "Ejercicio 46 - validar cuatro productos en el carrito",
      async ({ page }) => {
        const productos = page.locator(".inventory_item");

        for (let indice = 0; indice < 4; indice++) {
          await productos
            .nth(indice)
            .getByRole("button", { name: "Add to cart" })
            .click();
        }

        await page
          .locator('[data-test="shopping-cart-link"]')
          .click();

        await expect(page).toHaveURL(/cart\.html/);
        await expect(page.locator(".cart_item")).toHaveCount(4);
      }
    );

    test(
      "Ejercicio 47 - validar productos con precio mayor a $20",
      async ({ page }) => {
        const productos = page.locator(".inventory_item");
        const cantidadProductos = await productos.count();
        let productosMayoresA20 = 0;

        for (let indice = 0; indice < cantidadProductos; indice++) {
          const producto = productos.nth(indice);
          const textoPrecio = await producto
            .locator(".inventory_item_price")
            .innerText();

          const precio = Number(textoPrecio.replace("$", ""));

          if (precio > 20) {
            productosMayoresA20++;
            await expect(producto).toBeVisible();
            expect(precio).toBeGreaterThan(20);
          }
        }

        expect(productosMayoresA20).toBe(2);
      }
    );
  }
);

test.describe(
  "VALIDACIONES ESTRICTAS E2E POR PANTALLAS - Nivel Avanzado",
  {
    tag: ["@validaciones-e2e", "@level-avanzado"],
  },
  () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("https://www.saucedemo.com/");
      await page.locator("#user-name").fill("standard_user");
      await page.locator("#password").fill("secret_sauce");
      await page.locator('[data-test="login-button"]').click();

      await expect(page).toHaveURL(/inventory\.html/);
    });

    test(
      "Ejercicio 48 - navegar al detalle desde la imagen",
      async ({ page }) => {
        await page
          .getByAltText("Sauce Labs Backpack", { exact: true })
          .click();

        await expect(page).toHaveURL(/inventory-item\.html/);
        await expect(
          page.getByRole("button", {
            name: "Back to products",
            exact: true,
          })
        ).toBeVisible();
      }
    );

    test(
      "Ejercicio 49 - agregar un producto desde el detalle",
      async ({ page }) => {
        await page
          .getByAltText("Sauce Labs Backpack", { exact: true })
          .click();

        await expect(page).toHaveURL(/inventory-item\.html/);

        const detalleProducto = page.locator(".inventory_details");

        await detalleProducto
          .getByRole("button", {
            name: "Add to cart",
            exact: true,
          })
          .click();

        await expect(
          detalleProducto.getByRole("button", {
            name: "Remove",
            exact: true,
          })
        ).toBeVisible();
      }
    );

    test(
      "Ejercicio 50 - ordenar productos de Z a A",
      async ({ page }) => {
        await page.getByRole("combobox").selectOption("za");

        const primerProducto = page
          .locator(".inventory_list")
          .locator(".inventory_item_name")
          .first();

        await expect(primerProducto).toHaveText(
          "Test.allTheThings() T-Shirt (Red)"
        );
      }
    );

    test(
      "Ejercicio 51 - ordenar precios de menor a mayor",
      async ({ page }) => {
        await page.getByRole("combobox").selectOption("lohi");

        await expect(
          page
            .locator(".inventory_list")
            .locator(".inventory_item_price")
            .first()
        ).toHaveText("$7.99");
      }
    );

    test(
      "Ejercicio 52 - ordenar precios de mayor a menor",
      async ({ page }) => {
        await page.getByRole("combobox").selectOption("hilo");

        await expect(
          page
            .locator(".inventory_list")
            .locator(".inventory_item_price")
            .first()
        ).toHaveText("$49.99");
      }
    );
  }
);

test.describe(
  "FLUJOS COMPLETOS INTEGRALES - Nivel Avanzado",
  {
    tag: ["@flujos-integrales", "@level-avanzado"],
  },
  () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("https://www.saucedemo.com/");
      await expect(page).toHaveURL("https://www.saucedemo.com/");
    });

    async function iniciarSesion(page: Page) {
      await page.locator("#user-name").fill("standard_user");
      await page.locator("#password").fill("secret_sauce");
      await page.getByRole("button", { name: "Login" }).click();

      await expect(page).toHaveURL(/inventory\.html/);
    }

    async function agregarProducto(page: Page, nombre: string) {
      const producto = page
        .locator(".inventory_item")
        .filter({ hasText: nombre });

      await expect(producto).toHaveCount(1);
      await producto
        .getByRole("button", { name: "Add to cart" })
        .click();
    }

    async function irAlCarrito(page: Page) {
      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page).toHaveURL(/cart\.html/);
    }

    async function iniciarCheckout(page: Page) {
      await page.getByRole("button", { name: "Checkout" }).click();
      await expect(page).toHaveURL(/checkout-step-one\.html/);
    }

    async function completarFormulario(page: Page) {
      await page.getByPlaceholder("First Name").fill("Yohana");
      await page.getByPlaceholder("Last Name").fill("Cortez");
      await page.getByPlaceholder("Zip/Postal Code").fill("5000");
    }

    async function continuarAlResumen(page: Page) {
      await page.getByRole("button", { name: "Continue" }).click();
      await expect(page).toHaveURL(/checkout-step-two\.html/);
    }

    async function finalizarCompra(page: Page) {
      await page.getByRole("button", { name: "Finish" }).click();
      await expect(page).toHaveURL(/checkout-complete\.html/);
      await expect(
        page.getByRole("heading", {
          name: "Thank you for your order!",
        })
      ).toBeVisible();
    }

    test(
      "Ejercicio 53 - compra simple de un producto",
      async ({ page }) => {
        await iniciarSesion(page);
        await agregarProducto(page, "Sauce Labs Backpack");
        await irAlCarrito(page);
        await iniciarCheckout(page);
        await completarFormulario(page);
        await continuarAlResumen(page);
        await finalizarCompra(page);
      }
    );

    test(
      "Ejercicio 54 - compra múltiple de tres productos específicos",
      async ({ page }) => {
        await iniciarSesion(page);

        const nombresProductos = [
          "Sauce Labs Backpack",
          "Sauce Labs Bike Light",
          "Sauce Labs Onesie",
        ];

        for (const nombre of nombresProductos) {
          await agregarProducto(page, nombre);
        }

        await expect(page.locator(".shopping_cart_badge")).toHaveText("3");
        await irAlCarrito(page);

        for (const nombre of nombresProductos) {
          await expect(
            page.getByText(nombre, { exact: true })
          ).toBeVisible();
        }

        await iniciarCheckout(page);
        await completarFormulario(page);
        await continuarAlResumen(page);
        await finalizarCompra(page);
      }
    );

    test(
      "Ejercicio 55 - modificar el carrito antes del checkout",
      async ({ page }) => {
        await iniciarSesion(page);
        await agregarProducto(page, "Sauce Labs Backpack");
        await agregarProducto(page, "Sauce Labs Bike Light");
        await irAlCarrito(page);

        const productoAEliminar = page
          .locator(".cart_item")
          .filter({ hasText: "Sauce Labs Backpack" });

        await productoAEliminar
          .getByRole("button", { name: "Remove" })
          .click();

        await expect(productoAEliminar).toHaveCount(0);
        await expect(page.locator(".cart_item")).toHaveCount(1);
        await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

        await iniciarCheckout(page);
        await completarFormulario(page);
        await continuarAlResumen(page);
        await expect(page.locator(".cart_item")).toHaveCount(1);
        await finalizarCompra(page);
      }
    );

    test(
      "Ejercicio 56 - corregir Zip vacío y finalizar la compra",
      async ({ page }) => {
        await iniciarSesion(page);
        await agregarProducto(page, "Sauce Labs Backpack");
        await irAlCarrito(page);
        await iniciarCheckout(page);

        await page.getByPlaceholder("First Name").fill("Yohana");
        await page.getByPlaceholder("Last Name").fill("Cortez");
        await page.getByRole("button", { name: "Continue" }).click();

        await expect(
          page.getByText("Error: Postal Code is required", {
            exact: true,
          })
        ).toBeVisible();
        await expect(page).toHaveURL(/checkout-step-one\.html/);

        await page.getByPlaceholder("Zip/Postal Code").fill("5000");
        await continuarAlResumen(page);
        await finalizarCompra(page);
      }
    );

    test(
      "Ejercicio 57 - cancelar desde checkout paso dos",
      async ({ page }) => {
        await iniciarSesion(page);
        await agregarProducto(page, "Sauce Labs Backpack");
        await irAlCarrito(page);
        await iniciarCheckout(page);
        await completarFormulario(page);
        await continuarAlResumen(page);

        await page.getByRole("button", { name: "Cancel" }).click();

        await expect(page).toHaveURL(/inventory\.html/);
        await expect(page.locator('[data-test="title"]')).toHaveText(
          "Products"
        );
      }
    );

    test(
      "Ejercicio 58 - navegación inversa hasta el inventario",
      async ({ page }) => {
        await iniciarSesion(page);
        await agregarProducto(page, "Sauce Labs Backpack");
        await irAlCarrito(page);
        await iniciarCheckout(page);

        await page.getByRole("button", { name: "Cancel" }).click();
        await expect(page).toHaveURL(/cart\.html/);

        await page
          .getByRole("button", { name: "Continue Shopping" })
          .click();

        await expect(page).toHaveURL(/inventory\.html/);
      }
    );

    test(
      "Ejercicio 59 - verificar datos de pago y envío",
      async ({ page }) => {
        await iniciarSesion(page);
        await agregarProducto(page, "Sauce Labs Backpack");
        await irAlCarrito(page);
        await iniciarCheckout(page);
        await completarFormulario(page);
        await continuarAlResumen(page);

        const valoresResumen = page.locator(".summary_value_label");

        await expect(valoresResumen.nth(0)).toContainText("SauceCard");
        await expect(valoresResumen.nth(1)).toContainText(
          "Free Pony Express Delivery!"
        );
      }
    );

    test(
      "Ejercicio 60 - máximo reto integrador",
      async ({ page }) => {
        await iniciarSesion(page);
        await page.getByRole("combobox").selectOption("lohi");

        const productos = page.locator(".inventory_item");
        const productoMasBarato = productos.first();
        const productoMasCaro = productos.last();

        await expect(
          productoMasBarato.locator(".inventory_item_price")
        ).toHaveText("$7.99");
        await expect(
          productoMasCaro.locator(".inventory_item_price")
        ).toHaveText("$49.99");

        await productoMasBarato
          .getByRole("button", { name: "Add to cart" })
          .click();
        await productoMasCaro
          .getByRole("button", { name: "Add to cart" })
          .click();

        await irAlCarrito(page);

        const itemMasBarato = page
          .locator(".cart_item")
          .filter({ hasText: "$7.99" });

        await itemMasBarato
          .getByRole("button", { name: "Remove" })
          .click();

        await expect(itemMasBarato).toHaveCount(0);
        await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

        await iniciarCheckout(page);
        await completarFormulario(page);
        await continuarAlResumen(page);

        await expect(page.locator(".cart_item")).toHaveCount(1);
        await expect(
          page.locator(".cart_item").locator(".inventory_item_price")
        ).toHaveText("$49.99");

        await finalizarCompra(page);
        await page.getByRole("button", { name: "Back Home" }).click();

        await expect(page).toHaveURL(/inventory\.html/);
        await expect(page.locator(".shopping_cart_badge")).toHaveCount(0);
      }
    );
  }
);

