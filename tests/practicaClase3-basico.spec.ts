import { test, expect } from '@playwright/test';

test.describe('PARTE 1 NIVEL BASICO: LOGIN.HTMLM', {tag: ['@login']}, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
    test('Ejercicio 1', async ({ page }) => {
       //Completar el campo username identifcado por el placeholder con el valor "standard_user"
        await page.getByPlaceholder('username').fill('standard_user');
    });
    test('Ejercicio 2', async ({ page }) => {
        //Completar el campo password identifcado por el placeholder con el valor "secret_sauce"
        await page.getByPlaceholder('Password').fill('secret_sauce');
    });
    test('Ejercicio 3', async ({ page }) => {
        //Hacer clic en el botón de login usando getByRole
        await page.getByRole('button',{name:'Login'}).click();        
    });
    test('Ejercicio 4', async ({ page }) => {
        //Ingresar sin credenciales y valida que se muestre el texto de error
        await page.getByPlaceholder('username').clear();
        await page.getByPlaceholder('Password').clear();
        await page.getByRole('button',{name:'Login'}).click();
        await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
    });
    test('Ejercicio 5', async ({ page }) =>{
        //Completar el campo de usuario utilizando su ID directo
        await page.locator('#user-name').fill('standard_user');
    });
    test('Ejercicio 6', async ({ page }) => {
        //Completarr el campo de contraseña usando su ID y presiona el botón login
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
    });
});

test.describe('PARTE 1 NIVEL BASICO: INVENTARIO.HTML', {tag: ['@inventario']}, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
         //Autenticacion pagina Swag Labs
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
    });

    test('Ejercicio 7', async ({ page }) => {       
        // Verifica el título de la pestaña del navegador
        await expect(page).toHaveTitle(/Swag Labs/);
        //verificar que tenga aparezca el texto "Products"
        await expect(page.getByText('Products')).toBeVisible();      
    });

    test('Ejercicio 8', async ({ page}) => {
        //Encontrar en el catálogo el producto "Sauce Labs Backpack" usando getByText.
        await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    }); 

    test('Ejercicio 9', async ({ page }) => {
       //Ubica la imagen principal de la camiseta usando getByAltText('Sauce Labs Bolt T-Shirt’).
       await expect(page.getByAltText('Sauce Labs Bolt T-Shirt')).toBeVisible();
    });

    test('Ejercicio 10', async ({ page }) => {
        //Hacer clic en el primer botón de agregar al carrito que aparezca en la lista usando .first().
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').first().click();
    });

    test('Ejerciocio 11', async ({ page }) => {
        //Hacer clic en el último botón de agregar al carrito utilizando .last().
        await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').last().click();
    });

    test('Ejerciocio 12', async ({ page }) => {
        //Seleccionar el segundo producto de la lista (índice 1) y haz clic en la imagen del producto.
        await page.locator('.inventory_item').nth(1).locator('img').click();
    });

});

test.describe('PARTE 1 NIVEL BASICO: CARTH.HTML', {tag: ['@carro']}, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
         //Autenticacion pagina Swag Labs
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
    });

    test('Ejercicio 13', async ({ page}) => {
        //Agrego un producto al carrito de compras
        await page.locator('[data-test= "add-to-cart-sauce-labs-backpack"]').click();
        //Voy a la pagina del carrito de compras haciendo clic en el ícono del carrito.
        await page.locator('[data-test= "shopping-cart-link"]').click();
        await expect(page).toHaveURL(/.*cart.html/);
        //Verificamos la presencia del título de columna "QTY".
        await expect(page.getByText('QTY')).toBeVisible();
    });

    test('Ejercicio 14', async ({ page}) => {
        //Agrego un producto al carrito de compras
        await page.locator('[data-test= "add-to-cart-sauce-labs-backpack"]').click();
        //Voy a la pagina del carrito de compras haciendo clic en el ícono del carrito.
        await page.locator('[data-test= "shopping-cart-link"]').click();
        await expect(page).toHaveURL(/.*cart.html/);
        //Verificamos la presencia del título de columna "Description".
        await expect(page.getByText('Description')).toBeVisible();
    });

        test('Ejercicio 15', async ({ page}) => {
        //Agrego un producto al carrito de compras
        await page.locator('[data-test= "add-to-cart-sauce-labs-backpack"]').click();
        //Voy a la pagina del carrito de compras haciendo clic en el ícono del carrito.
        await page.locator('[data-test= "shopping-cart-link"]').click();
        await expect(page).toHaveURL(/.*cart.html/);
        //Ubicamos el botón "Continue Shopping" usando getByRole por su nombre accesible.
        await expect(page.getByRole('button', {name:'Continue Shopping'})).toBeVisible();
    });
});

