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
    

});