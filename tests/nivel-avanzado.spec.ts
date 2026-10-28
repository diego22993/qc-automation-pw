

import { test, expect } from '@playwright/test';

// =====================================================
// NIVEL AVANZADO - MENÚ LATERAL Y ACCESIBILIDAD
// EJERCICIOS 41 AL 43
// =====================================================

test.describe('SauceDemo - Nivel Avanzado - Menú lateral', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.inventory_item')).toHaveCount(6);

  });

  // EJERCICIO 41 - MENÚ HAMBURGUESA
  test('Ejercicio 41 - Abrir menú lateral', async ({ page }) => {

    const menuButton = page.locator('#react-burger-menu-btn');

    await expect(menuButton).toBeVisible();

    await menuButton.click();

    const logout = page.locator('#logout_sidebar_link');

    await expect(logout).toBeVisible();

  });

  // EJERCICIO 42 - LOGOUT
  test('Ejercicio 42 - Cerrar sesión desde el menú', async ({ page }) => {

    await page.locator('#react-burger-menu-btn').click();

    const logout = page.locator('#logout_sidebar_link');

    await expect(logout).toBeVisible();

    // Usamos el ID porque getByRole no encontró el enlace
    // en las ejecuciones anteriores.
    await logout.click();

    await expect(page).toHaveURL('https://www.saucedemo.com/');

    await expect(
      page.getByRole('button', { name: 'Login' })
    ).toBeVisible();

  });

  // EJERCICIO 43 - RESET APP STATE
  test('Ejercicio 43 - Limpiar carrito con Reset App State', async ({ page }) => {

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('2');

    await page.locator('#react-burger-menu-btn').click();

    const resetApp = page.locator('#reset_sidebar_link');

    await expect(resetApp).toBeVisible();

    await resetApp.click();

    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveCount(0);

  });


 // =====================================================
 // NIVEL AVANZADO - MANIPULACIÓN DE COLECCIONES
 // EJERCICIOS 44 AL 47
 // =====================================================

test.describe('SauceDemo - Nivel Avanzado - Inventario', () => {

  // PRECONDICIONES
  test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory.html/);

    // Esperar a que carguen los seis productos
    await expect(page.locator('.inventory_item')).toHaveCount(6);

  });

  // EJERCICIO 44 - NTH() E ITERACIÓN
  test('Ejercicio 44 - Agregar productos 1, 3 y 5', async ({ page }) => {

    const productos = page.locator('.inventory_item');

    const posiciones = [0, 2, 4];

    for (const posicion of posiciones) {

      const producto = productos.nth(posicion);

      await producto
        .getByRole('button', { name: 'Add to cart' })
        .click();

    }

    // Validar tres productos agregados
    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('3');

  });

  // EJERCICIO 45 - FILTER() POR SUBELEMENTO
  test('Ejercicio 45 - Filtrar productos disponibles para agregar', async ({ page }) => {

    // Agregar dos productos
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Filtrar tarjetas que todavía tengan Add to cart
    const productosDisponibles = page.locator('.inventory_item')
      .filter({
        has: page.getByRole('button', { name: 'Add to cart' })
      });

    // Deben quedar cuatro productos disponibles
    await expect(productosDisponibles).toHaveCount(4);

  });

  // EJERCICIO 46 - CONTEO DINÁMICO
  test('Ejercicio 46 - Validar cuatro productos en el carrito', async ({ page }) => {

    const productos = page.locator('.inventory_item');

    // Agregar cuatro productos
    for (let i = 0; i < 4; i++) {

      await productos.nth(i)
        .getByRole('button', { name: 'Add to cart' })
        .click();

    }

    // Validar badge del carrito
    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('4');

    // Navegar al carrito
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL(/cart.html/);

    // Validar cuatro productos
    await expect(page.locator('.cart_item')).toHaveCount(4);

  });

  // EJERCICIO 47 - VALIDACIÓN MÚLTIPLE DE PRECIOS
  test('Ejercicio 47 - Identificar productos con precio mayor a 20', async ({ page }) => {

    const productos = page.locator('.inventory_item');

    await expect(productos).toHaveCount(6);

    const cantidadProductos = await productos.count();

    console.log('Cantidad de productos:', cantidadProductos);

    let productosMayoresA20 = 0;

    for (let i = 0; i < cantidadProductos; i++) {

      const producto = productos.nth(i);

      // Obtener nombre
      const nombre = await producto
        .locator('.inventory_item_name')
        .innerText();

      // Obtener precio
      const precioTexto = await producto
        .locator('.inventory_item_price')
        .innerText();

      // Convertir "$29.99" en 29.99
      const precio = Number(
        precioTexto.replace(/[^0-9.]/g, '')
      );

      console.log(
        `Producto: ${nombre} | Precio: ${precioTexto} | Valor: ${precio}`
      );

      // Validar conversión numérica
      expect(Number.isFinite(precio)).toBe(true);

      if (precio > 20) {

        productosMayoresA20++;

        await expect(producto).toBeVisible();

        expect(precio).toBeGreaterThan(20);

      }

    }

    console.log(
      'Productos mayores a $20:',
      productosMayoresA20
    );

    expect(productosMayoresA20).toBeGreaterThan(0);

  });

});


});


