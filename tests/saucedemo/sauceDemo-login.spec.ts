import { test, expect } from '@playwright/test';

test.describe('Módulo de Autenticación - SauceDemo', () => {

    test('Debe ingresar a SauceDemo y completar el inicio de sesión exitosamente', async ({ page }) => {
     
        // 1. Navegación inicial a la plataforma
        await page.goto('https://www.saucedemo.com/');
        
        // 2.Validar que el titulo de la página sea correcto
        await expect(page).toHaveTitle(/Swag Labs/);

        // 3. Proceso de autenticación de usuario
        await page.getByPlaceholder('username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', {name:'Login'}).click();

        // 4. Validar redirección e ingreso a la tienda
        await expect(page).toHaveURL(/.*inventory.html/);
        await expect(page).toHaveURL(/.*inventory.html/);

        //5. Validar texto visible de productos
        await expect(page.getByText('Products')).toBeVisible();

    });
});
