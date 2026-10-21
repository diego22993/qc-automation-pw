import { test, expect } from '@playwright/test';

test.describe('SauceDemo - Flujo de Compra E2E - Verificacion PDF Creator', () => {
    
    test ('Proceso completo de compra y verificación de PDF generado', async ({ page }) => {
        
        // 1. Navegación inicial a la plataforma
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveTitle(/Swag Labs/);

        // 2. Proceso de autenticación de usuario
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.getByRole('button', {name:'Login'}).click();

        //3. Validar redirección e ingreso a la tienda
        await expect(page).toHaveURL(/.*inventory.html/);
        await expect(page.locator('[data-test="title"]')).toHaveText('Products');
        
        // 4. Selección y adición de productos al carrito
        await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();

        //5. Validar que el badge del carrito registre 1 elementos
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

        // 6. Navegación al carrito de compras
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page.getByRole('button', {name:'checkout'})).toBeVisible();

        //7. Iniciar flujo de compra
        await page.locator('[data-test="checkout"]').click();

        // 8. Formulario de datos del comprador (Checkout - paso uno)
        await expect(page).toHaveURL(/.*checkout-step-one.html/);
        await page.getByPlaceholder('First Name').fill('Hernan');
        await page.getByPlaceholder('Last Name').fill('Ferreyra');
        await page.getByPlaceholder('Zip/Postal Code').fill('12540');

        // 9. Continuar al paso dos del checkout
        await page.locator('[data-test="continue"]').click();
        
        // 10. Resumen de compra y pago (Checkout - paso dos)
        await expect(page).toHaveURL(/.*checkout-step-two.html/);
        await expect(page.getByText('Test.allTheThings() T-Shirt (Red)')).toBeVisible();
        await page.locator('[data-test="finish"]').click();

        // 11. Confirmación final de la orden (Checkout Complete)
       
        await expect(page.getByText('Checkout: Complete!')).toBeVisible();        
        await expect(page.getByText('Thank you for your order!')).toBeVisible();
        await page.locator('[data-test="back-to-products"]').click();
        await expect(page).toHaveURL(/.*inventory.html/);
        await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    });
});