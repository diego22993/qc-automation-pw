import { test, expect } from '@playwright/test';

test.describe('Login en SauceDemo (21)', () => {
  test('Ej 21: login con el atributo data-test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory\.html/);
  });
});

test.describe('Inventario en SauceDemo (22-27)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('Ej 22: ordena por precio de menor a mayor', async ({ page }) => {
    await page.getByRole('combobox').selectOption({ label: 'Price (low to high)' });

    await expect(page.getByRole('combobox')).toHaveValue('lohi');
    await expect(page.locator('.inventory_item_price').first()).toHaveText('$7.99');
  });

  test('Ej 23: ordena por nombre de Z a A', async ({ page }) => {
    await page.getByRole('combobox').selectOption('za');

    await expect(page.getByRole('combobox')).toHaveValue('za');
  });

  test('Ej 24: filtra la tarjeta de la Onesie', async ({ page }) => {
    const onesie = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Onesie' });

    await expect(onesie).toHaveCount(1);
    await expect(onesie).toBeVisible();
  });

  test('Ej 25: agrega la Bike Light al carrito', async ({ page }) => {
    const bikeLight = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Bike Light' });
    await bikeLight.getByRole('button', { name: 'Add to cart' }).click();

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });

  test('Ej 26: precios dentro del contenedor del inventario', async ({ page }) => {
    const precios = page.locator('#inventory_container').locator('.inventory_item_price');

    await expect(precios).toHaveCount(6);
  });

  test('Ej 27: la Fleece Jacket cuesta $49.99', async ({ page }) => {
    const jacket = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Fleece Jacket' });

    await expect(jacket.locator('.inventory_item_price')).toHaveText('$49.99');
  });
});