test.describe('PARTE 1 NIVEL BASICO: CHECKOUT-STEP-ONE.HTML', {tag: ['@checkout1']}, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
         //Autenticacion pagina Swag Labs
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
    });

    test('Ejercicio 16-17-18', async ({ page }) => {
        //Agrego un producto al carrito de compras
        await page.locator('[data-test= "add-to-cart-sauce-labs-backpack"]').click();
        //Voy a la pagina del carrito de compras haciendo clic en el ícono del carrito.
        await page.locator('[data-test= "shopping-cart-link"]').click();
        await expect(page).toHaveURL(/.*cart.html/);
        //Vamos al formulario del checkout
        await page.locator('#checkout').click();
        //Rellena el campo First Name usando su placeholder "First Name".
        await page.getByPlaceholder('First Name').fill('Hernan');
        //Rellena el campo Last Name usando su placeholder "Last Name".
        await page.getByPlaceholder('Last Name').fill('Ferreyra');
        //Rellena el campo Zip/Postal Code usando su placeholder "Zip/Postal Code".
        await page.getByPlaceholder('Zip/Postal Code').fill('12540');        
    });   
});

test.describe('PART 1 NIVEL BASICO: CHECKOUT-STEP-TWO.HTML', {tag: ['@checkout2']}, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
         //Autenticacion pagina Swag Labs
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
    });

    test('Ejercicio 19-20', async ({ page }) => {
        //Agrego un producto al carrito de compras.
        await page.locator('[data-test= "add-to-cart-sauce-labs-backpack"]').click();
        //Voy a la pagina del carrito de compras haciendo clic en el ícono del carrito.
        await page.locator('[data-test= "shopping-cart-link"]').click();
        await expect(page).toHaveURL(/.*cart.html/);
        //Vamos al formulario del checkout
        await page.locator('#checkout').click();
        //Rellena el campo First Name usando su placeholder "First Name".
        await page.getByPlaceholder('First Name').fill('Hernan');
        //Rellena el campo Last Name usando su placeholder "Last Name".
        await page.getByPlaceholder('Last Name').fill('Ferreyra');
        //Rellena el campo Zip/Postal Code usando su placeholder "Zip/Postal Code".
        await page.getByPlaceholder('Zip/Postal Code').fill('12540');   
        
        //Avanzo al step two del checkout
        await page.locator('[data-test="continue"]').click();
        //Verifico que estoy en el step two del chackout
        await expect(page).toHaveURL(/.*checkout-step-two.html/);
        //En checkout-step-two.html, ubico el texto "Payment Information:". ==> EJERCICIO 19
        await expect(page.getByText('Payment Information:')).toBeVisible();
        
        //Finalizo la compra haciendo click en el boton Finish
        await page.locator('[data-test="finish"]').click();
        //Verifico que estoy en la pagina checkout-complete
        await expect(page).toHaveURL(/.*checkout-complete.html/);
        // En checkout-complete valido que el título de agradecimiento sea un heading con texto "Thank you for your order!". ==> EJERCICIO 20
        await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    });   
});