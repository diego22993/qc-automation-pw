import { test, expect } from '@playwright/test';

test.describe('Tarea 2 - Login', () => {

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

// Ejercicio 1 (getByPlaceholder)
  test('ejercicio 1', async ({page})=>{
    await page.getByPlaceholder('Username').fill('standard_user');
  })

  // Ejercicio 2 (getByPlaceholder)
  test('ejercicio 2', async ({page})=>{
    await page.getByPlaceholder('Password').fill('secret_sauce');
  })

  // Ejercicio 3 (getByRole)
  test('ejercicio 3', async ({page})=>{
    await page.getByRole('button', {name: 'Login'}).click();
  })

  // Ejercicio 4 (getByText)
  test('ejercicio 4', async ({page})=>{
    await page.getByRole('button', {name: 'Login'}).click();
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
  })

  // Ejercicio 5 (CSS Selector ID para usuario)
  test('ejercicio 5', async ({page})=>{
    await page.locator('#user-name').fill('standard_user');
  })

   // Ejercicio 6 (CSS Selector ID para contraseña y botón login)
  test('ejercicio 6', async ({page})=>{
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
  })

// Ejercicio 7 (getByRole - Heading en Inventario)
  test('ejercicio 7', async ({page})=>{
    //Loguear usuario
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    //Visualizar el titulo del header (lo cambio por getByText, ya que no encuentra ese header)
    await expect(page.getByText('Swag Labs')).toBeVisible();
  })

// Ejercicio 8 (getByText en Inventario)
  test('ejercicio 8', async ({page})=>{
    //Loguear usuario
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Buscar el producto por texto
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

});

// Ejercicio 9 (getByAltText para imagen en Inventario)
  test('ejercicio 9', async ({page})=>{
    //Loguear usuario
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Buscar la imagen por su texto alternativo
    await expect(page.getByAltText('Sauce Labs Bolt T-Shirt')).toBeVisible();

});

// Ejercicio 10 (.first() para el primer botón)
  test('ejercicio 10', async ({page})=>{
    //Loguear usuario
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Hacemos clic en el primer botón de "Add to cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').first().click;

});

// Ejercicio 11 (.first() para el primer botón)
  test('ejercicio 11', async ({page})=>{
    //Loguear usuario
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Hacemos clic en el último botón de "Add to cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').last().click;

});

// Ejercicio 12 (.nth() - Segundo producto, índice 1)
  test('ejercicio 12', async ({page})=>{
    //Loguear usuario
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Seleccionar el segundo producto de la lista
    await page.locator('.inventory_item_img').nth(1).click();

});

// Ejercicio 13 (getByText - QTY en Carrito)
  test('ejercicio 13', async ({page})=>{
    //Loguear usuario
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // verificar la presencia del título de columna "QTY".
    await page.locator('.shopping_cart_link').click();
    await expect(page.getByText ('QTY')).toBeVisible();

});

// Ejercicio 14 (getByText - Description en Carrito)
  test('ejercicio 14', async ({page})=>{
    //Loguear usuario
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // verificar la presencia del título de columna "Description".
    await page.locator('.shopping_cart_link').click();
    await expect(page.getByText ('Description')).toBeVisible();

});

// Ejercicio 15 (getByRole - Continue Shopping)
  test('ejercicio 15', async ({page})=>{
    //Loguear usuario
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    //Ubicar el botón "Continue Shopping" usando getByRole por su nombre accesible.
    await page.locator('.shopping_cart_link').click();
    await expect(page.getByRole ('button', {name: 'Continue Shopping'})).toBeVisible();

});

// Ejercicio 16 (getByPlaceholder - First Name)
  test('ejercicio 16', async ({page})=>{
    //Loguear usuario
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    //Ir hacia Checkout
    await page.locator('.shopping_cart_link').click();
    await page.locator('#checkout').click();

    //Rellenar el campo First Name usando su placeholder "First Name".
    await page.getByPlaceholder('First Name').fill('Bianca');

});

// Ejercicio 17 (getByPlaceholder - Last Name)
  test('ejercicio 17', async ({page})=>{
    //Loguear usuario
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    //Ir hacia Checkout
    await page.locator('.shopping_cart_link').click();
    await page.locator('#checkout').click();

    //Rellenar el campo Last Name usando su placeholder "Last Name".
    await page.getByPlaceholder('Last Name').fill('Urbisaglia');

});

// Ejercicio 18 (getByPlaceholder - Zip/Postal Code)
  test('ejercicio 18', async ({page})=>{
    //Loguear usuario
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    //Ir hacia Checkout
    await page.locator('.shopping_cart_link').click();
    await page.locator('#checkout').click();

    //Rellenar el campo Zip/Postal Code usando su placeholder "Last Name".
    await page.getByPlaceholder('Zip/Postal Code').fill('5014');

});

// Ejercicio 19 (getByText - Payment Information en Step Two)
  test('ejercicio 19', async ({page})=>{
    //Loguear usuario
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    //Ir hacia Checkout
    await page.locator('.shopping_cart_link').click();
    await page.locator('#checkout').click();

    //Rellenar todos los campos y hacer click en continue
    await page.getByPlaceholder('First Name').fill('Bianca');
    await page.getByPlaceholder('Last Name').fill('Urbisaglia');
    await page.getByPlaceholder('Zip/Postal Code').fill('5014');
    await page.locator('#continue').click();

    //ubicar el texto "Payment Information:".
    await expect(page.getByText('Payment Information')).toBeVisible();

});

// Ejercicio 20 (getByRole - Heading de agradecimiento en Complete)
  test('ejercicio 20', async ({page})=>{
    //Loguear usuario
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    //Ir hacia Checkout
    await page.locator('.shopping_cart_link').click();
    await page.locator('#checkout').click();

    //Rellenar todos los campos y hacer click en continue
    await page.getByPlaceholder('First Name').fill('Bianca');
    await page.getByPlaceholder('Last Name').fill('Urbisaglia');
    await page.getByPlaceholder('Zip/Postal Code').fill('5014');
    await page.locator('#continue').click();

    //Ir a la pantalla de checkout complete
    await page.locator('#finish').click()
    await expect(page.getByRole('heading',{name: 'Thank you for your order!'})).toBeVisible();

});


})