import { test, expect } from '@playwright/test';

test.describe('Clase 3 - avanzado - Ejercicio 41', () => {
  test("Abrir menú lateral", { tag: ['@clase3', '@avanzado', '@ejercicio41'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.locator('#react-burger-menu-btn').click();
      await expect(page.locator('.bm-menu')).toBeVisible();
    });
  });
});

test.describe('Clase 3 - avanzado - Ejercicio 42', () => {
  test("Cerrar sesión desde menú", { tag: ['@clase3', '@avanzado', '@ejercicio42'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.locator('#react-burger-menu-btn').click();
      const salir = page.getByRole('link', { name: 'Logout', exact: true });
      await expect(salir).toBeVisible();
      await salir.click();
      await expect(page).toHaveURL('https://www.saucedemo.com/');
      await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeVisible();
    });
  });
});

test.describe('Clase 3 - avanzado - Ejercicio 43', () => {
  test("Reset App State", { tag: ['@clase3', '@avanzado', '@ejercicio43'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
      await page.locator('#react-burger-menu-btn').click();
      await page.getByText('Reset App State', { exact: true }).click();
      await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    });
  });
});

test.describe('Clase 3 - avanzado - Ejercicio 44', () => {
  test("Agregar posiciones alternadas", { tag: ['@clase3', '@avanzado', '@ejercicio44'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      const productos = page.locator('.inventory_item');
      for (const indice of [0, 2, 4]) {
        await productos.nth(indice).getByRole('button', { name: 'Add to cart', exact: true }).click();
        await expect(productos.nth(indice).getByRole('button', { name: 'Remove', exact: true })).toBeVisible();
      }
      await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
    });
  });
});

test.describe('Clase 3 - avanzado - Ejercicio 45', () => {
  test("Filtrar por botón interno", { tag: ['@clase3', '@avanzado', '@ejercicio45'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      const sinAgregar = page.locator('.inventory_item').filter({ has: page.getByRole('button', { name: 'Add to cart', exact: true }) });
      await expect(sinAgregar).toHaveCount(6);
    });
  });
});

test.describe('Clase 3 - avanzado - Ejercicio 46', () => {
  test("Conteo dinámico en carrito", { tag: ['@clase3', '@avanzado', '@ejercicio46'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      for (const indice of [0, 1, 2, 3]) {
        await page.locator('.inventory_item').nth(indice).getByRole('button', { name: 'Add to cart', exact: true }).click();
      }
      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page).toHaveURL(/\/cart\.html$/);
      await expect(page.locator('.cart_item')).toHaveCount(4);
    });
  });
});

test.describe('Clase 3 - avanzado - Ejercicio 47', () => {
  test("Productos de más de veinte dólares", { tag: ['@clase3', '@avanzado', '@ejercicio47'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      const productos = page.locator('.inventory_item');
      await expect(productos).toHaveCount(6);
      const caros: string[] = [];
      for (const producto of await productos.all()) {
        const precio = Number((await producto.locator('.inventory_item_price').innerText()).replace('$', ''));
        if (precio > 20) {
          const nombre = await producto.locator('.inventory_item_name').innerText();
          caros.push(nombre);
          await expect(productos.filter({ hasText: nombre })).toBeVisible();
        }
      }
      expect(caros).toEqual(['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket']);
    });
  });
});

test.describe('Clase 3 - avanzado - Ejercicio 48', () => {
  test("Navegar al detalle por alt", { tag: ['@clase3', '@avanzado', '@ejercicio48'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.getByAltText('Sauce Labs Backpack', { exact: true }).click();
      await expect(page).toHaveURL(/\/inventory-item\.html\?id=4$/);
      await expect(page.getByRole('button', { name: 'Back to products', exact: true })).toBeVisible();
    });
  });
});

test.describe('Clase 3 - avanzado - Ejercicio 49', () => {
  test("Agregar desde detalle y verificar Remove", { tag: ['@clase3', '@avanzado', '@ejercicio49'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
      await page.getByAltText('Sauce Labs Backpack', { exact: true }).click();
      await expect(page).toHaveURL(/\/inventory-item\.html\?id=4$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.getByRole('button', { name: 'Add to cart', exact: true }).click();
      await expect(page.getByRole('button', { name: 'Remove', exact: true })).toBeVisible();
      await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });
  });
});

test.describe('Clase 3 - avanzado - Ejercicio 50', () => {
  test("Orden A-Z y Z-A", { tag: ['@clase3', '@avanzado', '@ejercicio50'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.getByRole('combobox').selectOption('az');
      await expect(page.locator('.inventory_item_name').first()).toHaveText('Sauce Labs Backpack');
      await page.getByRole('combobox').selectOption('za');
      await expect(page.locator('.inventory_item_name').first()).toHaveText('Test.allTheThings() T-Shirt (Red)');
    });
  });
});

