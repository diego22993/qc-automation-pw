import { test, expect } from '@playwright/test';

test.describe('Ejercicios en Login - Nivel básico', { tag: ['@login'] }, () => {

    test.beforeEach(async ({ page }) => {
        // Ingreso a la plataforma y verificación de URL
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test('Ejercicio 1', async ({ page }) => {
        // Descripción: (getByPlaceholder): Completa el campo de usuario escribiendo standard_user identificándolo por su placeholder.

        const username = page.getByPlaceholder('Username');
        await username.fill('standard_user');
        await expect(username).toHaveValue('standard_user');
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

test.describe('Ejercicios en Inventario - Nivel básico', { tag: ['@inventario'] }, () => {
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
        // Descripción: 
    });

    test('Ejercicio 11', async ({ page }) => {
        // Descripción: 
    });

    test('Ejercicio 12', async ({ page }) => {
        // Descripción: 
    });

});

test.describe('Ejercicios en Carrito - Nivel básico', { tag: ['@carrito'] }, () => {
    test('Ejercicio 13', async ({ page }) => { });
    test('Ejercicio 14', async ({ page }) => { });
    test('Ejercicio 15', async ({ page }) => { });
});

test.describe('Ejercicios en Checkout-step-one - Nivel básico', { tag: ['@checkout-one'] }, () => {
    test('Ejercicio 16', async ({ page }) => { });
    test('Ejercicio 17', async ({ page }) => { });
    test('Ejercicio 18', async ({ page }) => { });
});

test.describe('Ejercicios en Checkout-step-two - Nivel básico', { tag: ['@checkout-two'] }, () => {
    test('Ejercicio 19', async ({ page }) => { });
    test('Ejercicio 20', async ({ page }) => { });
});

test.describe('Ejercicios en Login e Inventario - Nivel intermedio', { tag: ['@LoginInventario'] }, () => {

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

    test('Ejercicio 21', async ({ page }) => {
        // Descripcion: (CSS Atributo Personalizado): Selecciona el botón de login usando el atributo de test nativo [data-test="login-button"].

        await page.locator('[data-test="login-button"]').click();
        await page.pause();
    });

    test('Ejercicio 22', async ({ page }) => {
        // Descripcion: (getByRole Combobox): En /inventory.html, selecciona la opción de ordenamiento "Price (low to high)" interactuando con el selector de rol combobox.
        await page.getByRole('combobox').selectOption('lohi');
        await page.pause();
    });

    test('Ejercicio 23', async ({ page }) => {
        // Descripcion: (getByRole Combobox): Cambia el ordenamiento a "Name (Z to A)" comprobando que el valor cambie a za.



    });

    test('Ejercicio 24', async ({ page }) => {
        // Descripcion: (filter() + getByText): Filtra los bloques de productos .inventory_item para obtener únicamente el que contiene el texto "Sauce Labs Onesie".

    });

    test('Ejercicio 25', async ({ page }) => {
        // Descripcion:  (.filter() + Acción): Filtra la tarjeta del producto "Sauce Labs Bike Light" y haz clic en su botón interno de agregar al carrito.

    });

    test('Ejercicio 26', async ({ page }) => {
        // Descripcion: (Encadenamiento en Inventario): Desde #inventory_container, encadena la búsqueda hasta encontrar todos los elementos con la clase .inventory_item_price.

    });

    test('Ejercicio 27', async ({ page }) => {
        // Descripcion: (Validación de Precio con Chaining): Filtra el producto "Sauce Labs Fleece Jacket" y encadena la búsqueda para verificar que su precio sea "$49.99".

    });

});

test.describe('Ejercicios en Carrito y Navegación - Nivel intermedio', { tag: ['@carrito'] }, () => {
    test('Ejercicio 28', async ({ page }) => { });
    test('Ejercicio 29', async ({ page }) => { });
    test('Ejercicio 30', async ({ page }) => { });
    test('Ejercicio 31', async ({ page }) => { });
});

test.describe('Ejercicios en Checkout-step-one - Nivel intermedio', { tag: ['@checkout-one'] }, () => {
    test('Ejercicio 32', async ({ page }) => { });
    test('Ejercicio 33', async ({ page }) => { });
    test('Ejercicio 34', async ({ page }) => { });
});

test.describe('Ejercicios en Checkout-step-two - Nivel intermedio', { tag: ['@checkout-two'] }, () => {
    test('Ejercicio 35', async ({ page }) => { });
    test('Ejercicio 36', async ({ page }) => { });
    test('Ejercicio 37', async ({ page }) => { });
    test('Ejercicio 38', async ({ page }) => { });
    test('Ejercicio 39', async ({ page }) => { });
    test('Ejercicio 40', async ({ page }) => { });
});

test.describe('Ejercicios en Menú lateral y Accesibilidad - Nivel avanzado', { tag: ['@menu-accessibility'] }, () => {
    test('Ejercicio 41', async ({ page }) => { });
    test('Ejercicio 42', async ({ page }) => { });
    test('Ejercicio 43', async ({ page }) => { });

});

test.describe('Ejercicios en Manipulación avanzada de colecciones - Nivel avanzado', { tag: ['@collection-manipulation'] }, () => {
    test('Ejercicio 44', async ({ page }) => { });
    test('Ejercicio 45', async ({ page }) => { });
    test('Ejercicio 46', async ({ page }) => { });
    test('Ejercicio 47', async ({ page }) => { });
});

test.describe('Ejercicios en Validación estricta end-to-end (E2E) por pantallas', { tag: ['@e2e-validation'] }, () => {
    test('Ejercicio 48', async ({ page }) => { });
    test('Ejercicio 49', async ({ page }) => { });
    test('Ejercicio 50', async ({ page }) => { });
    test('Ejercicio 51', async ({ page }) => { });
    test('Ejercicio 52', async ({ page }) => { });
});

test.describe('Ejercicios en Flujos completos integrales - Nivel avanzado', { tag: ['@full-flows'] }, () => {
    test('Ejercicio 53', async ({ page }) => { });
    test('Ejercicio 54', async ({ page }) => { });
    test('Ejercicio 55', async ({ page }) => { });
    test('Ejercicio 56', async ({ page }) => { });
    test('Ejercicio 57', async ({ page }) => { });
    test('Ejercicio 58', async ({ page }) => { });
    test('Ejercicio 59', async ({ page }) => { });
    test('Ejercicio 60', async ({ page }) => { });
});