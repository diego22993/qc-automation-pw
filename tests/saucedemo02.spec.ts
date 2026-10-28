import { test, expect } from '@playwright/test';

test.describe('ejercicios clase 3 - del 1 al 20', () => {

  test('ejercicio 1 - 2 - 3', async ({ page }) => {

    // login
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // Ejercicio 1. (getByPlaceholder): Completa el campo de usuario escribiendo standard_user identificándolo por su placeholder.
    await page.getByPlaceholder('username').fill('standard_user');

    // Ejercicio 2. (getByPlaceholder): Completa el campo de contraseña escribiendo secret_sauce identificándolo por su placeholder.
    await page.getByPlaceholder('password').fill('secret_sauce');

    // Ejercicio 3. (getByRole): Haz clic en el botón de login usando getByRole('button', { name: 'Login' }).
    await page.getByRole('button', { name: 'login' }).click();


});
  
  test('ejercicio 4 - 5 - 6', async ({ page }) => {

     // login
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // Ejercicio 4. (getByText): Intenta ingresar sin credenciales y valida que se muestre el texto de error "Epic sadface: Username is required".
    await page.getByText('Login').click();
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
    
    // Ejercicio 5. (CSS Selector ID): Completa el campo de usuario utilizando su ID directo (#user-name).
    await page.locator('#user-name').fill('standard_user');

    // Ejercicio 6. (CSS Selector ID): Completa el campo de contraseña usando su ID #password y presiona el botón #login-button.
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    });
  
  test('ejercicio 7 - 8 - 9 - 10 - 11 - 12 - 13 - 14 - 15 - 16 - 17 - 18 - 19 - 20', async ({ page }) => {

     // login
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Ejercicio 8 (getByText): Encuentra en el catálogo el producto "Sauce Labs Backpack" usando getByText.
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    // Ejercicio 9 (getByAltText): Ubica la imagen principal de la camiseta usando getByAltText('Sauce Labs Bolt T-Shirt’).
    await expect(page.getByAltText('Sauce Labs Bolt T-Shirt')).toBeVisible();

    // Ejercicio 10 (.first()): Haz clic en el primer botón de agregar al carrito que aparezca en la lista usando .first().
    await page.locator('[data-test^="add-to-cart"]').first().click();

    // Ejercicio 11 (.last()): Haz clic en el último botón de agregar al carrito utilizando .last().
    await page.locator('[data-test^="add-to-cart"]').last().click();

    // Ejercicio 13 (getByText): En /cart.html, verifica la presencia del título de columna "QTY".
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.getByText('QTY')).toBeVisible();

    // Ejercicio 14 (getByText): En /cart.html, verifica la presencia del título de columna "Description".
    await expect(page.getByText('Description')).toBeVisible();

    // Ejercicio 15 (getByRole): Ubica el botón "Continue Shopping" usando getByRole por su nombre accesible.
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();

    // Ejercicio 16 (getByPlaceholder): Rellena el campo First Name usando su placeholder "First Name".
    await page.locator('[data-test="checkout"]').click();
    await page.getByPlaceholder('First Name').fill('Juan');
    
    // Ejercicio 17 (getByPlaceholder): Rellena el campo Last Name usando su placeholder "Last Name".
    await page.getByPlaceholder('Last Name').fill('Pérez');

    // Ejercicio 18 (getByPlaceholder): Rellena el campo Zip/Postal Code usando su placeholder "Zip/Postal Code".
    await page.getByPlaceholder('Zip/Postal Code').fill('5000');
    await page.locator('[data-test="continue"]').click();

    // Ejercicio 19 (getByText): En /checkout-step-two.html, ubica el texto "Payment Information:".
    await expect(page.getByText('Payment Information:')).toBeVisible();
    
    // Ejercicio 20 (getByRole): En /checkout-complete.html, valida que el título de agradecimiento sea un heading con
    // texto "Thank you for your order!".
    await page.locator('[data-test="finish"]').click();
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    
    });

   });

   test.describe('ejercicios clase 3 - del 21 al 40', () => {

  test('ejercicio 21 - 22 - 23 - 24 - 25', async ({ page }) => {

    // Ejercicio 21 (CSS Atributo Personalizado): Selecciona el botón de login usando el atributo de test nativo [data-test="login-button"].
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('.submit-button').click();

    // Ejercicio 22 (getByRole Combobox): En /inventory.html, selecciona la opción de ordenamiento "Price (low to high)" interactuando con el selector de rol combobox.
    await page.getByRole('combobox').selectOption('lohi');

    // Ejercicio 23 (getByRole Combobox): Cambia el ordenamiento a "Name (Z to A)" comprobando que el valor cambie a za.
    await page.getByRole('combobox').selectOption('za');
    await expect(page.getByRole('combobox')).toHaveValue('za');

    //Ejercicio 24 (.filter() por Texto): Filtra los bloques de productos .inventory_item para obtener únicamente el que contiene el texto "Sauce Labs Onesie".
    const onesieItem = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Onesie' });
    await expect(onesieItem).toBeVisible();

    //Ejercicio 25 (.filter() + Acción): Filtra la tarjeta del producto "Sauce Labs Bike Light" y haz clic en su botón interno de agregar al carrito.
    const bikeLightItem = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Bike Light' });
    await bikeLightItem.locator('button').click();

  });
});