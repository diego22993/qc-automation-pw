import { test, expect } from '@playwright/test';

test.describe('Login en SauceDemo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('Ej 1-3: login con getByPlaceholder y getByRole', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('Ej 4: error al loguear sin credenciales', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
  });

  test('Ej 5-6: login con selectores por ID', async ({ page }) => {
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory\.html/);
  });
});

test.describe('Inventario en SauceDemo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('Ej 7: se ve el título Swag Labs', async ({ page }) => {
    await expect(page.getByText('Swag Labs')).toBeVisible();
  });

  test('Ej 8: aparece Sauce Labs Backpack', async ({ page }) => {
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  });

  test('Ej 9: imagen de la Bolt T-Shirt', async ({ page }) => {
    await expect(page.getByAltText('Sauce Labs Bolt T-Shirt')).toBeVisible();
  });

  test('Ej 10: agrega el primer producto con .first()', async ({ page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });

  test('Ej 11: agrega el último producto con .last()', async ({ page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).last().click();

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });

  test('Ej 12: clic en la imagen del segundo producto con .nth()', async ({ page }) => {
    await page.locator('[data-test="inventory-item"]').nth(1).getByRole('img').click();

    await expect(page).toHaveURL(/inventory-item\.html/);
  });
});

test.describe('Carrito en SauceDemo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.goto('https://www.saucedemo.com/cart.html');
  });

  test('Ej 13: se ve la columna QTY', async ({ page }) => {
    await expect(page.getByText('QTY')).toBeVisible();
  });

  test('Ej 14: se ve la columna Description', async ({ page }) => {
    await expect(page.getByText('Description', { exact: true })).toBeVisible();
  });

  test('Ej 15: se ve el botón Continue Shopping', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
  });
});

test.describe('Checkout paso 1 en SauceDemo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
  });

  test('Ej 16-18: completa el formulario con getByPlaceholder', async ({ page }) => {
    await page.getByPlaceholder('First Name').fill('Mariela');
    await page.getByPlaceholder('Last Name').fill('Cuneo');
    await page.getByPlaceholder('Zip/Postal Code').fill('5000');

    await expect(page.getByPlaceholder('First Name')).toHaveValue('Mariela');
    await expect(page.getByPlaceholder('Last Name')).toHaveValue('Cuneo');
    await expect(page.getByPlaceholder('Zip/Postal Code')).toHaveValue('5000');
  });
});

test.describe('Checkout paso 2 y compra finalizada en SauceDemo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
  });

  test('Ej 19: se ve el texto Payment Information', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/checkout-step-two.html');

    await expect(page.getByText('Payment Information:')).toBeVisible();
  });

  test('Ej 20: el título de agradecimiento es un heading', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/checkout-complete.html');

    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
  });
});
