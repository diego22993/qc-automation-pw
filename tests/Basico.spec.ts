import { test, expect } from '@playwright/test';

    test.describe('Tarea 3 - Nuevas Tareas', () => {

    test('Basico', async ({ page }) => {
        // Froma alternativa usando getByPlaceholder y getByRole
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
    });

    test('Proceso Fallado', async ({ page }) => {
        // Ejercicio 4 (getByText): Intenta ingresar sin credenciales y valida que se muestre el texto de error "Epic sadface: Username is required".
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');

        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();

    });


    test('Selector CSS', async ({ page }) => {
        //Ejercicio 5 (CSS Selector ID): Completa el campo de usuario utilizando su ID directo (#user-name).
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');

        await page.locator('#user-name').fill('standard_user');

    });

    test('Selector CSS ID', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');

        // Ejercicio 6 (CSS Selector ID): Completa el campo de contraseña usando su ID #password y presiona el botón #login-button.
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
    });
       
    // Ejercicio 7
    test('Tittle Buscador', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Swag Labs' })).toBeVisible();
    });

        // Ejercicio 8
    test('Nick exacto', async ({ page }) => {
    const backpack = page.getByText('Sauce Labs Backpack');
    await expect(backpack).toBeVisible();
    });

        // Ejercicio 9
    test('imágenes', async ({ page }) => {
    const tshirtImage = page.getByAltText('Sauce Labs Bolt T-Shirt');
    await expect(tshirtImage).toBeVisible();
    });

        // Ejercicio 10
    test('Botón Add to Cart', async ({ page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    });

        // Ejercicio 11
    
    test('last', async ({ page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).last().click();
    });

        // Ejercicio 12
    
    test('nth', async ({ page }) => {
    // Selecciona la imagen del producto en el índice 1 (el segundo de la lista)
    await page.locator('.inventory_item img').nth(1).click();
    });

        // Ejercicio 13

    test('QTY', async ({ page }) => {
    await expect(page.getByText('QTY')).toBeVisible();
    });

        // Ejercicio 14
    test('Description', async ({ page }) => {
    await expect(page.getByText('Description')).toBeVisible();
    });

        // Ejercicio 15
    test('Continue Shopping', async ({ page }) => {
    
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    });

    // Ejercicio 16/17/18
    test('Checkout', async ({ page }) => {
    await page.getByPlaceholder('First Name').fill('Lautaro');
    await page.getByPlaceholder('Last Name').fill('Molina');
    await page.getByPlaceholder('Zip/Postal Code').fill('5000');
    });

    // Ejercicio 19
    test('Payment Information', async ({ page }) => {
    await expect(page.getByText('Payment Information:')).toBeVisible();
    });

    // Ejercicio 20
    test('Thank you for your order!', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    });

});