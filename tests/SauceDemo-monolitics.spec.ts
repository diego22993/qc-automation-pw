import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test.describe('SauceDemo - Flujo Monolítico E2E de Compra de Principio a Fin sin Pasos Integrados', () => {

  test('Proceso completo de compra en un solo flujo monolítico', async ({ page }) => {

    // 1. Navegación inicial a la plataforma
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // 2. Proceso de autenticación de usuario
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Validar redirección e ingreso a la tienda
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');

    // 3. Selección y adición de productos al carrito
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Validar que el badge del carrito registre 2 elementos
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    // 4. Navegación al carrito de compras
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/.*cart.html/);

    // Validar que los productos seleccionados estén presentes en la lista
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();

    // Iniciar flujo de compra
    await page.locator('[data-test="checkout"]').click();

    // 5. Formulario de datos del comprador (Checkout - Step One)
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
    await page.locator('[data-test="firstName"]').fill('Juan');
    await page.locator('[data-test="lastName"]').fill('Pérez');
    await page.locator('[data-test="postalCode"]').fill('5000');
    await page.locator('[data-test="continue"]').click();

    // 6. Resumen de compra y pago (Checkout - Step Two)
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
    await page.locator('[data-test="finish"]').click();

    // 7. Confirmación final de la orden (Checkout Complete)
    await expect(page).toHaveURL(/.*checkout-complete.html/);
    await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');

    // 8. Localizar Back Home y volver al catálogo después de la compra.
    const backHome = page.locator('[data-test="back-to-products"]');
    await expect(backHome).toBeVisible();
    await expect(backHome).toHaveText('Back Home');
    await backHome.click();

    // Validar el resultado del clic: catálogo visible y carrito vacío.
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);

  });

  test('Generar y descargar el PDF de la orden', async ({ page }, testInfo) => {
    // Cada test empieza de cero: no depende de la compra del test anterior.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Juan');
    await page.locator('[data-test="lastName"]').fill('Pérez');
    await page.locator('[data-test="postalCode"]').fill('5000');
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(/\/checkout-complete\.html$/);

    // Lo buscamos por su rol y el nombre que ve el usuario.
    const generarPdf = page.getByRole('button', { name: 'Generate PDF order', exact: true });
    await expect(generarPdf).toBeVisible();

    // Escuchar ANTES del clic evita perder el evento de descarga.
    const descargaPendiente = page.waitForEvent('download');
    await generarPdf.click();
    const descarga = await descargaPendiente;
    expect(await descarga.failure()).toBeNull();
    expect(descarga.suggestedFilename()).toMatch(/\.pdf$/i);

    // Guardar y adjuntar permite abrir la orden desde el reporte HTML.
    const rutaPdf = testInfo.outputPath('orden.pdf');
    await descarga.saveAs(rutaPdf);
    const contenido = await readFile(rutaPdf);
    expect(contenido.subarray(0, 5).toString()).toBe('%PDF-');
    await testInfo.attach('PDF de la orden', { path: rutaPdf, contentType: 'application/pdf' });
  });

});

