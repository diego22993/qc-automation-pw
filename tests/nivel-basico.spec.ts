
import { test, expect } from '@playwright/test';

test.describe('SauceDemo - Ejercicios de Locators', () => {

  // Antes de cada test, navegamos a SauceDemo
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  // EJERCICIO 1: getByPlaceholder - Usuario
  test('Ejercicio 1 - Completar username por placeholder', async ({ page }) => {

    await page.getByPlaceholder('Username').fill('standard_user');

    // Validamos que el campo contenga el usuario correcto
    await expect(
      page.getByPlaceholder('Username')
    ).toHaveValue('standard_user');

  });

  // EJERCICIO 2: getByPlaceholder - Password
  test('Ejercicio 2 - Completar password por placeholder', async ({ page }) => {

    await page.getByPlaceholder('Password').fill('secret_sauce');

    // Validamos que el campo contenga la contraseña
    await expect(
      page.getByPlaceholder('Password')
    ).toHaveValue('secret_sauce');

  });

  // EJERCICIO 3: getByRole - Login
  test('Ejercicio 3 - Login usando getByRole', async ({ page }) => {

    // Completamos las credenciales
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    // Hacemos clic en Login usando getByRole
    await page.getByRole('button', { name: 'Login' }).click();

    // Validamos que ingresamos correctamente
    await expect(page).toHaveURL(/inventory.html/);

    await expect(
      page.locator('[data-test="title"]')
    ).toHaveText('Products');

  });

  // EJERCICIO 4: getByText - Login sin credenciales
  test('Ejercicio 4 - Validar error sin credenciales', async ({ page }) => {

    // Intentamos ingresar sin completar los campos
    await page.getByRole('button', { name: 'Login' }).click();

    // Validamos el mensaje de error
    await expect(
      page.getByText('Epic sadface: Username is required')
    ).toBeVisible();

    // Validamos que permanecemos en la pantalla de login
    await expect(page).toHaveURL('https://www.saucedemo.com/');

  });

  // EJERCICIO 5: CSS Selector ID - Usuario
  test('Ejercicio 5 - Completar username usando ID', async ({ page }) => {

    // # identifica un elemento por su ID
    await page.locator('#user-name').fill('standard_user');

    // Validamos el valor ingresado
    await expect(
      page.locator('#user-name')
    ).toHaveValue('standard_user');

  });

  // EJERCICIO 6: CSS Selector ID - Password y Login
  test('Ejercicio 6 - Login utilizando selectores ID', async ({ page }) => {

    // Completamos usuario
    await page.locator('#user-name').fill('standard_user');

    // Completamos contraseña por ID
    await page.locator('#password').fill('secret_sauce');

    // Presionamos Login por ID
    await page.locator('#login-button').click();

    // Validamos que el login fue exitoso
    await expect(page).toHaveURL(/inventory.html/);

    await expect(
      page.locator('[data-test="title"]')
    ).toHaveText('Products');

  });

//INVENTARIO.HTML
test.describe('SauceDemo - Ejercicios 7 al 12', () => {

  // Antes de cada test iniciamos sesión
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory.html/);
  });

  // EJERCICIO 7: getByRole - Heading
  test('Ejercicio 7 - Verificar encabezado Swag Labs', async ({ page }) => {

   await expect(
    page.locator('.app_logo')
  ).toBeVisible();

  await expect(
    page.locator('.app_logo')
  ).toHaveText('Swag Labs');

  });

  // EJERCICIO 8: getByText
  test('Ejercicio 8 - Encontrar Sauce Labs Backpack', async ({ page }) => {

    await expect(
      page.getByText('Sauce Labs Backpack')
    ).toBeVisible();

  });

  // EJERCICIO 9: getByAltText
  test('Ejercicio 9 - Encontrar imagen Bolt T-Shirt', async ({ page }) => {

    await expect(
      page.getByAltText('Sauce Labs Bolt T-Shirt')
    ).toBeVisible();

  });

  // EJERCICIO 10: first()
  test('Ejercicio 10 - Agregar primer producto al carrito', async ({ page }) => {

    const botonesAgregar = page.getByRole('button', {
      name: 'Add to cart'
    });

    await botonesAgregar.first().click();

    await expect(
      page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText('1');

  });

  // EJERCICIO 11: last()
  test('Ejercicio 11 - Agregar último producto al carrito', async ({ page }) => {

    const botonesAgregar = page.getByRole('button', {
      name: 'Add to cart'
    });

    await botonesAgregar.last().click();

    await expect(
      page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText('1');

  });

  // EJERCICIO 12: nth()
  test('Ejercicio 12 - Seleccionar segundo producto', async ({ page }) => {

  const productos = page.locator('.inventory_item');

  // Verificamos el nombre del segundo producto
  await expect(
    productos.nth(1).locator('[data-test="inventory-item-name"]')
  ).toHaveText('Sauce Labs Bike Light');

  // Hacemos clic en la imagen del segundo producto
  await productos.nth(1).locator('img').click();

  // Verificamos que se abra el detalle del producto
  await expect(page).toHaveURL(/inventory-item.html/);

  await expect(
    page.locator('[data-test="inventory-item-name"]')
  ).toHaveText('Sauce Labs Bike Light');

  });

  //CART.HTML
 test.describe('SauceDemo - Ejercicios 13 al 15 - Carrito', () => {

  // Antes de cada test, iniciamos sesión y abrimos el carrito
  test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    // Navegamos al carrito
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Validamos que estamos en la página correcta
    await expect(page).toHaveURL(/cart.html/);

  });

  // EJERCICIO 13: getByText - QTY
  test('Ejercicio 13 - Verificar columna QTY', async ({ page }) => {

    await expect(
      page.getByText('QTY', { exact: true })
    ).toBeVisible();

  });

  // EJERCICIO 14: getByText - Description
  test('Ejercicio 14 - Verificar columna Description', async ({ page }) => {

    await expect(
      page.getByText('Description', { exact: true })
    ).toBeVisible();

  });

  // EJERCICIO 15: getByRole - Continue Shopping
  test('Ejercicio 15 - Ubicar botón Continue Shopping', async ({ page }) => {

    const continueShopping = page.getByRole('button', {
      name: 'Continue Shopping'
    });

    // Validamos que el botón esté visible
    await expect(continueShopping).toBeVisible();

    // Hacemos clic
    await continueShopping.click();

    // Validamos que regrese al catálogo
    await expect(page).toHaveURL(/inventory.html/);

  });

});

//CHECKOUT-STEP-ONE.HTML
test.describe('SauceDemo - Ejercicios 16 al 18 - Checkout', () => {

  // Antes de cada test, iniciamos sesión y llegamos al checkout
  test.beforeEach(async ({ page }) => {

    // 1. Navegar a SauceDemo
    await page.goto('https://www.saucedemo.com/');

    // 2. Login
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // 3. Agregar un producto al carrito
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 4. Ir al carrito
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 5. Iniciar checkout
    await page.locator('[data-test="checkout"]').click();

    // 6. Validar que estamos en el formulario
    await expect(page).toHaveURL(/checkout-step-one.html/);

  });

  // EJERCICIO 16: First Name
  test('Ejercicio 16 - Completar First Name', async ({ page }) => {

    await page.getByPlaceholder('First Name').fill('Juan');

    await expect(
      page.getByPlaceholder('First Name')
    ).toHaveValue('Juan');

  });

  // EJERCICIO 17: Last Name
  test('Ejercicio 17 - Completar Last Name', async ({ page }) => {

    await page.getByPlaceholder('Last Name').fill('Pérez');

    await expect(
      page.getByPlaceholder('Last Name')
    ).toHaveValue('Pérez');

  });

  // EJERCICIO 18: Zip/Postal Code
  test('Ejercicio 18 - Completar Zip/Postal Code', async ({ page }) => {

    await page.getByPlaceholder('Zip/Postal Code').fill('5000');

    await expect(
      page.getByPlaceholder('Zip/Postal Code')
    ).toHaveValue('5000');

  });

});




});

