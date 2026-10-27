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

test.describe('PARTE 2 NIVEL INTERMEDIO: LOGIN E INVENTARIO', {tag: ['@login-inv']}, ()=> {
    test.beforeEach(async ({ page }) =>{
        //Navegamos a la pagina sauce demo
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        // completamos usuario y pasword
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');

    });
    test('Ejercicio 21', async ({ page}) => {
        //Selecciona el botón de login usando el atributo de test nativo [data-test="login-button"].
        await page.locator('[data-test="login-button"]').click();
    });
    test('Ejercicio 22', async ({ page }) =>{
        //Ingresamos a la pagina sauce demo
        await page.locator('[data-test="login-button"]').click();
        //En /inventory.html, selecciona la opción de ordenamiento "Price (low to high)" interactuando con el selector de rol combobox.
        await page.getByRole('combobox').selectOption('lohi');
    });
    test('Ejercicio 23', async ({ page }) =>{
        //Ingresamos a la pagina sauce demo
        await page.locator('[data-test="login-button"]').click();
        //Cambia el ordenamiento a "Name (Z to A)" comprobando que el valor cambie a za.
        const combobox = page.getByRole('combobox');
        await combobox.selectOption('za');
        //comprobamos que cambio el valor
        await expect(combobox).toHaveValue('za');
    });
    test('Ejercicio 24', async ({ page }) => {
        //Ingresamos a la pagina sauce demo
        await page.locator('[data-test="login-button"]').click();
        //Filtrar los bloques de productos .inventory_item para obtener únicamente el que contiene el texto "Sauce Labs Onesie".
        const onesieItem = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Onesie' });
        //Interactuamos únicamente con los elementos de *ese* producto filtrado
        await onesieItem.locator('button').click();// Hace click en "Add to cart" de ese ítem
    });
    test('Ejercicio 25', async ({ page }) => {
        //Ingresamos a la pagina sauce demo
        await page.locator('[data-test="login-button"]').click();
        //Filtrar la tarjeta del producto "Sauce Labs Bike Light" y haz clic en su botón interno de agregar al carrito
        const bikeLight = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Bike Light' });
        //Click en botón interno de agregar al carrito
        await bikeLight.locator('button').click();
    });
    test('Ejercicio 26', async ({ page }) => {
        //Ingresamos a la pagina sauce demo
        await page.locator('[data-test="login-button"]').click();
        //Desde #inventory_container, encadena la búsqueda hasta encontrar todos los elementos con la clase .inventory_item_price.
        const precios = page.locator('#inventory_container').locator('.inventory_item_price');
    });
    test('Ejercicio 27', async ({ page }) => {
        //Ingresamos a la pagina sauce demo
        await page.locator('[data-test="login-button"]').click();
        //Filtra el producto "Sauce Labs Fleece Jacket" y encadena la búsqueda para verificar que su precio sea "$49.99".
        const fleeceJacket = page.locator('.inventory_item').filter({hasText: 'Sauce Labs Fleece Jacket'});
        // Encadenamos la búsqueda del precio dentro de ese producto y validamos que sea "$49.99"
        await expect(fleeceJacket.locator('.inventory_item_price')).toHaveText('$49.99');      
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

test.describe('PARTE 2 NIVEL INTERMEDIO: CARRITO Y NAVEGACION', {tag:['@cart-nav']}, () => {
    test.beforeEach(async ({ page }) =>{
        //Navegamos a la pagina sauce demo
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        // completamos usuario y pasword, y click en login
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
    });
    test('Ejercicio 28', async ({ page }) =>{
        //Agregamos 2 productos al carrito
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        //Encadenamos locators desde el contenedor .shopping_cart_container para verificar que la etiqueta .shopping_cart_badge muestre "2".
        const cart = page.locator('.shopping_cart_container').locator('.shopping_cart_badge');
        await expect(cart).toHaveText('2');
    });
    test('Ejercicio 29', async ({ page }) => {
        //Agregamos productos al carrito
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        //Vamos al carrito
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page).toHaveURL(/.*cart.html/);
        //filtra los ítems .cart_item buscando aquel que contenga el texto "Sauce Labs Backpack" y haz clic en su botón "Remove".
        const itemBackpack = page.locator('.cart_item').filter({hasText: 'Sauce Labs Backpack'});
        await itemBackpack.locator('button').click();
    });
    test('Ejercicio 30', async ({ page }) => {
        //Agregamos productos al carrito
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        //Vamos al carrito
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page).toHaveURL(/.*cart.html/);
        
        //Remueve todos los ítems del carrito y valida que .cart_item tenga un conteo (count()) igual a 0.
        const items = page.locator('.cart_item')
        // Mientras la cantidad de ítems sea mayor a 0, removemos el primero de la lista
        while (await items.count() > 0) {
            await items.first().locator('button').click(); // Hace click en el botón remove del primer producto
        }
        // Validamos que el conteo de .cart_item sea igual a 0
        await expect(items).toHaveCount(0);    
    });
    test('Ejercicio 31', async ({ page }) => {
        //Agregamos productos al carrito
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        //Vamos al carrito
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page).toHaveURL(/.*cart.html/);
        
        //Desde /cart.html, haz clic en el botón de rol button con nombre "Checkout" para navegar a la siguiente pantalla.
        await page.getByRole('button',{name:'Checkout'}).click();        
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

test.describe('PARTE 2 NIVEL INTERMEDIO: FORMULARIO CHECKOUT-STEP-ONE', {tag: ['@formCheckout1']}, () => {
    test.beforeEach(async ({ page }) =>{
        //Navegamos a la pagina sauce demo
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        // completamos usuario y pasword, y click en login
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        //Agregamos productos al carrito
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        //Vamos al carrito
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page).toHaveURL(/.*cart.html/);
    });
    test('Ejercicio 32', async ({ page }) => {
        //vamos al checkout-step-one
        await page.locator('[data-test="checkout"]').click();
        //Intenta hacer clic en "Continue" en /checkout-step-one.html sin llenar los campos y valida el mensaje de error con getByText('Error: First Name is required’).
        await page.locator('[data-test="continue"]').click();
        await expect(page.getByText('Error: First Name is required')).toBeVisible();
    });
    test('Ejercicio 33', async ({ page }) => {
        //vamos al checkout-step-one
        await page.locator('[data-test="checkout"]').click();
        //Completa los tres campos de información personal usando únicamente getByPlaceholder.
        await page.getByPlaceholder('First Name').fill('Pablo');
        await page.getByPlaceholder('Last Name').fill('Smith');
        await page.getByPlaceholder('Zip/Postal Code').fill('5016');        
    });
    test('Ejercicio 34', async ({ page }) => {
        //vamos al checkout-step-one
        await page.locator('[data-test="checkout"]').click();
        //En /checkout-step-one.html, presiona el botón "Cancel" usando getByRole y confirma el retorno a /cart.html.
        await page.getByRole('button', {name: 'Cancel'}).click();
        //Validamos retorno a /cart.html.
        await expect(page).toHaveURL(/.*cart.html/);    
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

test.describe('PARTE 2 NIVEL INTERMEDIO: FORMULARIO CHECKOUT-STEP-TWO & COMPLETE', {tag: ['@formCheckout2']}, ()=>{
    test.beforeEach(async ({ page }) =>{
        //Navegamos a la pagina sauce demo
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        // completamos usuario y pasword, y click en login
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        //Agregamos productos al carrito
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        //Vamos al carrito
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page).toHaveURL(/.*cart.html/);
        // Vamos al Checkout Paso 1 y rellenamos los campos obligatorios
        await page.locator('[data-test="checkout"]').click();
        await expect(page).toHaveURL(/.*checkout-step-one.html/);
        await page.locator('[data-test="firstName"]').fill('Juan');
        await page.locator('[data-test="lastName"]').fill('Pérez');
        await page.locator('[data-test="postalCode"]').fill('5000');
        await page.locator('[data-test="continue"]').click();
    });
    test('Ejercicio 35', async ({ page }) =>{
        //En /checkout-step-two.html, ubica el elemento .summary_subtotal_label y verifica que contenga el prefijo "Item total:".
        const itemTotal = page.locator('.summary_subtotal_label');
        await expect(itemTotal).toContainText('Item total:');
    });
    test('Ejercicio 36', async ({ page }) =>{
        //Validar la visibilidad del texto de impuesto .summary_tax_label
        const itemTax = page.locator('.summary_tax_label');
        await expect(itemTax).toBeVisible();
        await expect(itemTax).toContainText('Tax:');
    });
    test('Ejercicio 37', async ({ page }) =>{
        //Validar que el selector .summary_total_label esté visible.
        const summaryTotal = page.locator('.summary_total_label');
        await expect(summaryTotal).toBeVisible();
        await expect(summaryTotal).toContainText('Total:');
    });
    test('Ejercicio 38', async ({ page }) =>{
        //En /checkout-step-two.html, presiona el botón "Finish" usando getByRole('button', { name: 'Finish' }).
        await page.getByRole('button',{name: 'finish'}).click();
    });
    test('Ejercicio 39', async ({ page }) =>{
        //Finalizamos la compra con el boton "Finish"
        await page.getByRole('button',{name: 'finish'}).click();
        await expect(page).toHaveURL(/.*checkout-complete.html/);
        //En /checkout-complete.html, valida el texto secundario "Your order has been dispatched".
        const orderComplete = page.locator('.checkout_complete_container');
        await expect(orderComplete).toBeVisible();
        await expect(orderComplete).toContainText('Your order has been dispatched');
    });
    test('Ejercicio 40', async ({ page }) =>{
        //Finalizamos la compra con el boton "Finish"
        await page.getByRole('button',{name: 'finish'}).click();
        await expect(page).toHaveURL(/.*checkout-complete.html/);
        //En /checkout-complete.html, presiona el botón "Back Home" y confirma el retorno a /inventory.html.
        await page.locator('[data-test="back-to-products"]').click();
        await expect(page).toHaveURL(/.*inventory.html/);
    });
});

test.describe('PARTE 3: NIVEL AVANZADO: MENÚ LATERAL & ACCESIBILIDAD', {tag:['@menuLateral']}, () =>{
    test.beforeEach(async ({ page }) =>{
        //Navegamos a la pagina sauce demo
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');

        // completamos usuario y pasword, y click en login
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        await expect(page).toHaveURL(/.*inventory.html/);
    });
    test('Ejercicio 41', async ({ page }) =>{
        // En /inventory.html, abre el menú lateral haciendo clic en el botón con ID #react-burger-menu-btn.
        await page.locator('#react-burger-menu-btn').click()
    });
    test('Ejercicio 42', async ({ page }) =>{
        // Abrimos menu hamburguesa
        await page.locator('#react-burger-menu-btn').click()
        //Localizamos el enlace Logout. NOTA:
        // El elemento tiene role="button" explícito. Ese atributo sobrescribe el rol implícito de <a href>, así que para Playwright no es un link,
        // es un button. Por eso getByRole('link', { name: 'Logout' }) no lo encuentra
        const linkLogout = page.getByRole('button', { name: 'Logout' });
        await expect(linkLogout).toBeVisible();    
        //Hacemos click en link Logout
        await linkLogout.click();
    });
        test('Ejercicio 43', async ({ page }) =>{
        // Abrimos menu hamburguesa
        await page.locator('#react-burger-menu-btn').click()
        //Localizamos el enlace Reset App State.
        const resetApp = page.getByRole('button', { name: 'Reset App State' });
        await expect(resetApp).toBeVisible();    
        //Hacemos click en link Logout
        await resetApp.click();
    });

});