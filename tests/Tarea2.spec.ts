import { test, expect } from '@playwright/test';

test.describe('Tarea 2 - Flujo Monolítico E2E de Compra de Principio a Fin sin Pasos Integrados', () => {

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
        await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
        
        // Validar que el badge del carrito registre 4 elementos
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('4');
        

        // 4. Navegación al carrito de compras
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page).toHaveURL(/.*cart.html/);

        // Validar que los productos seleccionados estén presentes en la lista
        await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
        await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
        await expect(page.getByText('Test.allTheThings() T-Shirt (Red)')).toBeVisible();
        await expect(page.getByText('Sauce Labs Fleece Jacket')).toBeVisible();

        // Iniciar flujo de compra
        await page.locator('[data-test="checkout"]').click();
        await expect(page).toHaveURL(/.*checkout-step-one.html/);
        
        
        // 5. Formulario de datos del comprador (Checkout - Step One)
        await page.locator('[data-test="firstName"]').fill('Lauta');
        await page.locator('[data-test="lastName"]').fill('Molina');
        await page.locator('[data-test="postalCode"]').fill('5016');
        await page.locator('[data-test="continue"]').click();

        // 6. Resumen de compra y pago (Checkout - Step Two)
        await expect(page).toHaveURL(/.*checkout-step-two.html/);
        await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
        await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
        await expect(page.getByText('Test.allTheThings() T-Shirt (Red)')).toBeVisible();
        await expect(page.getByText('Sauce Labs Fleece Jacket')).toBeVisible();
        await page.locator('[data-test="finish"]').click();

        // 7. Confirmación final de la orden (Checkout Complete)
        await expect(page).toHaveURL(/.*checkout-complete.html/);
        await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
        await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');

        // 8. Generar PDF
        
        await expect(page.locator('[data-test="generate-pdf-order"]')).toBeVisible();   
        // Espero a que se genere la descarga del PDF
        const descargaPromise = page.waitForEvent('download');                          
        // Hacer clic en el botón para generar el PDF
        await page.locator('[data-test="generate-pdf-order"]').click();                 
        // Espero a que se complete la descarga
        const descarga = await descargaPromise;                                         
        // Muestro el nombre del archivo descargado en la consola
       expect(descarga.suggestedFilename()).toContain('.pdf');                         

        // 9. Regresar a la página principal
        await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
        await page.locator('[data-test="back-to-products"]').click();

    }); 

    

});
