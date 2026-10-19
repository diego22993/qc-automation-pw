import { test, expect } from '@playwright/test';

test.describe('Carrito - SauceDemo', () => {
  test('Debe agregar un producto al carrito', async ({ page }) => {
    // 1. Iniciar sesión
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/.*inventory.html/);

    // 2. Agregar la mochila al carrito
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // 3. Abrir el carrito y verificar el producto
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/.*cart.html/);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  });
});
