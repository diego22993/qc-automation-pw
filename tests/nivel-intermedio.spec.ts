import { test, expect } from '@playwright/test';

//LOGIN E INVENTARIO

test.describe('SauceDemo - Nivel Intermedio', () => {

  // Antes de cada test abrimos SauceDemo
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  // EJERCICIO 21 - CSS Atributo Personalizado
  test('Ejercicio 21 - Seleccionar botón Login por data-test', async ({ page }) => {

    const loginButton = page.locator('[data-test="login-button"]');

    // Validar que el botón esté visible
    await expect(loginButton).toBeVisible();

    // Completar credenciales
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // Hacer clic en Login
    await loginButton.click();

    // Validar login exitoso
    await expect(page).toHaveURL(/inventory.html/);

  });

  // EJERCICIO 22 - Combobox Price Low to High
  test('Ejercicio 22 - Ordenar productos por menor precio', async ({ page }) => {

    await login(page);

    const ordenamiento = page.getByRole('combobox');

    await ordenamiento.selectOption({ label: 'Price (low to high)' });

    // Validar el valor seleccionado
    await expect(ordenamiento).toHaveValue('lohi');

  });

  // EJERCICIO 23 - Combobox Name Z to A
  test('Ejercicio 23 - Ordenar productos por nombre Z a A', async ({ page }) => {

    await login(page);

    const ordenamiento = page.getByRole('combobox');

    await ordenamiento.selectOption({ label: 'Name (Z to A)' });

    // Validar valor seleccionado
    await expect(ordenamiento).toHaveValue('za');

  });

  // EJERCICIO 24 - filter() por texto
  test('Ejercicio 24 - Filtrar producto Sauce Labs Onesie', async ({ page }) => {

    await login(page);

    const producto = page.locator('.inventory_item')
      .filter({ hasText: 'Sauce Labs Onesie' });

    // Validar que encontramos una única tarjeta
    await expect(producto).toHaveCount(1);

    // Validar que esté visible
    await expect(producto).toBeVisible();

  });

  // EJERCICIO 25 - filter() + Acción
  test('Ejercicio 25 - Agregar Sauce Labs Bike Light al carrito', async ({ page }) => {

    await login(page);

    const producto = page.locator('.inventory_item')
      .filter({ hasText: 'Sauce Labs Bike Light' });

    // Buscar botón dentro de la tarjeta
    await producto.getByRole('button', { name: 'Add to cart' }).click();

    // Validar carrito
    await expect(
      page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText('1');

  });

  // EJERCICIO 26 - Chaining en inventario
  test('Ejercicio 26 - Encontrar todos los precios', async ({ page }) => {

    await login(page);

    const precios = page.locator('#inventory_container')
      .locator('.inventory_item_price');

    // SauceDemo normalmente tiene 6 productos
    await expect(precios).toHaveCount(6);

  });

  // EJERCICIO 27 - filter() + Chaining
  test('Ejercicio 27 - Validar precio Fleece Jacket', async ({ page }) => {

    await login(page);

    const producto = page.locator('.inventory_item')
      .filter({ hasText: 'Sauce Labs Fleece Jacket' });

    const precio = producto.locator('.inventory_item_price');

    await expect(precio).toHaveText('$49.99');

  });

  //CARRITO Y NAVEGACION

test.describe('SauceDemo - Nivel Intermedio - Carrito', () => {

  // Antes de cada test iniciamos sesión y agregamos dos productos
  test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    // Login
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory.html/);

    // Agregar dos productos al carrito
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  });

  // EJERCICIO 28 - Badge de carrito
  test('Ejercicio 28 - Validar badge con dos productos', async ({ page }) => {

    // Localizar contenedor del carrito
    const carrito = page.locator('.shopping_cart_container');

    // Buscar badge dentro del contenedor
    const badge = carrito.locator('.shopping_cart_badge');

    // Validar que muestre 2
    await expect(badge).toHaveText('2');

  });

  // EJERCICIO 29 - filter() en carrito
  test('Ejercicio 29 - Remover Sauce Labs Backpack', async ({ page }) => {

    // Navegar al carrito
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL(/cart.html/);

    // Filtrar producto Backpack
    const producto = page.locator('.cart_item')
      .filter({ hasText: 'Sauce Labs Backpack' });

    // Validar que encontramos el producto
    await expect(producto).toHaveCount(1);

    // Remover producto
    await producto.getByRole('button', { name: 'Remove' }).click();

    // Validar que Backpack ya no esté en el carrito
    await expect(producto).toHaveCount(0);

    // Validar que queda un producto
    await expect(page.locator('.cart_item')).toHaveCount(1);

  });

  // EJERCICIO 30 - Lista vacía
  test('Ejercicio 30 - Remover todos los productos', async ({ page }) => {

    // Navegar al carrito
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL(/cart.html/);

    // Buscar todos los botones Remove
    const botonesRemove = page.getByRole('button', { name: 'Remove' });

    // Remover todos los productos
    while (await botonesRemove.count() > 0) {
      await botonesRemove.first().click();
    }

    // Validar que no quedan productos
    await expect(page.locator('.cart_item')).toHaveCount(0);

    // Validar que el badge desapareció
    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveCount(0);

  });

  // EJERCICIO 31 - getByRole Navegación
  test('Ejercicio 31 - Navegar a Checkout', async ({ page }) => {

    // Navegar al carrito
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL(/cart.html/);

    // Buscar botón Checkout por rol y nombre
    await page.getByRole('button', { name: 'Checkout' }).click();

    // Validar navegación
    await expect(page).toHaveURL(/checkout-step-one.html/);

  });

});

//FORMULARIO CHECKOUT-STEP-ONE

