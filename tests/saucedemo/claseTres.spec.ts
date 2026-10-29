import { test, expect } from '@playwright/test';

test.describe('Ejercicios en Login - Nivel básico', { tag: ['@login', '@básico'] }, () => {

    test.beforeEach(async ({ page }) => {
        // Ingreso a la plataforma y verificación de URL
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test('Ejercicio 1', async ({ page }) => {
        // Descripción: (getByPlaceholder): Completa el campo de usuario escribiendo standard_user identificándolo por su placeholder.

        await page.getByPlaceholder('Username').fill('standard_user');
        await expect(page.getByPlaceholder('Username')).toHaveValue('standard_user');
    });

    test('Ejercicio 2', async ({ page }) => {
        // Descripción: (getByPlaceholder): Completa el campo de contraseña escribiendo secret_sauce identificándolo por su placeholder.

        const password = page.getByPlaceholder('Password');
        await password.fill('secret_sauce');
        await expect(password).toHaveValue('secret_sauce');
    });

    test('Ejercicio 3', async ({ page }) => {
        // Descripción: (getByRole): Haz clic en el botón de login usando getByRole(button, { name: Login }).

        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test('Ejercicio 4', async ({ page }) => {
        // Descripción: (getByText): Intenta ingresar sin credenciales y valida que se muestre el texto de error "Epic sadface: Username is required".

        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
    });

    test('Ejercicio 5', async ({ page }) => {
        // Descripción: (CSS Selector ID): Completa el campo de usuario utilizando su ID directo(#user-name).

        const username = page.locator('#user-name');
        await username.fill('standard_user');
        await expect(username).toHaveValue('standard_user');
    });

    test('Ejercicio 6', async ({ page }) => {
        // Descripción: (CSS Selector ID): Completa el campo de contraseña usando su ID #password y presiona el botón #login-button.

        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
        await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
    });

});

test.describe('Ejercicios en Inventario - Nivel básico', { tag: ['@inventario', '@básico'] }, () => {

    test.beforeEach(async ({ page }) => {
        // Ingreso a la plataforma
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');

        // Login
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();

        // Verificar ubicación en Inventario
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('Ejercicio 7', async ({ page }) => {
        // Descripción: (getByRole - Heading): Tras iniciar sesión, verifica que exista un encabezado de nivel 1 o título visible con el texto "Swag Labs".

        await expect(page.getByText('Swag Labs', { exact: true })).toBeVisible();
        await expect(page.getByRole('heading', { level: 1 })).toHaveCount(0);
    });

    test('Ejercicio 8', async ({ page }) => {
        // Descripción: (getByText): Encuentra en el catálogo el producto "Sauce Labs Backpack" usando getByText.

        await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();

        // exact: true - El texto tiene que ser todo el contenido del elemento y debe coincidir exactamente.
    });

    test('Ejercicio 9', async ({ page }) => {
        // Descripción: (getByAltText): Ubica la imagen principal de la camiseta usando getByAltText('Sauce Labs Bolt T-Shirt’).

        await expect(page.getByAltText('Sauce Labs Bolt T-Shirt', { exact: true })).toBeVisible();
    });

    test('Ejercicio 10', async ({ page }) => {
        // Descripción: (.first()): Haz clic en el primer botón de agregar al carrito que aparezca en la lista usando .first().

        await page.getByRole('button', { name: 'Add to Cart' }).first().click();
        await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible(); // Se evalua que el botón cambia a "Remove"
    });

    test('Ejercicio 11', async ({ page }) => {
        // Descripción: (.last()): Haz clic en el último botón de agregar al carrito utilizando .last().

        await page.getByRole('button', { name: 'Add to Cart' }).last().click();
        await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible(); // Se evalua que el botón cambia a "Remove"
    });

    test('Ejercicio 12', async ({ page }) => {
        // Descripción: (.nth()): Selecciona el segundo producto de la lista (índice 1) y haz clic en la imagen del producto.

        // Cuando un locator encuentra varios elementos, .nth(i) se queda con uno solo según su posición. El índice empieza en 0.
        await page.locator('[data-test="inventory-item"]').nth(1).getByRole('img').click();
        await expect(page).toHaveURL(/inventory-item\.html/);
    });

});

test.describe('Ejercicios en Carrito - Nivel básico', { tag: ['@carrito', '@básico'] }, () => {

    test.beforeEach(async ({ page }) => {
        // Ingreso a la plataforma
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');

        // Login
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();

        // Verificar ubicación en Inventario
        await expect(page).toHaveURL(/.*inventory.html/);

        // Ingresar al carrito
        await page.getByRole('button', { name: 'Cart, empty' }).click();

        // Verificar ubicación en Carrito
        await expect(page).toHaveURL(/.*cart.html/);
    });

    test('Ejercicio 13', async ({ page }) => {
        // Descripción: (getByText): En /cart.html, verifica la presencia del título de columna "QTY".

        await expect(page.getByText('QTY', { exact: true })).toBeVisible();
    });

    test('Ejercicio 14', async ({ page }) => {
        // Descripción: (getByText): En /cart.html, verifica la presencia del título de columna "Description".

        await expect(page.getByText('Description', { exact: true })).toBeVisible();
    });

    test('Ejercicio 15', async ({ page }) => {
        // Descripción: (getByRole): Ubica el botón "Continue Shopping" usando getByRole por su nombre accesible.

        await expect(page.getByRole('button', { name: 'Continue Shopping', exact: true })).toBeVisible();
    });

});

test.describe('Ejercicios en Checkout-step-one - Nivel básico', { tag: ['@checkout-one', '@básico'] }, () => {

    test.beforeEach(async ({ page }) => {
        // Ingreso a la plataforma
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');

        // Login
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();

        // Verificar ubicación en Inventario
        await expect(page).toHaveURL(/.*inventory.html/);

        // Agregar un producto al carrito
        await page.getByRole('button', { name: 'Add to Cart' }).first().click();

        // Ingresar al carrito
        await page.locator('#shopping_cart_container').getByRole('button').click();

        // Verificar ubicación en Carrito
        await expect(page).toHaveURL(/.*cart.html/);

        // Ingresar a Checkout-step-one
        await page.getByRole('button', { name: 'Checkout' }).click();

        // Verificar ubicación en Checkout-step-one
        await expect(page).toHaveURL(/.*checkout-step-one\.html/);
    });

    test('Ejercicio 16', async ({ page }) => {
        // Descripción: (getByPlaceholder): Rellena el campo First Name usando su placeholder "First Name".

        await page.getByPlaceholder('First Name').fill('Azul');
        await expect(page.getByPlaceholder('First Name')).toHaveValue('Azul');
    });

    test('Ejercicio 17', async ({ page }) => {
        // Descripción: (getByPlaceholder): Rellena el campo Last Name usando su placeholder "Last Name".

        await page.getByPlaceholder('Last Name').fill('Vela');
        await expect(page.getByPlaceholder('Last Name')).toHaveValue('Vela');
    });

    test('Ejercicio 18', async ({ page }) => {
        // Descripción: (getByPlaceholder): Rellena el campo Zip/Postal Code usando su placeholder "Zip/Postal Code".

        await page.getByPlaceholder('Zip/Postal Code').fill('1234');
        await expect(page.getByPlaceholder('Zip/Postal Code')).toHaveValue('1234');
    });

});

test.describe('Ejercicios en Checkout-step-two - Nivel básico', { tag: ['@checkout-two', '@básico'] }, () => {

    test.beforeEach(async ({ page }) => {
        // Ingreso a la plataforma
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');

        // Login
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();

        // Verificar ubicación en Inventario
        await expect(page).toHaveURL(/.*inventory.html/);

        // Agregar un producto al carrito
        await page.getByRole('button', { name: 'Add to Cart' }).first().click();

        // Ingresar al carrito
        await page.locator('#shopping_cart_container').getByRole('button').click();

        // Verificar ubicación en Carrito
        await expect(page).toHaveURL(/.*cart.html/);

        // Ingresar a Checkout-step-one
        await page.getByRole('button', { name: 'Checkout' }).click();

        // Verificar ubicación en Checkout-step-one
        await expect(page).toHaveURL(/.*checkout-step-one\.html/);

        // Rellenar campos de Checkout-step-one
        await page.getByPlaceholder('First Name').fill('Azul');
        await page.getByPlaceholder('Last Name').fill('Vela');
        await page.getByPlaceholder('Zip/Postal Code').fill('1234');

        // Continuar a Checkout-step-two
        await page.getByRole('button', { name: 'Continue' }).click();

        // Verificar ubicación en Checkout-step-two
        await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    });

    test('Ejercicio 19', async ({ page }) => {
        // Descripción: (getByText): En /checkout-step-two.html, ubica el texto "Payment Information:".

        await expect(page.getByText('Payment Information:', { exact: true })).toBeVisible();
    });

    test('Ejercicio 20', async ({ page }) => {
        // Descripción: En /checkout-complete.html, valida que el título de agradecimiento sea un heading con texto "Thank you for your order!".

        await page.getByRole('button', { name: 'Finish' }).click();
        await expect(page.getByRole('heading', { name: 'Thank you for your order!', level: 2 })).toBeVisible();
    });

});

test.describe('Ejercicios en Login - Nivel intermedio', { tag: ['@login', '@intermedio'] }, () => {

    test.beforeEach(async ({ page }) => {
        // Ingreso a la plataforma
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test('Ejercicio 21', async ({ page }) => {
        // Descripcion: (CSS Atributo Personalizado): Selecciona el botón de login usando el atributo de test nativo [data-test="login-button"].

        await page.locator('[data-test="login-button"]').click();
        await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
    });

});

test.describe('Ejercicios en Inventario - Nivel intermedio', { tag: ['@inventario', '@intermedio'] }, () => {

    test.beforeEach(async ({ page }) => {
        // Ingreso a la plataforma
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');

        // Login
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();

        // Verificar ubicación en Inventario
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('Ejercicio 22', async ({ page }) => {
        // Descripcion: (getByRole Combobox): En /inventory.html, selecciona la opción de ordenamiento "Price (low to high)" interactuando con el selector de rol combobox.

        await page.getByRole('combobox').selectOption('lohi');
        await expect(page.locator('[data-test="active-option"]')).toHaveText('Price (low to high)'); // toHaveText solo funciona sobre un locator
    });

    test('Ejercicio 23', async ({ page }) => {
        // Descripcion: (getByRole Combobox): Cambia el ordenamiento a "Name (Z to A)" comprobando que el valor cambie a za.

        await page.getByRole('combobox').selectOption('za');
        await expect(page.locator('[data-test="active-option"]')).toHaveText('Name (Z to A)');
    });

    test('Ejercicio 24', async ({ page }) => {
        // Descripcion: (.filter() por Texto): Filtra los bloques de productos .inventory_item para obtener únicamente el que contiene el texto "Sauce Labs Onesie".

        // El locator da una lista de elementos, y .filter() deja pasar solo los que cumplen una condición.
        const producto = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Onesie' }); // Con .filter() llegamos a la tarjeta que contiene ese texto.
        await expect(producto).toHaveCount(1);
        await expect(producto).toBeVisible();
        await expect(producto.locator('.inventory_item_name')).toHaveText('Sauce Labs Onesie');
    });

    test('Ejercicio 25', async ({ page }) => {
        // Descripcion: (.filter() + Acción): Filtra la tarjeta del producto "Sauce Labs Bike Light" y haz clic en su botón interno de agregar al carrito.

        const producto = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Bike Light' });
        await producto.getByRole('button', { name: 'Add to cart' }).click();
        await expect(producto.getByRole('button', { name: 'Remove' })).toBeVisible(); // Verficamos que el botón cambie a "Remove"
    });

    test('Ejercicio 26', async ({ page }) => {
        // Descripcion: (Encadenamiento en Inventario): Desde #inventory_container, encadena la búsqueda hasta encontrar todos los elementos con la clase .inventory_item_price.

        const precios = page
            .locator('#inventory_container')
            .locator('[data-test="inventory-list"]')
            .locator('[data-test="inventory-item-description"]')
            .locator('.pricebar')
            .locator('.inventory_item_price');

        // const precios = page.locator('#inventory_container').locator('.inventory_item_price'); Lo que más sirve

        await expect(precios).toHaveCount(6);
    });

    test('Ejercicio 27', async ({ page }) => {
        // Descripcion: (Validación de Precio con Chaining): Filtra el producto "Sauce Labs Fleece Jacket" y encadena la búsqueda para verificar que su precio sea "$49.99".

        await expect(page.locator('[data-test="inventory-item"]').filter({ hasText: 'Sauce Labs Fleece Jacket' }).locator('[data-test="inventory-item-price"]')).toHaveText('$49.99');
    });

});

test.describe('Ejercicios en Carrito y Navegación - Nivel intermedio', { tag: ['@carrito', '@intermedio'] }, () => {

    test.beforeEach(async ({ page }) => {
        // Ingreso a la plataforma
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');

        // Login
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();

        // Verificar ubicación en Inventario
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('Ejercicio 28', async ({ page }) => {
        // Descripción: (Badge de Carrito): Agrega dos productos y encadena locators desde el contenedor .shopping_cart_container para verificar que la etiqueta .shopping_cart_badge muestre "2".

        // Agregar dos productos al carrito
        await page.getByRole('button', { name: 'Add to Cart' }).first().click();
        await page.getByRole('button', { name: 'Add to Cart' }).last().click();

        // Verificar que la etiqueta .shopping_cart_badge muestre "2"
        await expect(page.locator('.shopping_cart_container').locator('.shopping_cart_badge')).toHaveText('2');
    });

    test('Ejercicio 29', async ({ page }) => {
        // Descripción: (.filter() en Carrito): En /cart.html, filtra los ítems .cart_item buscando aquel que contenga el texto "Sauce Labs Backpack" y haz clic en su botón "Remove".

        // Agregar el producto "Sauce Labs Backpack" al carrito
        await page.locator('#add-to-cart-sauce-labs-backpack').click();

        // Ingresar al carrito y verificar ubicación en Carrito
        await page.locator('#shopping_cart_container').getByRole('button').click();
        await expect(page).toHaveURL(/cart\.html/);

        // Filtrar por el producto "Sauce Labs Backpack" y hacer clic en su botón "Remove"
        const producto = page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' });
        await producto.getByRole('button', { name: 'Remove' }).click();
        await expect(producto).toHaveCount(0); // Verificamos que el producto ya no esté en el carrito
    });

    test('Ejercicio 30', async ({ page }) => {
        // Descripción: (Lista vacía en Carrito): Remueve todos los ítems del carrito y valida que .cart_item tenga un conteo (count()) igual a 0.

        // Agregar dos productos al carrito
        await page.getByRole('button', { name: 'Add to Cart' }).first().click();
        await page.getByRole('button', { name: 'Add to Cart' }).last().click();

        // Ingresar al carrito y verificar ubicación en Carrito
        await page.locator('#shopping_cart_container').getByRole('button').click();
        await expect(page).toHaveURL(/cart\.html/);

        // Hacer clic en todos los botones "Remove"
        const botonesRemove = page.locator('.cart_item').getByRole('button', { name: 'Remove' });

        while (await botonesRemove.count() > 0) {
            const count = await botonesRemove.count();
            await botonesRemove.first().click();
            await expect(botonesRemove).toHaveCount(count - 1); // Se recomienda verificar que vaya disminyendo
        }

        // Validar que .cart_item tenga un conteo igual a 0
        await expect(page.locator('.cart_item')).toHaveCount(0);
    });

    test('Ejercicio 31', async ({ page }) => {
        // Descripción: (getByRole Navegación): Desde /cart.html, haz clic en el botón de rol button con nombre "Checkout" para navegar a la siguiente pantalla.

        // Agregar un producto al carrito
        await page.getByRole('button', { name: 'Add to Cart' }).first().click();

        // Ingresar al carrito y verificar ubicación en Carrito
        await page.locator('#shopping_cart_container').getByRole('button').click();
        await expect(page).toHaveURL(/cart\.html/);

        // Ingresar a Checkout-step-one y verificar ubicación en Checkout-step-one
        await page.getByRole('button', { name: 'Checkout' }).click();
        await expect(page).toHaveURL(/.*checkout-step-one\.html/);
    });

});

test.describe('Ejercicios en Checkout-step-one - Nivel intermedio', { tag: ['@checkout-one', '@intermedio'] }, () => {

    test.beforeEach(async ({ page }) => {
        // Ingreso a la plataforma
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');

        // Login
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();

        // Verificar ubicación en Inventario
        await expect(page).toHaveURL(/.*inventory.html/);

        // Agregar un producto al carrito
        await page.getByRole('button', { name: 'Add to Cart' }).first().click();

        // Ingresar al carrito
        await page.locator('#shopping_cart_container').getByRole('button').click();

        // Verificar ubicación en Carrito
        await expect(page).toHaveURL(/.*cart.html/);

        // Ingresar a Checkout-step-one
        await page.getByRole('button', { name: 'Checkout' }).click();

        // Verificar ubicación en Checkout-step-one
        await expect(page).toHaveURL(/.*checkout-step-one\.html/);
    });

    test('Ejercicio 32', async ({ page }) => {
        // Descripción: (Validación de Error en Formulario): Intenta hacer clic en "Continue" en /checkout-step-one.html sin llenar los campos y valida el mensaje de error con getByText('Error: First Name is required’).

        await page.getByRole('button', { name: 'Continue' }).click();
        await expect(page.getByText('Error: First Name is required', { exact: true })).toBeVisible();
    });

    test('Ejercicio 33', async ({ page }) => {
        // Descripción: (Llenado Completo con Placeholders): Completa los tres campos de información personal usando únicamente getByPlaceholder.

        await page.getByPlaceholder('First Name').fill('Azul');
        await page.getByPlaceholder('Last Name').fill('Vela');
        await page.getByPlaceholder('Zip/Postal Code').fill('1234');

        await expect(page.getByPlaceholder('First Name')).toHaveValue('Azul');
        await expect(page.getByPlaceholder('Last Name')).toHaveValue('Vela');
        await expect(page.getByPlaceholder('Zip/Postal Code')).toHaveValue('1234');
    });

    test('Ejercicio 34', async ({ page }) => {
        // Descripción: (Boton Cancelar): En /checkout-step-one.html, presiona el botón "Cancel" usando getByRole y confirma el retorno a /cart.html.

        await page.getByRole('button', { name: 'Cancel' }).click();
        await expect(page).toHaveURL(/cart\.html/);
    });

});

test.describe('Ejercicios en Checkout-step-two - Nivel intermedio', { tag: ['@checkout-two', '@intermedio'] }, () => {

    test.beforeEach(async ({ page }) => {
        // Ingreso a la plataforma
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');

        // Login
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();

        // Verificar ubicación en Inventario
        await expect(page).toHaveURL(/.*inventory.html/);

        // Agregar un producto al carrito
        await page.getByRole('button', { name: 'Add to Cart' }).first().click();

        // Ingresar al carrito
        await page.locator('#shopping_cart_container').getByRole('button').click();

        // Verificar ubicación en Carrito
        await expect(page).toHaveURL(/.*cart.html/);

        // Ingresar a Checkout-step-one
        await page.getByRole('button', { name: 'Checkout' }).click();

        // Verificar ubicación en Checkout-step-one
        await expect(page).toHaveURL(/.*checkout-step-one\.html/);

        // Rellenar campos de Checkout-step-one
        await page.getByPlaceholder('First Name').fill('Azul');
        await page.getByPlaceholder('Last Name').fill('Vela');
        await page.getByPlaceholder('Zip/Postal Code').fill('1234');

        // Continuar a Checkout-step-two
        await page.getByRole('button', { name: 'Continue' }).click();

        // Verificar ubicación en Checkout-step-two
        await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    });

    test('Ejercicio 35', async ({ page }) => {
        // Descripción: (Resumen Financiero - Item Total): En /checkout-step-two.html, ubica el elemento .summary_subtotal_label y verifica que contenga el prefijo "Item total:".

        await expect(page.locator('.summary_subtotal_label')).toHaveText(/^Item total:/); // ^ significa “empieza con”
    });

    test('Ejercicio 36', async ({ page }) => {
        // Descripción: (Resumen Financiero - Impuestos): Valida la visibilidad del texto de impuesto .summary_tax_label.

        await expect(page.locator('.summary_tax_label')).toContainText("Tax: $");
    });

    test('Ejercicio 37', async ({ page }) => {
        // Descripción: (Resumen Financiero - Total Final): Valida que el selector .summary_total_label esté visible.

        await expect(page.locator('.summary_total_label')).toBeVisible();
    });

    test('Ejercicio 38', async ({ page }) => {
        // Descripción: (Confirmación de Envío): En /checkout-step-two.html, presiona el botón "Finish" usando getByRole('button', { name: 'Finish' }).

        await page.getByRole('button', { name: 'Finish' }).click();
        await expect(page).toHaveURL(/checkout-complete.html/);
    });

    test('Ejercicio 39', async ({ page }) => {
        // Descripción: (Texto Descriptivo de Confirmación): En /checkout-complete.html, valida el texto secundario "Your order has been dispatched".

        await page.getByRole('button', { name: 'Finish' }).click();
        await expect(page.getByRole('heading', { name: 'Thank you for your order!', level: 2 })).toBeVisible();
    });

    test('Ejercicio 40', async ({ page }) => {
        // Descripción: (Botón Regreso al Inicio): En /checkout-complete.html, presiona el botón "Back Home" y confirma el retorno a /inventory.html.

        await page.getByRole('button', { name: 'Finish' }).click();
        await page.getByRole('button', { name: 'Back Home' }).click();
        await expect(page).toHaveURL(/inventory.html/);
    });

});

test.describe('Ejercicios en Menú lateral y Accesibilidad - Nivel avanzado', { tag: ['@menu', '@avanzado'] }, () => {
    test('Ejercicio 41', async ({ page }) => { });
    test('Ejercicio 42', async ({ page }) => { });
    test('Ejercicio 43', async ({ page }) => { });

});

test.describe('Ejercicios en Manipulación avanzada de colecciones - Nivel avanzado', { tag: ['@collection-manipulation', '@avanzado'] }, () => {
    test('Ejercicio 44', async ({ page }) => { });
    test('Ejercicio 45', async ({ page }) => { });
    test('Ejercicio 46', async ({ page }) => { });
    test('Ejercicio 47', async ({ page }) => { });
});

test.describe('Ejercicios en Validación estricta end-to-end (E2E) por pantallas', { tag: ['@e2e-validation', '@avanzado'] }, () => {
    test('Ejercicio 48', async ({ page }) => { });
    test('Ejercicio 49', async ({ page }) => { });
    test('Ejercicio 50', async ({ page }) => { });
    test('Ejercicio 51', async ({ page }) => { });
    test('Ejercicio 52', async ({ page }) => { });
});

test.describe('Ejercicios en Flujos completos integrales - Nivel avanzado', { tag: ['@full-flows', '@avanzado'] }, () => {
    test('Ejercicio 53', async ({ page }) => { });
    test('Ejercicio 54', async ({ page }) => { });
    test('Ejercicio 55', async ({ page }) => { });
    test('Ejercicio 56', async ({ page }) => { });
    test('Ejercicio 57', async ({ page }) => { });
    test('Ejercicio 58', async ({ page }) => { });
    test('Ejercicio 59', async ({ page }) => { });
    test('Ejercicio 60', async ({ page }) => { });
});