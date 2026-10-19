import { test, expect } from '@playwright/test';

test.describe('Módulo de Autenticación - SauceDemo', () => {
  test('Debe ingresar a SauceDemo y completar el inicio de sesión exitosamente', async ({ page }) => {
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
  });
});
