import { test, expect } from '@playwright/test';

test.describe('SauceDemo - Inventario y carrito', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('Muestra los 6 productos del inventario', async ({ page }) => {
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
  });

  test('Ordena los productos por precio de menor a mayor', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    const textos = await page.locator('[data-test="inventory-item-price"]').allTextContents();
    const precios = textos.map((t) => parseFloat(t.replace('$', '')));

    expect(precios).toEqual([...precios].sort((a, b) => a - b));
  });

  test('Agrega y quita un producto del carrito', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
  });

  test('Cierra sesión desde el menú lateral', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  test('Completa el checkout y vuelve al inicio', async ({ page }) => {
    // 1. Agregar un producto y entrar al carrito
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/cart\.html/);

    // 2. Checkout - datos del comprador
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Juan');
    await page.locator('[data-test="lastName"]').fill('Pérez');
    await page.locator('[data-test="postalCode"]').fill('5000');
    await page.locator('[data-test="continue"]').click();

    // 3. Resumen y finalizar
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');

    // 4. Volver al inicio
    await page.locator('[data-test="back-to-products"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
  });

  test('No permite continuar el checkout sin código postal', async ({ page }) => {
    // 1. Agregar un producto e ir al checkout
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    // 2. Completar nombre y apellido, dejar vacío el código postal
    await page.locator('[data-test="firstName"]').fill('Juan');
    await page.locator('[data-test="lastName"]').fill('Pérez');
    await page.locator('[data-test="continue"]').click();

    // 3. Se muestra el error y no avanza al paso 2
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Postal Code is required');
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });
});

test('Usuario bloqueado no puede iniciar sesión', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]')).toContainText(
    'Sorry, this user has been locked out'
  );
});
