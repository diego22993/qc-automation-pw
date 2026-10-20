import { test, expect } from '@playwright/test';

test.describe('Detalle de producto - SauceDemo', () => {
  test('Debe abrir el detalle de un producto y volver al listado', async ({ page }) => {
    // a. Navegar a la web
    await page.goto('https://www.saucedemo.com');

    // b. Validar título
    await expect(page).toHaveTitle(/Swag Labs/);

    // c. Completar el usuario
    await page.getByPlaceholder('Username').fill('standard_user');

    // d. Completar la contraseña
    await page.getByPlaceholder('Password').fill('secret_sauce');

    // e. Hacer clic en el botón
    await page.getByRole('button', { name: 'Login' }).click();

    // f. Validar cambio de URL
    await expect(page).toHaveURL(/.*inventory.html/);

    // g. Validar texto visible de productos
    const tituloProductos = page.getByText('Products');
    await expect(tituloProductos).toBeVisible();

    // 2. Entrar al detalle de la mochila
    await page.locator('[data-test="item-4-title-link"]').click();
    await expect(page).toHaveURL(/.*inventory-item.html/);

    // 3. Verificar nombre y precio del producto
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');

    // 4. Volver al listado de productos
    await page.locator('[data-test="back-to-products"]').click();
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.getByText('Products')).toBeVisible();
  });
});
