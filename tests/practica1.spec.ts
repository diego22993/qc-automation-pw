import { test, expect } from '@playwright/test';

test.describe('LOGIN.HTML: Nivel Basico', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
    test('Ejercicio 1', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('standard_user');
        await expect(page.getByPlaceholder('Username')).toHaveValue('standard_user');
    });
    test('Ejercicio 2', async ({ page }) => {
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await expect(page.getByPlaceholder('Password')).toHaveValue('secret_sauce');
    });
    test('Ejercicio 3', async ({ page }) => {
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveURL(/.*inventory.html/);
    });
    test('Ejercicio 4', async ({ page }) => {
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(
            page.locator('[data-test="error"]')).toContainText('Epic sadface: Username is required');
    });
    test('Ejercicio 5', async ({ page }) => {
        await page.locator('#user-name').fill('standard_user');
        await expect(page.locator('#user-name')).toHaveValue('standard_user');
        await page.locator('#password').fill('secret_sauce');
    });
    test('Ejercicio 6', async ({ page }) => {
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

});

test.describe('INVENTARIO.HTML: Nivel Basico', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
        await expect(page).toHaveURL(/.*inventory.html/);
    });
    test('Ejercicio 7', async ({ page }) => {
        await expect(page.locator('.app_logo')).toHaveText('Swag Labs');
    });
    test('Ejercicio 8', async ({ page }) => {
        await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    });
    test('Ejercicio 9', async ({ page }) => {
        await expect(page.getByAltText('Sauce Labs Bolt T-Shirt')).toBeVisible();
    });
    test('Ejercicio 10', async ({ page }) => {
        await page.getByRole('button', { name: 'Add to cart' }).first().click();
        await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    });
    test('Ejercicio 11', async ({ page }) => {
        await page.getByRole('button', { name: 'Add to cart' }).last().click();
        await expect(
            page.locator('[data-test="remove-test.allthethings()-t-shirt-(red)"]')).toBeVisible();});
    test('Ejercicio 12', async ({ page }) => {
        await page.locator('.inventory_item_img').nth(2).click();
        await expect(page).toHaveURL(/.*inventory-item.html*/);
        
    });

});

test.describe('CART.HTML: Nivel Basico', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
        await expect(page).toHaveURL(/.*inventory.html/);
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page).toHaveURL(/.*cart.html/);
    });
    test('Ejercicio 13', async ({ page }) => {
        await expect(page.getByText('QTY', { exact: true })).toBeVisible();
    });
    test('Ejercicio 14', async ({ page }) => {
        await expect(page.getByText('Description', { exact: true })).toBeVisible();
    });
    test('Ejercicio 15', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
    });
    
      

});

test.describe('CHECKOUT-STEP-ONE.HTML: Nivel Basico', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
        await expect(page).toHaveURL(/.*inventory.html/);
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page).toHaveURL(/.*cart.html/);
        await page.locator('#checkout').click();
        await expect(page).toHaveURL(/.*checkout-step-one.html/);
    });
    test('Ejercicio 16', async ({ page }) => {
        await page.getByPlaceholder('First Name').fill('Naira');
        await expect(page.getByPlaceholder('First Name')).toHaveValue('Naira');
    });
    test('Ejercicio 17', async ({ page }) => {
        await page.getByPlaceholder('Last Name').fill('Garibay');
        await expect(page.getByPlaceholder('Last Name')).toHaveValue('Garibay');
    });    
    test('Ejercicio 18', async ({ page }) => {
        await page.getByPlaceholder('Zip/Postal Code').fill('5000');
        await expect(page.getByPlaceholder('Zip/Postal Code')).toHaveValue('5000');
    }); 
});

test.describe('CHECKOUT-STEP-TWO.HTML: Nivel Basico', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
        await expect(page).toHaveURL(/.*inventory.html/);
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page).toHaveURL(/.*cart.html/);
        await page.locator('#checkout').click();
        await expect(page).toHaveURL(/.*checkout-step-one.html/);
        await page.locator('#first-name').fill('Naira');
        await page.locator('#last-name').fill('Garibay');
        await page.locator('#postal-code').fill('5000');
        await page.locator('#continue').click();
        await expect(page).toHaveURL(/.*checkout-step-two.html/);
    });
    test('Ejercicio 19', async ({ page }) => {
        await expect(page.getByText('Payment Information:', { exact: true })).toBeVisible();
    }); 
    test('Ejercicio 20', async ({ page }) => {
        await page.locator('#finish').click();
        await expect(page).toHaveURL(/.*checkout-complete.html/);
        await expect(page.getByRole(
            'heading', { name: 'Thank you for your order!', exact: true })).toBeVisible();
    }); 
});


