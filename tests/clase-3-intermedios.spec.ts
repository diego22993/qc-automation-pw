import { test, expect } from '@playwright/test';

test.describe('Clase 3 - intermedio - Ejercicio 21', () => {
  test("Login por atributo data-test", { tag: ['@clase3', '@intermedio', '@ejercicio21'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.locator('[data-test="login-button"]').click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
  });
});

test.describe('Clase 3 - intermedio - Ejercicio 22', () => {
  test("Ordenar por precio ascendente", { tag: ['@clase3', '@intermedio', '@ejercicio22'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      const orden = page.getByRole('combobox');
      await orden.selectOption({ label: 'Price (low to high)' });
      await expect(orden).toHaveValue('lohi');
      await expect(page.locator('.inventory_item_price').first()).toHaveText('$7.99');
    });
  });
});

test.describe('Clase 3 - intermedio - Ejercicio 23', () => {
  test("Ordenar por nombre descendente", { tag: ['@clase3', '@intermedio', '@ejercicio23'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      const orden = page.getByRole('combobox');
      await orden.selectOption({ label: 'Name (Z to A)' });
      await expect(orden).toHaveValue('za');
    });
  });
});

test.describe('Clase 3 - intermedio - Ejercicio 24', () => {
  test("Filtrar Onesie", { tag: ['@clase3', '@intermedio', '@ejercicio24'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      const producto = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Onesie' });
      await expect(producto).toHaveCount(1);
      await expect(producto).toBeVisible();
    });
  });
});

test.describe('Clase 3 - intermedio - Ejercicio 25', () => {
  test("Agregar Bike Light con filtro", { tag: ['@clase3', '@intermedio', '@ejercicio25'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      const producto = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Bike Light' });
      await producto.getByRole('button', { name: 'Add to cart', exact: true }).click();
      await expect(producto.getByRole('button', { name: 'Remove', exact: true })).toBeVisible();
      await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });
  });
});

test.describe('Clase 3 - intermedio - Ejercicio 26', () => {
  test("Encadenar precios del inventario", { tag: ['@clase3', '@intermedio', '@ejercicio26'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      const precios = page.locator('#inventory_container').locator('.inventory_item_price');
      await expect(precios).toHaveCount(6);
      await expect(precios).toHaveText(['$29.99', '$9.99', '$15.99', '$49.99', '$7.99', '$15.99']);
    });
  });
});

test.describe('Clase 3 - intermedio - Ejercicio 27', () => {
  test("Precio de Fleece Jacket", { tag: ['@clase3', '@intermedio', '@ejercicio27'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      const producto = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Fleece Jacket' });
      await expect(producto.locator('.inventory_item_price')).toHaveText('$49.99');
    });
  });
});

test.describe('Clase 3 - intermedio - Ejercicio 28', () => {
  test("Badge de dos productos", { tag: ['@clase3', '@intermedio', '@ejercicio28'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
      await expect(page.locator('.shopping_cart_container').locator('.shopping_cart_badge')).toHaveText('2');
    });
  });
});

test.describe('Clase 3 - intermedio - Ejercicio 29', () => {
  test("Remover Backpack del carrito", { tag: ['@clase3', '@intermedio', '@ejercicio29'] }, async ({ page }) => {
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
      const producto = page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' });
      await producto.getByRole('button', { name: 'Remove', exact: true }).click();
      await expect(producto).toHaveCount(0);
      await expect(page.locator('.cart_item')).toHaveCount(1);
      await expect(page.getByText('Sauce Labs Bike Light', { exact: true })).toBeVisible();
    });
  });
});

test.describe('Clase 3 - intermedio - Ejercicio 30', () => {
  test("Vaciar carrito", { tag: ['@clase3', '@intermedio', '@ejercicio30'] }, async ({ page }) => {
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
      const items = page.locator('.cart_item');
      const cantidad = await items.count();
      for (let i = 0; i < cantidad; i++) {
        await items.first().getByRole('button', { name: 'Remove', exact: true }).click();
      }
      await expect(items).toHaveCount(0);
      expect(await items.count()).toBe(0);
      await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    });
  });
});