// =====================================================
// NIVEL AVANZADO - MANIPULACIÓN DE COLECCIONES
// EJERCICIOS 44 AL 47
// =====================================================

test.describe('SauceDemo - Nivel Avanzado - Inventario', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory.html/);

    // Esperamos que el catálogo esté cargado
    await expect(page.locator('.inventory_item')).toHaveCount(6);

  });

  // EJERCICIO 44 - NTH() E ITERACIÓN
  test('Ejercicio 44 - Agregar productos 1, 3 y 5', async ({ page }) => {

    const productos = page.locator('.inventory_item');

    const posiciones = [0, 2, 4];

    for (const posicion of posiciones) {

      const producto = productos.nth(posicion);

      await producto
        .getByRole('button', { name: 'Add to cart' })
        .click();

    }

    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('3');

  });

  // EJERCICIO 45 - FILTER() POR SUBELEMENTO
  test('Ejercicio 45 - Filtrar productos disponibles para agregar', async ({ page }) => {

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    const productosDisponibles = page.locator('.inventory_item')
      .filter({
        has: page.getByRole('button', { name: 'Add to cart' })
      });

    await expect(productosDisponibles).toHaveCount(4);

  });

  // EJERCICIO 46 - CONTEO DINÁMICO
  test('Ejercicio 46 - Validar cuatro productos en el carrito', async ({ page }) => {

    const productos = page.locator('.inventory_item');

    for (let i = 0; i < 4; i++) {

      await productos.nth(i)
        .getByRole('button', { name: 'Add to cart' })
        .click();

    }

    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('4');

    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL(/cart.html/);

    await expect(page.locator('.cart_item')).toHaveCount(4);

  });

  // EJERCICIO 47 - VALIDACIÓN MÚLTIPLE DE PRECIOS
  test('Ejercicio 47 - Identificar productos con precio mayor a 20', async ({ page }) => {

    const productos = page.locator('.inventory_item');

    // Esperar a que los productos estén cargados
    await expect(productos).toHaveCount(6);

    const cantidadProductos = await productos.count();

    console.log('Cantidad de productos:', cantidadProductos);

    let productosMayoresA20 = 0;

    for (let i = 0; i < cantidadProductos; i++) {

      const producto = productos.nth(i);

      const nombre = await producto
        .locator('.inventory_item_name')
        .innerText();

      const precioTexto = await producto
        .locator('.inventory_item_price')
        .innerText();

      // Convertir el precio a número
      const precio = Number(
        precioTexto.replace(/[^0-9.]/g, '')
      );

      console.log(
        `Producto: ${nombre} | Precio: ${precioTexto} | Valor numérico: ${precio}`
      );

      // Verificar que el precio sea válido
      expect(Number.isFinite(precio)).toBe(true);

      if (precio > 20) {

        productosMayoresA20++;

        await expect(producto).toBeVisible();

        expect(precio).toBeGreaterThan(20);

      }

    }

    console.log(
      'Cantidad de productos mayores a $20:',
      productosMayoresA20
    );

    expect(productosMayoresA20).toBeGreaterThan(0);

  });

  //VALIDACIÓN ESTRICTAS END-TO-END (E2E) POR PANTALLAS

 // =====================================================
 // NIVEL AVANZADO - DETALLE DE PRODUCTO Y ORDENAMIENTO
 // EJERCICIOS 48 AL 52
 // =====================================================