test.describe('SauceDemo - Nivel Intermedio - Checkout Form', () => {

  // Antes de cada test navegamos al formulario de Checkout
  test.beforeEach(async ({ page }) => {

    // 1. Navegar a SauceDemo
    await page.goto('https://www.saucedemo.com/');

    // 2. Iniciar sesión
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    // 3. Validar login exitoso
    await expect(page).toHaveURL(/inventory.html/);

    // 4. Agregar un producto al carrito
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 5. Navegar al carrito
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL(/cart.html/);

    // 6. Iniciar Checkout
    await page.getByRole('button', { name: 'Checkout' }).click();

    // 7. Validar formulario
    await expect(page).toHaveURL(/checkout-step-one.html/);

  });

  // EJERCICIO 32 - Validación de error
  test('Ejercicio 32 - Validar error First Name obligatorio', async ({ page }) => {

    // Intentamos continuar sin completar los campos
    await page.getByRole('button', { name: 'Continue' }).click();

    // Validamos el mensaje de error
    await expect(
      page.getByText('Error: First Name is required')
    ).toBeVisible();

    // Validamos que seguimos en el formulario
    await expect(page).toHaveURL(/checkout-step-one.html/);

  });

  // EJERCICIO 33 - Completar formulario
  test('Ejercicio 33 - Completar datos usando placeholders', async ({ page }) => {

    // Completar First Name
    await page.getByPlaceholder('First Name').fill('Juan');

    // Completar Last Name
    await page.getByPlaceholder('Last Name').fill('Pérez');

    // Completar Zip/Postal Code
    await page.getByPlaceholder('Zip/Postal Code').fill('5000');

    // Validar valores ingresados
    await expect(
      page.getByPlaceholder('First Name')
    ).toHaveValue('Juan');

    await expect(
      page.getByPlaceholder('Last Name')
    ).toHaveValue('Pérez');

    await expect(
      page.getByPlaceholder('Zip/Postal Code')
    ).toHaveValue('5000');

  });

  // EJERCICIO 34 - Cancelar Checkout
  test('Ejercicio 34 - Cancelar y volver al carrito', async ({ page }) => {

    // Buscar botón Cancel por rol
    await page.getByRole('button', { name: 'Cancel' }).click();

    // Validar que volvimos al carrito
    await expect(page).toHaveURL(/cart.html/);

    // Validar que el producto sigue en el carrito
    await expect(
      page.getByText('Sauce Labs Backpack')
    ).toBeVisible();

  });

});

//FORMULARIO CHECKOUT-STEP-TWO & COMPLETE

test.describe('SauceDemo - Nivel Intermedio - Resumen y Confirmación', () => {

  // Antes de cada test llegamos al resumen de compra
  test.beforeEach(async ({ page }) => {

    // 1. Navegar a SauceDemo
    await page.goto('https://www.saucedemo.com/');

    // 2. Iniciar sesión
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory.html/);

    // 3. Agregar producto al carrito
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 4. Navegar al carrito
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 5. Iniciar Checkout
    await page.getByRole('button', { name: 'Checkout' }).click();

    // 6. Completar datos personales
    await page.getByPlaceholder('First Name').fill('Juan');
    await page.getByPlaceholder('Last Name').fill('Pérez');
    await page.getByPlaceholder('Zip/Postal Code').fill('5000');

    // 7. Continuar al resumen
    await page.getByRole('button', { name: 'Continue' }).click();

    // 8. Validar pantalla de resumen
    await expect(page).toHaveURL(/checkout-step-two.html/);

  });

  // EJERCICIO 35 - Item Total
  test('Ejercicio 35 - Validar Item total', async ({ page }) => {

    const subtotal = page.locator('.summary_subtotal_label');

    await expect(subtotal).toBeVisible();

    await expect(subtotal).toContainText('Item total:');

  });

  // EJERCICIO 36 - Impuestos
  test('Ejercicio 36 - Validar impuestos', async ({ page }) => {

    const impuestos = page.locator('.summary_tax_label');

    await expect(impuestos).toBeVisible();

    await expect(impuestos).toContainText('Tax:');

  });

  // EJERCICIO 37 - Total Final
  test('Ejercicio 37 - Validar total final', async ({ page }) => {

    const total = page.locator('.summary_total_label');

    await expect(total).toBeVisible();

    await expect(total).toContainText('Total:');

  });

  // EJERCICIO 38 - Finalizar compra
  test('Ejercicio 38 - Presionar Finish', async ({ page }) => {

    await page.getByRole('button', { name: 'Finish' }).click();

    await expect(page).toHaveURL(/checkout-complete.html/);

  });

  // EJERCICIO 39 - Texto de confirmación
  test('Ejercicio 39 - Validar mensaje de envío', async ({ page }) => {

    // Finalizar compra
    await page.getByRole('button', { name: 'Finish' }).click();

    // Validar pantalla de confirmación
    await expect(page).toHaveURL(/checkout-complete.html/);

    // Validar texto descriptivo
    await expect(
      page.getByText('Your order has been dispatched', {
        exact: false
      })
    ).toBeVisible();

  });

  // EJERCICIO 40 - Back Home
  test('Ejercicio 40 - Regresar al catálogo', async ({ page }) => {

    // Finalizar compra
    await page.getByRole('button', { name: 'Finish' }).click();

    await expect(page).toHaveURL(/checkout-complete.html/);

    // Presionar Back Home
    await page.getByRole('button', { name: 'Back Home' }).click();

    // Validar regreso al inventario
    await expect(page).toHaveURL(/inventory.html/);

    // Validar que el catálogo está visible
    await expect(
      page.locator('[data-test="title"]')
    ).toHaveText('Products');

  });

});



});

// Función reutilizable para iniciar sesión
async function login(page) {

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');

  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory.html/);

}
