import { test, expect } from '@playwright/test';

test.describe('LOGIN.HTML: Nivel Intermedio', { tag: ['@login'] },() => {
    test('Ejercicio 21', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        await expect(page).toHaveURL(/.*inventory.html/);
    });
});

test.describe('INVENTARIO.HTML: Nivel Intermedio', { tag: ['@inventory'] },() => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
        await expect(page).toHaveURL(/.*inventory.html/);
    });
    test('Ejercicio 22', async ({ page }) => {
        await page.locator('[data-test="product-sort-container"]').click();
        await page.getByRole('combobox').selectOption('lohi');
        await expect(page.locator('[data-test="active-option"]')).toHaveText('Price (low to high)');
    });
    test('Ejercicio 23', async ({ page }) => {
        await page.locator('[data-test="product-sort-container"]').click();
        await page.getByRole('combobox').selectOption('za');
        await expect(page.locator('[data-test="active-option"]')).toHaveText('Name (Z to A)');
    });
    test('Ejercicio 24', async ({ page }) => {
        const producto = page.locator('[data-test="inventory-item"]').filter({ hasText: 'Sauce Labs Onesie' });
        await expect(producto).toBeVisible();
    });
    test('Ejercicio 25', async ({ page }) => {
        const producto = page.locator('[data-test="inventory-item"]').filter({ hasText: "Sauce Labs Bike Light" });
        await producto.getByRole('button', { name: 'Add to cart' }).click();
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    });
    test('Ejercicio 26', async ({ page }) => {
        const precios = page.locator('#inventory_container').locator('.inventory_item_price');
        await expect(precios).toHaveCount(6);

    });
    test('Ejercicio 27', async ({ page }) => {
        const precio = page.locator('[data-test="inventory-item"]').filter({
             hasText: "Sauce Labs Fleece Jacket" }).locator('[data-test="inventory-item-price"]');
        await expect(precio).toHaveText('$49.99');

    });
});
      