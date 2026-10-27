import { test, expect } from '@playwright/test';
/*
test.describe('LOGIN.HTML - Nivel Basico', {tag: ["@login", "@basico"]}, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });
    
    test('Ejercicio 1', {tag: ["@smoke"]} , async ({ page }) => {
        await page.getByPlaceholder('Username').fill('standard_user');
    });

    test('Ejercicio 2', async ({ page }) => {
        await page.getByPlaceholder('Password').fill('secret_sauce');
    });

    test('Ejercicio 3', async ({ page }) => {
        await page.getByRole('button', { name: 'Login' }).click();
    });

    test('Ejercicio 4', async ({ page }) => {
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
    });

    test('Ejercicio 5', async ({ page }) => {
        await page.locator('#user-name').fill('standard_user');
    });

    test('Ejercicio 6', async ({ page }) => {
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
        await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
    });

});


test.describe('INVENTARIO.HTML - Nivel Basico', {tag: ["@inventario", "@basico"]}, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
    });
    
    test('Ejercicio 7', async ({ page }) => {
        // await expect(page.getByText('Swag Labs')).toBeVisible();
        await (page.getByRole('heading', { name: 'Swag Labs' }));
        await expect(page.getByRole('heading', { name: 'Swag Labs' })).toBeVisible();
    });

    test('Ejercicio 8', async ({ page }) => {
        await (page.getByText('Sauce Labs Backpack'));
        await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    });

    test('Ejercicio 9', async ({ page }) => {
        await (page.getByAltText('Sauce Labs Bolt T-Shirt'));
        await expect(page.getByAltText('Sauce Labs Bolt T-Shirt')).toBeVisible();
    });

    test('Ejercicio 10', async ({ page }) => {
        await page.locator('button').filter({ hasText: 'Add to cart' }).first();
        await page.locator('button').filter({ hasText: 'Add to cart' }).first().click();
    });

    test('Ejercicio 11', async ({ page }) => {
        await page.locator('button').filter({ hasText: 'Add to cart' }).last();
        await page.locator('button').filter({ hasText: 'Add to cart' }).last().click();
    });

    test('Ejercicio 12', async ({ page }) => {
        await page.locator('button').filter({ hasText: 'Add to cart' }).nth(1);
        await page.locator('button').filter({ hasText: 'Add to cart' }).nth(1).click();
    });

});


test.describe('CART.HTML - Nivel Basico', {tag: ["@cart", "@basico"]}, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
    });
    
    test('Ejercicio 13', async ({ page }) => {
        await page.getByText('QTY');
        await expect(page.getByText('QTY')).toBeVisible();
    });

    test('Ejercicio 14', async ({ page }) => {
        await page.getByText('Description');
        await expect(page.getByText('Description')).toBeVisible();
    });

    test('Ejercicio 15', async ({ page }) => {
        await page.getByRole('button', { name: 'Continue Shopping' });
        await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
    });

});



test.describe('CHECKOUT-STEP-ONE.HTML - Nivel Basico', {tag: ["@checkout-step-one", "@basico"]}, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        await page.locator('button').filter({ hasText: 'Add to cart' }).first().click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();
    });
    
    test('Ejercicio 16', async ({ page }) => {
        await page.getByPlaceholder('First Name').fill('Juan');
    });

    test('Ejercicio 17', async ({ page }) => {
        await page.getByPlaceholder('Last Name').fill('Perez');
    });

    test('Ejercicio 18', async ({ page }) => {
        await page.getByPlaceholder('Zip/Postal Code').fill('12345');
    });

});

test.describe('CHECKOUT-STEP-TWO.HTML - Nivel Basico', {tag: ["@checkout-step-two", "@basico"]}, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        await page.locator('button').filter({ hasText: 'Add to cart' }).first().click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();
        await page.getByPlaceholder('First Name').fill('Juan');
        await page.getByPlaceholder('Last Name').fill('Perez');
        await page.getByPlaceholder('Zip/Postal Code').fill('12345');
        await page.locator('[data-test="continue"]').click();
    });
    
    test('Ejercicio 19', async ({ page }) => {
        await page.getByText('Payment Information:');
        await expect(page.getByText('Payment Information:')).toBeVisible();
    });

    test('Ejercicio 20', async ({ page }) => {
        await page.getByRole('button', { name: 'Finish' });
        await page.getByRole('button', { name: 'Finish' }).click();
        await expect(page).toHaveURL(/.*checkout-complete.html/);
        await expect(page.getByText('Thank you for your order!')).toBeVisible();
    });

});
*/