test.describe('Clase 3 - avanzado - Ejercicio 51', () => {
  test("Primer precio ascendente", { tag: ['@clase3', '@avanzado', '@ejercicio51'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.getByRole('combobox').selectOption('lohi');
      await expect(page.locator('#inventory_container').locator('.inventory_item').first().locator('.inventory_item_price')).toHaveText('$7.99');
    });
  });
});

test.describe('Clase 3 - avanzado - Ejercicio 52', () => {
  test("Primer precio descendente", { tag: ['@clase3', '@avanzado', '@ejercicio52'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.getByRole('combobox').selectOption('hilo');
      await expect(page.locator('#inventory_container').locator('.inventory_item').first().locator('.inventory_item_price')).toHaveText('$49.99');
    });
  });
});

test.describe('Clase 3 - avanzado - Ejercicio 53', () => {
  test("Compra simple de un producto", { tag: ['@clase3', '@avanzado', '@ejercicio53'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page).toHaveURL(/\/cart\.html$/);
      await expect(page.locator('.cart_item')).toHaveCount(1);
      await page.getByRole('button', { name: 'Checkout', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
      await page.getByPlaceholder('First Name', { exact: true }).fill('Hernán');
      await page.getByPlaceholder('Last Name', { exact: true }).fill('Zamora');
      await page.getByPlaceholder('Zip/Postal Code', { exact: true }).fill('5000');
      await page.getByRole('button', { name: 'Continue', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
      await expect(page.locator('.cart_item')).toHaveCount(1);
      await page.getByRole('button', { name: 'Finish', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-complete\.html$/);
      await expect(page.getByRole('heading', { name: 'Thank you for your order!', exact: true })).toBeVisible();
    });
  });
});

test.describe('Clase 3 - avanzado - Ejercicio 54', () => {
  test("Compra de tres productos con filtro", { tag: ['@clase3', '@avanzado', '@ejercicio54'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      const nombres = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Onesie'];
      for (const nombre of nombres) {
        await page.locator('.inventory_item').filter({ hasText: nombre }).getByRole('button', { name: 'Add to cart', exact: true }).click();
      }
      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page).toHaveURL(/\/cart\.html$/);
      await expect(page.locator('.cart_item')).toHaveCount(3);
      for (const nombre of nombres) {
        await expect(page.locator('.cart_item').filter({ hasText: nombre })).toBeVisible();
      }
      await page.getByRole('button', { name: 'Checkout', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
      await page.getByPlaceholder('First Name', { exact: true }).fill('Hernán');
      await page.getByPlaceholder('Last Name', { exact: true }).fill('Zamora');
      await page.getByPlaceholder('Zip/Postal Code', { exact: true }).fill('5000');
      await page.getByRole('button', { name: 'Continue', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
      await expect(page.locator('.cart_item')).toHaveCount(3);
      await page.getByRole('button', { name: 'Finish', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-complete\.html$/);
      await expect(page.getByRole('heading', { name: 'Thank you for your order!', exact: true })).toBeVisible();
    });
  });
});

test.describe('Clase 3 - avanzado - Ejercicio 55', () => {
  test("Modificar carrito antes de comprar", { tag: ['@clase3', '@avanzado', '@ejercicio55'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page).toHaveURL(/\/cart\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.locator('.cart_item').filter({ hasText: 'Sauce Labs Bike Light' }).getByRole('button', { name: 'Remove', exact: true }).click();
      await expect(page.locator('.cart_item')).toHaveCount(1);
      await page.getByRole('button', { name: 'Checkout', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
      await page.getByPlaceholder('First Name', { exact: true }).fill('Hernán');
      await page.getByPlaceholder('Last Name', { exact: true }).fill('Zamora');
      await page.getByPlaceholder('Zip/Postal Code', { exact: true }).fill('5000');
      await page.getByRole('button', { name: 'Continue', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
      await expect(page.locator('.cart_item')).toHaveCount(1);
      await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
      await page.getByRole('button', { name: 'Finish', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-complete\.html$/);
      await expect(page.getByRole('heading', { name: 'Thank you for your order!', exact: true })).toBeVisible();
    });
  });
});

test.describe('Clase 3 - avanzado - Ejercicio 56', () => {
  test("Corregir código postal faltante", { tag: ['@clase3', '@avanzado', '@ejercicio56'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page).toHaveURL(/\/cart\.html$/);
      await page.getByRole('button', { name: 'Checkout', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.getByPlaceholder('First Name', { exact: true }).fill('Hernán');
      await page.getByPlaceholder('Last Name', { exact: true }).fill('Zamora');
      await page.getByRole('button', { name: 'Continue', exact: true }).click();
      await expect(page.getByText('Error: Postal Code is required', { exact: true })).toBeVisible();
      await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
      await page.getByPlaceholder('Zip/Postal Code', { exact: true }).fill('5000');
      await page.getByRole('button', { name: 'Continue', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
      await page.getByRole('button', { name: 'Finish', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-complete\.html$/);
      await expect(page.getByRole('heading', { name: 'Thank you for your order!', exact: true })).toBeVisible();
    });
  });
});

test.describe('Clase 3 - avanzado - Ejercicio 57', () => {
  test("Cancelar segundo paso", { tag: ['@clase3', '@avanzado', '@ejercicio57'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page).toHaveURL(/\/cart\.html$/);
      await page.getByRole('button', { name: 'Checkout', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
      await page.getByPlaceholder('First Name', { exact: true }).fill('Hernán');
      await page.getByPlaceholder('Last Name', { exact: true }).fill('Zamora');
      await page.getByPlaceholder('Zip/Postal Code', { exact: true }).fill('5000');
      await page.getByRole('button', { name: 'Continue', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.getByRole('button', { name: 'Cancel', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
      await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    });
  });
});

test.describe('Clase 3 - avanzado - Ejercicio 58', () => {
  test("Navegación inversa", { tag: ['@clase3', '@avanzado', '@ejercicio58'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page).toHaveURL(/\/cart\.html$/);
      await page.getByRole('button', { name: 'Checkout', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.getByRole('button', { name: 'Cancel', exact: true }).click();
      await expect(page).toHaveURL(/\/cart\.html$/);
      await page.getByRole('button', { name: 'Continue Shopping', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
  });
});

test.describe('Clase 3 - avanzado - Ejercicio 59', () => {
  test("Datos de pago y envío", { tag: ['@clase3', '@avanzado', '@ejercicio59'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page).toHaveURL(/\/cart\.html$/);
      await page.getByRole('button', { name: 'Checkout', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
      await page.getByPlaceholder('First Name', { exact: true }).fill('Hernán');
      await page.getByPlaceholder('Last Name', { exact: true }).fill('Zamora');
      await page.getByPlaceholder('Zip/Postal Code', { exact: true }).fill('5000');
      await page.getByRole('button', { name: 'Continue', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await expect(page.locator('[data-test="payment-info-value"]')).toContainText('SauceCard');
      await expect(page.locator('[data-test="shipping-info-value"]')).toContainText('Free Pony Express Delivery!');
    });
  });
});

test.describe('Clase 3 - avanzado - Ejercicio 60', () => {
  test("Reto integrador", { tag: ['@clase3', '@avanzado', '@ejercicio60'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.getByRole('combobox').selectOption('lohi');
      const productos = page.locator('.inventory_item');
      await expect(productos.first().locator('.inventory_item_price')).toHaveText('$7.99');
      await expect(productos.last().locator('.inventory_item_price')).toHaveText('$49.99');
      await productos.first().getByRole('button', { name: 'Add to cart', exact: true }).click();
      await productos.last().getByRole('button', { name: 'Add to cart', exact: true }).click();
      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page).toHaveURL(/\/cart\.html$/);
      await page.locator('.cart_item').filter({ hasText: 'Sauce Labs Onesie' }).getByRole('button', { name: 'Remove', exact: true }).click();
      await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
      await page.getByRole('button', { name: 'Checkout', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
      await page.getByPlaceholder('First Name', { exact: true }).fill('Hernán');
      await page.getByPlaceholder('Last Name', { exact: true }).fill('Zamora');
      await page.getByPlaceholder('Zip/Postal Code', { exact: true }).fill('5000');
      await page.getByRole('button', { name: 'Continue', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
      await expect(page.locator('.cart_item')).toHaveCount(1);
      const caro = page.locator('.cart_item').filter({ hasText: 'Sauce Labs Fleece Jacket' });
      await expect(caro).toBeVisible();
      await expect(caro.locator('.inventory_item_price')).toHaveText('$49.99');
      await page.getByRole('button', { name: 'Finish', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-complete\.html$/);
      await expect(page.getByRole('heading', { name: 'Thank you for your order!', exact: true })).toBeVisible();
      await page.getByRole('button', { name: 'Back Home', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
      await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    });
  });
});