test.describe('SauceDemo - Nivel Avanzado - Detalle y Ordenamiento', () => {

  // PRECONDICIONES: Login antes de cada ejercicio
  test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory.html/);

    // Esperar a que carguen los seis productos
    await expect(page.locator('.inventory_item')).toHaveCount(6);

  });

  // EJERCICIO 48 - DETALLE DE PRODUCTO - NAVEGACIÓN
  test('Ejercicio 48 - Navegar al detalle desde la imagen', async ({ page }) => {

    // Seleccionar la imagen de Sauce Labs Backpack por su texto alternativo
    const imagenProducto = page.getByAltText('Sauce Labs Backpack');

    await expect(imagenProducto).toBeVisible();

    // Hacer clic en la imagen del producto
    await imagenProducto.click();

    // Validar navegación a la página de detalle
    await expect(page).toHaveURL(/inventory-item.html/);

    // Validar botón para regresar al inventario
    await expect(
      page.getByRole('button', { name: 'Back to products' })
    ).toBeVisible();

  });

  // EJERCICIO 49 - AGREGAR PRODUCTO DESDE EL DETALLE
  test('Ejercicio 49 - Agregar producto y validar botón Remove', async ({ page }) => {
   // Abrir el detalle del producto Sauce Labs Backpack
  const imagenProducto = page.getByAltText('Sauce Labs Backpack');

  await expect(imagenProducto).toBeVisible();

  await imagenProducto.click();

  // Validar navegación al detalle
  await expect(page).toHaveURL(/inventory-item.html/);

  // Seleccionar específicamente el DIV del detalle
  const detalleProducto = page.locator('div.inventory_details');

  await expect(detalleProducto).toBeVisible();

  // Buscar Add to cart dentro del detalle
  const agregarProducto = detalleProducto.getByRole('button', {
    name: 'Add to cart',
    exact: true
  });

  await expect(agregarProducto).toBeVisible();

  // Agregar el producto
  await agregarProducto.click();

  // Confirmar que el botón cambió a Remove
  const removerProducto = detalleProducto.getByRole('button', {
    name: 'Remove',
    exact: true
  });

  await expect(removerProducto).toBeVisible();

  // Confirmar que el carrito contiene un producto
  await expect(
    page.locator('.shopping_cart_badge')
  ).toHaveText('1');

  });

  // EJERCICIO 50 - ORDENAMIENTO Z-A
  test('Ejercicio 50 - Validar ordenamiento de productos Z-A', async ({ page }) => {

    // Seleccionar orden descendente por nombre
    await page.getByRole('combobox').selectOption('za');

    // Obtener el primer producto de la lista
    const primerProducto = page.locator('.inventory_item').first();

    // Validar que sea el producto esperado
    await expect(
      primerProducto.locator('.inventory_item_name')
    ).toHaveText('Test.allTheThings() T-Shirt (Red)');

  });

  // EJERCICIO 51 - ORDENAMIENTO PRECIO LOW TO HIGH
  test('Ejercicio 51 - Validar ordenamiento de precio ascendente', async ({ page }) => {

    // Seleccionar precio de menor a mayor
    await page.getByRole('combobox').selectOption('lohi');

    // Encadenar locators para obtener el precio del primer producto
    const primerPrecio = page
      .locator('.inventory_item')
      .first()
      .locator('.inventory_item_price');

    // Validar precio más bajo
    await expect(primerPrecio).toHaveText('$7.99');

  });

  // EJERCICIO 52 - ORDENAMIENTO PRECIO HIGH TO LOW
  test('Ejercicio 52 - Validar ordenamiento de precio descendente', async ({ page }) => {

    // Seleccionar precio de mayor a menor
    await page.getByRole('combobox').selectOption('hilo');

    // Obtener el precio del primer producto
    const primerPrecio = page
      .locator('.inventory_item')
      .first()
      .locator('.inventory_item_price');

    // Validar precio más alto
    await expect(primerPrecio).toHaveText('$49.99');

  });

});
// FLUJOS COMPLETOS INTEGRALES

