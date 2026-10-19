import { test, expect } from '@playwright/test';

test.describe('Compra de varios productos - SauceDemo', () => {
  test('Debe comprar varios productos y volver al inicio', async ({ page }) => {
    // 1. Iniciar sesión
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/.*inventory.html/);

    // 2. Agregar tres productos al carrito
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');

    // 3. Abrir el carrito y verificar la cantidad de productos
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/.*cart.html/);
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(3);

    // 4. Completar la compra
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByPlaceholder('First Name').fill('Mariela');
    await page.getByPlaceholder('Last Name').fill('Cuneo');
    await page.getByPlaceholder('Zip/Postal Code').fill('5000');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();

    // 5. Volver al inicio y verificar que el carrito quedó vacío
    await page.getByRole('button', { name: 'Back Home' }).click();
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
  });
});