//CHECKOUT-STEP-TWO.HTML
test.describe('SauceDemo - Ejercicios 19 y 20 - Checkout', () => {

  // Antes de cada test llegamos al resumen de compra
  test.beforeEach(async ({ page }) => {

    // 1. Navegar a SauceDemo
    await page.goto('https://www.saucedemo.com/');

    // 2. Iniciar sesión
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // 3. Agregar un producto al carrito
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 4. Ir al carrito
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 5. Iniciar checkout
    await page.locator('[data-test="checkout"]').click();

    // 6. Completar formulario
    await page.getByPlaceholder('First Name').fill('Juan');
    await page.getByPlaceholder('Last Name').fill('Pérez');
    await page.getByPlaceholder('Zip/Postal Code').fill('5000');

    // 7. Continuar al resumen
    await page.locator('[data-test="continue"]').click();

    // 8. Validar página de resumen
    await expect(page).toHaveURL(/checkout-step-two.html/);

  });

  // EJERCICIO 19: getByText
  test('Ejercicio 19 - Verificar Payment Information', async ({ page }) => {

    await expect(
      page.getByText('Payment Information:', { exact: true })
    ).toBeVisible();

  });

  // EJERCICIO 20: getByRole - Heading
  test('Ejercicio 20 - Verificar agradecimiento de compra', async ({ page }) => {

    // Finalizar la compra
    await page.locator('[data-test="finish"]').click();

    // Validar página de confirmación
    await expect(page).toHaveURL(/checkout-complete.html/);

    // Validar el título como heading
    await expect(
      page.getByRole('heading', {
        name: 'Thank you for your order!'
      })
    ).toBeVisible();

  });

});


});