// =====================================================
// NIVEL AVANZADO - FLUJOS E2E DE COMPRA
// EJERCICIOS 53 AL 57
// =====================================================

test.describe('SauceDemo - Nivel Avanzado - Compras E2E', () => {

  // PRECONDICIONES
  // Cada test comienza con una sesión nueva.
  test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await expect(page).toHaveURL('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.inventory_item')).toHaveCount(6);

  });


  // =====================================================
  // EJERCICIO 53 - E2E COMPRA SIMPLE DE 1 PRODUCTO
  // =====================================================

  test('Ejercicio 53 - Compra completa de un producto', async ({ page }) => {

    // PANTALLA 1: Login
    // Ya fue validada en el beforeEach.

    // PANTALLA 2: Inventario
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('1');

    // PANTALLA 3: Carrito
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL(/cart.html/);

    await expect(
      page.locator('.cart_item')
    ).toHaveCount(1);

    await page.getByRole('button', { name: 'Checkout' }).click();

    // PANTALLA 4: Checkout Step One
    await expect(page).toHaveURL(/checkout-step-one.html/);

    await page.getByPlaceholder('First Name').fill('Vanesa');
    await page.getByPlaceholder('Last Name').fill('Test');
    await page.getByPlaceholder('Zip/Postal Code').fill('5000');

    await page.getByRole('button', { name: 'Continue' }).click();

    // PANTALLA 5: Checkout Step Two
    await expect(page).toHaveURL(/checkout-step-two.html/);

    await expect(
      page.locator('.cart_item')
    ).toHaveCount(1);

    await page.getByRole('button', { name: 'Finish' }).click();

    // PANTALLA 6: Compra finalizada
    await expect(page).toHaveURL(/checkout-complete.html/);

    await expect(
      page.getByRole('heading', { name: 'Thank you for your order!' })
    ).toBeVisible();

  });


  // =====================================================
  // EJERCICIO 54 - E2E COMPRA MÚLTIPLE
  // =====================================================

  test('Ejercicio 54 - Compra completa de tres productos', async ({ page }) => {

    const nombresProductos = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Fleece Jacket'
    ];

    // Agregar productos específicos usando filter()
    for (const nombre of nombresProductos) {

      const producto = page.locator('.inventory_item')
        .filter({ hasText: nombre });

      await producto.getByRole('button', { name: 'Add to cart' }).click();

    }

    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('3');

    // Ir al carrito
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL(/cart.html/);

    await expect(
      page.locator('.cart_item')
    ).toHaveCount(3);

    // Validar nombres de los tres productos
    for (const nombre of nombresProductos) {

      const productoCarrito = page.locator('.cart_item')
        .filter({ hasText: nombre });

      await expect(productoCarrito).toHaveCount(1);

    }

    // Checkout Step One
    await page.getByRole('button', { name: 'Checkout' }).click();

    await expect(page).toHaveURL(/checkout-step-one.html/);

    await page.getByPlaceholder('First Name').fill('Vanesa');
    await page.getByPlaceholder('Last Name').fill('Test');
    await page.getByPlaceholder('Zip/Postal Code').fill('5000');

    await page.getByRole('button', { name: 'Continue' }).click();

    // Checkout Step Two
    await expect(page).toHaveURL(/checkout-step-two.html/);

    await expect(
      page.locator('.cart_item')
    ).toHaveCount(3);

    await page.getByRole('button', { name: 'Finish' }).click();

    // Confirmación
    await expect(page).toHaveURL(/checkout-complete.html/);

    await expect(
      page.getByRole('heading', { name: 'Thank you for your order!' })
    ).toBeVisible();

  });


  // =====================================================
  // EJERCICIO 55 - MODIFICACIÓN DEL CARRITO
  // =====================================================

  test('Ejercicio 55 - Eliminar un producto y comprar uno', async ({ page }) => {
 // PASO 1: Agregar dos productos
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  await expect(
    page.locator('.shopping_cart_badge')
  ).toHaveText('2');

  // PASO 2: Navegar al carrito
  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(page).toHaveURL(/cart.html/);

  await expect(page.locator('.cart_item')).toHaveCount(2);

  // PASO 3: Eliminar Bike Light usando filter()
  const productoEliminar = page.locator('.cart_item')
    .filter({ hasText: 'Sauce Labs Bike Light' });

  await productoEliminar.getByRole('button', {
    name: 'Remove'
  }).click();

  // PASO 4: Validar que solamente queda Backpack
  await expect(page.locator('.cart_item')).toHaveCount(1);

  await expect(
    page.locator('.cart_item .inventory_item_name')
  ).toHaveText('Sauce Labs Backpack');

  await expect(
    page.locator('.shopping_cart_badge')
  ).toHaveText('1');

  // PASO 5: Iniciar checkout
  await page.getByRole('button', { name: 'Checkout' }).click();

  await expect(page).toHaveURL(/checkout-step-one.html/);

  // Completar información
  await page.getByPlaceholder('First Name').fill('Vanesa');
  await page.getByPlaceholder('Last Name').fill('Test');
  await page.getByPlaceholder('Zip/Postal Code').fill('5000');

  await page.getByRole('button', { name: 'Continue' }).click();

  // PASO 6: Validar resumen de compra
  await expect(page).toHaveURL(/checkout-step-two.html/);

  await expect(page.locator('.cart_item')).toHaveCount(1);

  await expect(
    page.locator('.cart_item .inventory_item_name')
  ).toHaveText('Sauce Labs Backpack');

  // PASO 7: Finalizar compra
  await page.getByRole('button', { name: 'Finish' }).click();

  await expect(page).toHaveURL(/checkout-complete.html/);

  await expect(
    page.getByRole('heading', {
      name: 'Thank you for your order!'
    })
  ).toBeVisible();

    
  });


  // =====================================================
  // EJERCICIO 56 - ERROR Y RECUPERACIÓN DE CHECKOUT
  // =====================================================

  test('Ejercicio 56 - Error por Zip vacío y compra exitosa', async ({ page }) => {

    // Agregar un producto
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL(/cart.html/);

    await page.getByRole('button', { name: 'Checkout' }).click();

    await expect(page).toHaveURL(/checkout-step-one.html/);

    // Completar solamente nombre y apellido
    await page.getByPlaceholder('First Name').fill('Vanesa');
    await page.getByPlaceholder('Last Name').fill('Test');

    // Dejar Zip vacío
    await page.getByPlaceholder('Zip/Postal Code').fill('');

    await page.getByRole('button', { name: 'Continue' }).click();

    // Validar mensaje de error específico
    await expect(
      page.locator('[data-test="error"]')
    ).toHaveText('Error: Postal Code is required');

    // Validar que seguimos en Step One
    await expect(page).toHaveURL(/checkout-step-one.html/);

    // Corregir el campo faltante
    await page.getByPlaceholder('Zip/Postal Code').fill('5000');

    await page.getByRole('button', { name: 'Continue' }).click();

    // Confirmar recuperación del flujo
    await expect(page).toHaveURL(/checkout-step-two.html/);

    await expect(page.locator('.cart_item')).toHaveCount(1);

    await page.getByRole('button', { name: 'Finish' }).click();

    // Compra finalizada
    await expect(page).toHaveURL(/checkout-complete.html/);

    await expect(
      page.getByRole('heading', { name: 'Thank you for your order!' })
    ).toBeVisible();

  });


  // =====================================================
  // EJERCICIO 57 - CANCELACIÓN EN CHECKOUT STEP TWO
  // =====================================================

  test('Ejercicio 57 - Cancelar compra desde Checkout Step Two', async ({ page }) => {

    // Agregar producto
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Ir al carrito
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL(/cart.html/);

    // Iniciar checkout
    await page.getByRole('button', { name: 'Checkout' }).click();

    await expect(page).toHaveURL(/checkout-step-one.html/);

    await page.getByPlaceholder('First Name').fill('Vanesa');
    await page.getByPlaceholder('Last Name').fill('Test');
    await page.getByPlaceholder('Zip/Postal Code').fill('5000');

    await page.getByRole('button', { name: 'Continue' }).click();

    // Validar llegada a Checkout Step Two
    await expect(page).toHaveURL(/checkout-step-two.html/);

    // Cancelar compra
    await page.getByRole('button', { name: 'Cancel' }).click();

    // Validar regreso al inventario
    await expect(page).toHaveURL(/inventory.html/);

    await expect(
      page.locator('.inventory_item')
    ).toHaveCount(6);

  });


});

