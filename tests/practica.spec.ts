import { test, expect } from '@playwright/test';

// 1. Navegación inicial a la plataforma
// Suite: agrupación de casos de prueba de la funcionalidad Login

test.describe('Tarea 1 - Login', () => {

    test('Ejercicio 1', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.getByPlaceholder('Username').fill('standard_user');
    });

    test('Ejercicio 2', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.getByPlaceholder('Password').fill('secret_sauce');
    });

    test('Ejercicio 3', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.getByRole('button', { name: 'Login' }).click();
    });

    test('Ejercicio 4', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('Username is required')).toBeVisible();
    });
    test('Ejercicio 5', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator("#user-name").fill("standard_user");
    });
    test('Ejercicio 6', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator("#password").fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
    });

});

test.describe('Tarea 2 - Inventario', () => {
    test('Ejercicio 7', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator("#user-name").fill("standard_user");
        await page.locator("#password").fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByRole('heading', { level: 1, name: 'Swag Labs' })).toBeVisible();
    });
    test('Ejercicio 8', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator("#user-name").fill("standard_user");
        await page.locator("#password").fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText("Sauce Labs Backpack", { exact: true })).toBeVisible();
    });
    test('Ejercicio 9', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator("#user-name").fill("standard_user");
        await page.locator("#password").fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByAltText('Sauce Labs Bolt T-Shirt', { exact: true })).toBeVisible();
    });
    test('Ejercicio 10', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator("#user-name").fill("standard_user");
        await page.locator("#password").fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.locator('[data-test^="add-to-cart-"]').first().click();
    });
    test('Ejercicio 11', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator("#user-name").fill("standard_user");
        await page.locator("#password").fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.locator('[data-test^="add-to-cart-"]').last().click();
    });
    test('Ejercicio 12', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator("#user-name").fill("standard_user");
        await page.locator("#password").fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.locator('[data-test^="add-to-cart-"]').nth(1).click();
    });
    test('Ejercicio 13', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator("#user-name").fill("standard_user");
        await page.locator("#password").fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByRole('button', { name: 'Cart, empty' }).click();
        await expect(page.getByText('QTY', { exact: true })).toBeVisible();
    });
    test('Ejercicio 14', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator("#user-name").fill("standard_user");
        await page.locator("#password").fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByRole('button', { name: 'Cart, empty' }).click();
        await expect(page.getByText('Description', { exact: true })).toBeVisible();
    });
    test('Ejercicio 15', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator("#user-name").fill("standard_user");
        await page.locator("#password").fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.goto('https://www.saucedemo.com/cart.html');
        await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
    });
});
test.describe('Tarea 3 - CHECKOUT-STEP-ONE', () => {

    test('Ejercicio 16', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator("#user-name").fill("standard_user");
        await page.locator("#password").fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.goto('https://www.saucedemo.com/checkout-step-one.html');
        await page.getByPlaceholder("First Name").fill("First Name");
    });
    test('Ejercicio 17', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator("#user-name").fill("standard_user");
        await page.locator("#password").fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.goto('https://www.saucedemo.com/checkout-step-one.html');
        await page.getByPlaceholder("Last Name").fill("Last Name");
    });
    test('Ejercicio 18', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator("#user-name").fill("standard_user");
        await page.locator("#password").fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.goto('https://www.saucedemo.com/checkout-step-one.html');
        await page.getByPlaceholder("Zip/Postal Code").fill("Zip/Postal Code");
    });
});
test.describe('Tarea 4 - CHECKOUT-STEP-TWO', () => {
    test('Ejercicio 19', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator("#user-name").fill("standard_user");
        await page.locator("#password").fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.goto('https://www.saucedemo.com/checkout-step-two.html');
        await expect(page.getByText("Payment Information:", { exact: true })).toBeVisible();
    });
    test('Ejercicio 20', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator("#user-name").fill("standard_user");
        await page.locator("#password").fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.goto('https://www.saucedemo.com/checkout-complete.html');
        await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    });

});