test.describe('Clase 3 - intermedio - Ejercicio 31', () => {
  test("Checkout por rol", { tag: ['@clase3', '@intermedio', '@ejercicio31'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page).toHaveURL(/\/cart\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.getByRole('button', { name: 'Checkout', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    });
  });
});

test.describe('Clase 3 - intermedio - Ejercicio 32', () => {
  test("Error por nombre vacío", { tag: ['@clase3', '@intermedio', '@ejercicio32'] }, async ({ page }) => {
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
      await page.getByRole('button', { name: 'Continue', exact: true }).click();
      await expect(page.getByText('Error: First Name is required', { exact: true })).toBeVisible();
      await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    });
  });
});

test.describe('Clase 3 - intermedio - Ejercicio 33', () => {
  test("Completar datos por placeholders", { tag: ['@clase3', '@intermedio', '@ejercicio33'] }, async ({ page }) => {
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
      await page.getByPlaceholder('Zip/Postal Code', { exact: true }).fill('5000');
      await expect(page.getByPlaceholder('First Name', { exact: true })).toHaveValue('Hernán');
      await expect(page.getByPlaceholder('Last Name', { exact: true })).toHaveValue('Zamora');
      await expect(page.getByPlaceholder('Zip/Postal Code', { exact: true })).toHaveValue('5000');
    });
  });
});

test.describe('Clase 3 - intermedio - Ejercicio 34', () => {
  test("Cancelar primer paso", { tag: ['@clase3', '@intermedio', '@ejercicio34'] }, async ({ page }) => {
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
    });
  });
});

test.describe('Clase 3 - intermedio - Ejercicio 35', () => {
  test("Subtotal del resumen", { tag: ['@clase3', '@intermedio', '@ejercicio35'] }, async ({ page }) => {
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
      await expect(page.locator('.summary_subtotal_label')).toContainText('Item total:');
    });
  });
});

test.describe('Clase 3 - intermedio - Ejercicio 36', () => {
  test("Impuesto del resumen", { tag: ['@clase3', '@intermedio', '@ejercicio36'] }, async ({ page }) => {
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
      await expect(page.locator('.summary_tax_label')).toBeVisible();
      await expect(page.locator('.summary_tax_label')).toContainText('Tax:');
    });
  });
});

test.describe('Clase 3 - intermedio - Ejercicio 37', () => {
  test("Total final del resumen", { tag: ['@clase3', '@intermedio', '@ejercicio37'] }, async ({ page }) => {
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
      await expect(page.locator('.summary_total_label')).toBeVisible();
      await expect(page.locator('.summary_total_label')).toContainText('Total:');
    });
  });
});

test.describe('Clase 3 - intermedio - Ejercicio 38', () => {
  test("Finalizar por rol", { tag: ['@clase3', '@intermedio', '@ejercicio38'] }, async ({ page }) => {
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
      await page.getByRole('button', { name: 'Finish', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-complete\.html$/);
      await expect(page.getByRole('heading', { name: 'Thank you for your order!', exact: true })).toBeVisible();
    });
  });
});

test.describe('Clase 3 - intermedio - Ejercicio 39', () => {
  test("Texto de despacho", { tag: ['@clase3', '@intermedio', '@ejercicio39'] }, async ({ page }) => {
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
      await page.getByRole('button', { name: 'Finish', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-complete\.html$/);
      await expect(page.getByRole('heading', { name: 'Thank you for your order!', exact: true })).toBeVisible();
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await expect(page.getByText('Your order has been dispatched', { exact: false })).toBeVisible();
    });
  });
});

test.describe('Clase 3 - intermedio - Ejercicio 40', () => {
  test("Regresar con Back Home", { tag: ['@clase3', '@intermedio', '@ejercicio40'] }, async ({ page }) => {
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
      await page.getByRole('button', { name: 'Finish', exact: true }).click();
      await expect(page).toHaveURL(/\/checkout-complete\.html$/);
      await expect(page.getByRole('heading', { name: 'Thank you for your order!', exact: true })).toBeVisible();
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.getByRole('button', { name: 'Back Home', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
      await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    });
  });
});