//FLUJOS COMPLETOS INTEGRALES

// =====================================================
// NIVEL AVANZADO - E2E NAVEGACIÓN Y RETO INTEGRADOR
// EJERCICIOS 58 AL 60
// =====================================================

test.describe('SauceDemo - Nivel Avanzado - E2E Final', () => {

  // PRECONDICIONES: iniciar sesión antes de cada test
  test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory.html/);

    // Esperar a que carguen los seis productos
    await expect(page.locator('.inventory_item')).toHaveCount(6);

  });


  // =====================================================
  // EJERCICIO 58 - E2E NAVEGACIÓN INVERSA
  // =====================================================

  test('Ejercicio 58 - Cancelar checkout y continuar comprando', async ({ page }) => {

    // PASO 1: Agregar un producto
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('1');

    // PASO 2: Ir al carrito
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL(/cart.html/);

    // PASO 3: Iniciar checkout
    await page.getByRole('button', { name: 'Checkout' }).click();

    await expect(page).toHaveURL(/checkout-step-one.html/);

    // PASO 4: Cancelar desde Checkout Step One
    await page.getByRole('button', { name: 'Cancel' }).click();

    // Validar regreso al carrito
    await expect(page).toHaveURL(/cart.html/);

    await expect(
      page.locator('.cart_item')
    ).toHaveCount(1);

    // PASO 5: Continuar comprando
    await page.getByRole('button', { name: 'Continue Shopping' }).click();

    // Validar regreso al inventario
    await expect(page).toHaveURL(/inventory.html/);

    await expect(
      page.locator('.inventory_item')
    ).toHaveCount(6);

  });


  // =====================================================
  // EJERCICIO 59 - VERIFICACIÓN DE PAGO Y ENVÍO
  // =====================================================

  test('Ejercicio 59 - Validar información de pago y envío', async ({ page }) => {

    // PASO 1: Agregar un producto
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // PASO 2: Ir al carrito
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL(/cart.html/);

    // PASO 3: Iniciar checkout
    await page.getByRole('button', { name: 'Checkout' }).click();

    await expect(page).toHaveURL(/checkout-step-one.html/);

    // PASO 4: Completar datos personales
    await page.getByPlaceholder('First Name').fill('Vanesa');
    await page.getByPlaceholder('Last Name').fill('Test');
    await page.getByPlaceholder('Zip/Postal Code').fill('5000');

    await page.getByRole('button', { name: 'Continue' }).click();

    // PASO 5: Validar Checkout Step Two
    await expect(page).toHaveURL(/checkout-step-two.html/);

    // Validar información de pago
    const informacionPago = page.locator('.summary_value_label').nth(0);

    await expect(informacionPago).toContainText('SauceCard');

    // Validar información de envío
    const informacionEnvio = page.locator('.summary_value_label').nth(1);

    await expect(informacionEnvio).toContainText(
      'Free Pony Express Delivery!'
    );

  });


  // =====================================================
  // EJERCICIO 60 - MÁXIMO RETO INTEGRADOR
  // =====================================================

  test('Ejercicio 60 - Compra integradora con ordenamiento y carrito', async ({ page }) => {

    // PASO 1: Login válido
    // Ya realizado en el beforeEach.

    // PASO 2: Ordenar productos por precio de menor a mayor
    await page.getByRole('combobox').selectOption('lohi');

    const productos = page.locator('.inventory_item');

    await expect(productos).toHaveCount(6);

    // PASO 3: Identificar el producto más barato
    const productoMasBarato = productos.first();

    const nombreMasBarato = await productoMasBarato
      .locator('.inventory_item_name')
      .innerText();

    await expect(
      productoMasBarato.locator('.inventory_item_price')
    ).toHaveText('$7.99');

    // Agregar el producto más barato
    await productoMasBarato
      .getByRole('button', { name: 'Add to cart' })
      .click();

    // PASO 4: Identificar el producto más caro
    const productoMasCaro = productos.last();

    const nombreMasCaro = await productoMasCaro
      .locator('.inventory_item_name')
      .innerText();

    await expect(
      productoMasCaro.locator('.inventory_item_price')
    ).toHaveText('$49.99');

    // Agregar el producto más caro
    await productoMasCaro
      .getByRole('button', { name: 'Add to cart' })
      .click();

    // Validar dos productos agregados
    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('2');

    // PASO 5: Ir al carrito
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL(/cart.html/);

    await expect(page.locator('.cart_item')).toHaveCount(2);

    // PASO 6: Eliminar el producto más barato usando filter()
    const productoEliminar = page.locator('.cart_item')
      .filter({ hasText: nombreMasBarato });

    await productoEliminar
      .getByRole('button', { name: 'Remove' })
      .click();

    // Validar que queda solamente un producto
    await expect(page.locator('.cart_item')).toHaveCount(1);

    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('1');

    // Confirmar que el producto restante es el más caro
    await expect(
      page.locator('.cart_item .inventory_item_name')
    ).toHaveText(nombreMasCaro);

    // PASO 7: Iniciar checkout
    await page.getByRole('button', { name: 'Checkout' }).click();

    await expect(page).toHaveURL(/checkout-step-one.html/);

    // PASO 8: Completar formulario
    await page.getByPlaceholder('First Name').fill('Vanesa');
    await page.getByPlaceholder('Last Name').fill('Test');
    await page.getByPlaceholder('Zip/Postal Code').fill('5000');

    await page.getByRole('button', { name: 'Continue' }).click();

    // PASO 9: Validar resumen de compra
    await expect(page).toHaveURL(/checkout-step-two.html/);

    await expect(page.locator('.cart_item')).toHaveCount(1);

    await expect(
      page.locator('.cart_item .inventory_item_name')
    ).toHaveText(nombreMasCaro);

    await expect(
      page.locator('.cart_item .inventory_item_price')
    ).toHaveText('$49.99');

    // PASO 10: Finalizar compra
    await page.getByRole('button', { name: 'Finish' }).click();

    await expect(page).toHaveURL(/checkout-complete.html/);

    await expect(
      page.getByRole('heading', {
        name: 'Thank you for your order!'
      })
    ).toBeVisible();

    // PASO 11: Regresar a la pantalla principal
    await page.getByRole('button', { name: 'Back Home' }).click();

    await expect(page).toHaveURL(/inventory.html/);

    // PASO 12: Validar carrito limpio
    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveCount(0);

    console.log('Producto más barato:', nombreMasBarato);
    console.log('Producto más caro comprado:', nombreMasCaro);
    console.log('Compra integradora finalizada correctamente');

  });

});


});