test.describe('LOGIN E INVENTARIO - Nivel Intermedio', {tag: ["@login", "@inventario", "@intermedio"]}, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });
    
    test('Ejercicio 21' , async ({ page }) => {
    });

    test('Ejercicio 22', async ({ page }) => {
    });

    test('Ejercicio 23', async ({ page }) => {
    });

    test('Ejercicio 24', async ({ page }) => {
    });

    test('Ejercicio 25', async ({ page }) => {
    });

    test('Ejercicio 26', async ({ page }) => {
    });

    test('Ejercicio 27', async ({ page }) => {
    });

});
/* 
test.describe('CARRITO Y NAVEGACION - Nivel Intermedio', {tag: ["@cart", "@navigation", "@intermedio"]}, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
    });
    
    test('Ejercicio 28', async ({ page }) => {
    });

    test('Ejercicio 29', async ({ page }) => {
    });

    test('Ejercicio 30', async ({ page }) => {
    });

    test('Ejercicio 31', async ({ page }) => {
    });

});


test.describe('FORMULARIO CHECKOUT-STEP-ONE - Nivel Intermedio', {tag: ["@checkout-step-one", "@intermedio"]}, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
    });
    
    test('Ejercicio 32', async ({ page }) => {
    });

    test('Ejercicio 33', async ({ page }) => {
    });

    test('Ejercicio 34', async ({ page }) => {
    });

});

test.describe('FORMULARIO CHECKOUT-STEP-TWO & COMPLETE - Nivel Intermedio', {tag: ["@checkout-step-two", "@intermedio"]}, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
    });
    
    test('Ejercicio 35', async ({ page }) => {
    });

    test('Ejercicio 36', async ({ page }) => {
    });

    test('Ejercicio 37', async ({ page }) => {
    });

    test('Ejercicio 38', async ({ page }) => {
    });

    test('Ejercicio 39', async ({ page }) => {
    });

    test('Ejercicio 40', async ({ page }) => {
    });

});

test.describe('MENU LATERAL Y ACCESIBILIDAD - Nivel Avanzado', {tag: ["@lateral", "@accesibilidad", "@avanzado"]}, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
    });
    
    test('Ejercicio 41', async ({ page }) => {
    });

    test('Ejercicio 42', async ({ page }) => {
    });

    test('Ejercicio 43', async ({ page }) => {
    });

});

test.describe('MANIPULACION AVANZADA DE COLECCIONES - Nivel Avanzado', {tag: ["@collections", "@avanzado"]}, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
    });
    
    test('Ejercicio 44', async ({ page }) => {
    });

    test('Ejercicio 45', async ({ page }) => {
    });

    test('Ejercicio 46', async ({ page }) => {
    });

    test('Ejercicio 47', async ({ page }) => {
    });

});

test.describe('VALIDACIONES ESTRICTAS E2E POR PANTALLAS - Nivel Avanzado', {tag: ["@e2e-validation", "@avanzado"]}, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
    });
    
    test('Ejercicio 48', async ({ page }) => {
    });

    test('Ejercicio 49', async ({ page }) => {
    });

    test('Ejercicio 50', async ({ page }) => {
    });

    test('Ejercicio 51', async ({ page }) => {
    });

    test('Ejercicio 52', async ({ page }) => {
    });

});

test.describe('FLUJOS COMPLETOS INTEGRALES - Nivel Avanzado', {tag: ["@complete", "@avanzado"]}, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
    });
    
    test('Ejercicio 53', async ({ page }) => {
    });

    test('Ejercicio 54', async ({ page }) => {
    });

    test('Ejercicio 55', async ({ page }) => {
    });

    test('Ejercicio 56', async ({ page }) => {
    });

    test('Ejercicio 57', async ({ page }) => {
    });

    test('Ejercicio 58', async ({ page }) => {
    });

    test('Ejercicio 59', async ({ page }) => {
    });

    test('Ejercicio 60', async ({ page }) => {
    });
});

*/