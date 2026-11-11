import { test, expect } from '@playwright/test'; 

test.describe('Ejercicios: Nivel básico', () => {

  test('Login completo: Puntos 1,2 y 3', async ({ page }) => {

    // Ingreso a la plataforma y validación de URL
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // Proceso de autenticación de usuario
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

  });  

  test('Credenciales inválidas y re-login: Puntos 4, 5 y 6', async ({ page }) => {

    // Ingreso a la plataforma
    await page.goto('https://www.saucedemo.com/');

    // Ingreso sin credenciales
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible(); 

    // Ingreso con credenciales válidas
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
  });  

  test(' Puntos 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15', async ({ page }) => {

    // Ingreso a la plataforma
    await page.goto('https://www.saucedemo.com/');

    // Ingreso sin credenciales
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible(); 

    // Ingreso con credenciales válidas
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click(); 

    // Validación de título de la página 
    await expect(page.getByText('Swag Labs', { exact: true })).toBeVisible(); 

    // Búsqueda de producto 
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible(); 

    // Búsqueda por texto alternativo
    await expect(page.getByAltText('Sauce Labs Bolt T-Shirt')).toBeVisible(); 

    // Añadir primer producto al carrito 
    await page.getByRole('button', { name: 'Add to cart' }).first().click();

    // Añadir último producto al carrito 
    await page.getByRole('button', { name: 'Add to cart' }).last().click(); 

    // Seleccionar la foto del segundo producto 
    await page.locator('.inventory_item_img img').nth(1).click(); 

    // Validar existencia de texto QTY  
    await page.getByRole('button', { name: 'Add to cart' }).first().click(); 
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.getByText('QTY', { exact: true })).toBeVisible(); 
    await expect(page.getByText('Description', { exact: true })).toBeVisible(); 
    await page.getByRole('button', { name: 'Continue Shopping' }).click(); 
  }); 

  test('Re login: Puntos 16, 17', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.getByRole('button', { name: 'Checkout' }).click();

    await page.getByPlaceholder('First Name').fill('Juan');
    await page.getByPlaceholder('Last Name').fill('Pérez');
    await page.getByPlaceholder('Zip/Postal Code').fill('5000');
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page).toHaveURL(/.*checkout-complete.html/); 
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();

  }); 

});