import { test, expect } from '@playwright/test';

test.describe('Clase 3 - basico - Ejercicio 01', () => {
  test("Usuario por placeholder", { tag: ['@clase3', '@basico', '@ejercicio01'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      const usuario = page.getByPlaceholder('Username', { exact: true });
      await usuario.fill('standard_user');
      await expect(usuario).toHaveValue('standard_user');
    });
  });
});

test.describe('Clase 3 - basico - Ejercicio 02', () => {
  test("Contraseña por placeholder", { tag: ['@clase3', '@basico', '@ejercicio02'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      const clave = page.getByPlaceholder('Password', { exact: true });
      await clave.fill('secret_sauce');
      await expect(clave).toHaveValue('secret_sauce');
    });
  });
});

test.describe('Clase 3 - basico - Ejercicio 03', () => {
  test("Login por rol", { tag: ['@clase3', '@basico', '@ejercicio03'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
  });
});

test.describe('Clase 3 - basico - Ejercicio 04', () => {
  test("Error sin credenciales", { tag: ['@clase3', '@basico', '@ejercicio04'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page.getByText('Epic sadface: Username is required', { exact: true })).toBeVisible();
    });
  });
});

test.describe('Clase 3 - basico - Ejercicio 05', () => {
  test("Usuario por ID", { tag: ['@clase3', '@basico', '@ejercicio05'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.locator('#user-name').fill('standard_user');
      await expect(page.locator('#user-name')).toHaveValue('standard_user');
    });
  });
});

test.describe('Clase 3 - basico - Ejercicio 06', () => {
  test("Contraseña y login por ID", { tag: ['@clase3', '@basico', '@ejercicio06'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.locator('#user-name').fill('standard_user');
      await page.locator('#password').fill('secret_sauce');
      await expect(page.locator('#password')).toHaveValue('secret_sauce');
      await page.locator('#login-button').click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
  });
});

test.describe('Clase 3 - basico - Ejercicio 07', () => {
  test("Título Swag Labs", { tag: ['@clase3', '@basico', '@ejercicio07'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await expect(page.getByText('Swag Labs', { exact: true })).toBeVisible();
    });
  });
});

test.describe('Clase 3 - basico - Ejercicio 08', () => {
  test("Producto por texto", { tag: ['@clase3', '@basico', '@ejercicio08'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    });
  });
});

test.describe('Clase 3 - basico - Ejercicio 09', () => {
  test("Imagen por texto alternativo", { tag: ['@clase3', '@basico', '@ejercicio09'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await expect(page.getByAltText('Sauce Labs Bolt T-Shirt', { exact: true })).toBeVisible();
    });
  });
});

test.describe('Clase 3 - basico - Ejercicio 10', () => {
  test("Primer botón para agregar", { tag: ['@clase3', '@basico', '@ejercicio10'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.getByRole('button', { name: 'Add to cart', exact: true }).first().click();
      await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
      await expect(page.locator('.inventory_item').first().getByRole('button', { name: 'Remove', exact: true })).toBeVisible();
    });
  });
});

test.describe('Clase 3 - basico - Ejercicio 11', () => {
  test("Último botón para agregar", { tag: ['@clase3', '@basico', '@ejercicio11'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.getByRole('button', { name: 'Add to cart', exact: true }).last().click();
      await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
      await expect(page.locator('.inventory_item').last().getByRole('button', { name: 'Remove', exact: true })).toBeVisible();
    });
  });
});

test.describe('Clase 3 - basico - Ejercicio 12', () => {
  test("Imagen del segundo producto", { tag: ['@clase3', '@basico', '@ejercicio12'] }, async ({ page }) => {
    await test.step('Preparar una sesión independiente', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
      await page.getByPlaceholder('Password', { exact: true }).fill('secret_sauce');
      await page.getByRole('button', { name: 'Login', exact: true }).click();
      await expect(page).toHaveURL(/\/inventory\.html$/);
    });
    await test.step('Resolver y verificar el ejercicio', async () => {
      await page.locator('.inventory_item').nth(1).getByRole('img').click();
      await expect(page).toHaveURL(/\/inventory-item\.html\?id=0$/);
      await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Bike Light');
    });
  });
});

test.describe('Clase 3 - basico - Ejercicio 13', () => {
  test("Columna QTY", { tag: ['@clase3', '@basico', '@ejercicio13'] }, async ({ page }) => {
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
      await expect(page.getByText('QTY', { exact: true })).toBeVisible();
    });
  });
});

test.describe('Clase 3 - basico - Ejercicio 14', () => {
  test("Columna Description", { tag: ['@clase3', '@basico', '@ejercicio14'] }, async ({ page }) => {
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
      await expect(page.getByText('Description', { exact: true })).toBeVisible();
    });
  });
});

test.describe('Clase 3 - basico - Ejercicio 15', () => {
  test("Botón Continue Shopping", { tag: ['@clase3', '@basico', '@ejercicio15'] }, async ({ page }) => {
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
      await expect(page.getByRole('button', { name: 'Continue Shopping', exact: true })).toBeVisible();
    });
  });
});

test.describe('Clase 3 - basico - Ejercicio 16', () => {
  test("Nombre por placeholder", { tag: ['@clase3', '@basico', '@ejercicio16'] }, async ({ page }) => {
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
      const campo = page.getByPlaceholder('First Name', { exact: true });
      await campo.fill('Hernán');
      await expect(campo).toHaveValue('Hernán');
    });
  });
});

test.describe('Clase 3 - basico - Ejercicio 17', () => {
  test("Apellido por placeholder", { tag: ['@clase3', '@basico', '@ejercicio17'] }, async ({ page }) => {
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
      const campo = page.getByPlaceholder('Last Name', { exact: true });
      await campo.fill('Zamora');
      await expect(campo).toHaveValue('Zamora');
    });
  });
});

test.describe('Clase 3 - basico - Ejercicio 18', () => {
  test("Código postal por placeholder", { tag: ['@clase3', '@basico', '@ejercicio18'] }, async ({ page }) => {
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
      const campo = page.getByPlaceholder('Zip/Postal Code', { exact: true });
      await campo.fill('5000');
      await expect(campo).toHaveValue('5000');
    });
  });
});

test.describe('Clase 3 - basico - Ejercicio 19', () => {
  test("Información de pago", { tag: ['@clase3', '@basico', '@ejercicio19'] }, async ({ page }) => {
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
      await expect(page.getByText('Payment Information:', { exact: true })).toBeVisible();
    });
  });
});

test.describe('Clase 3 - basico - Ejercicio 20', () => {
  test("Heading de agradecimiento", { tag: ['@clase3', '@basico', '@ejercicio20'] }, async ({ page }) => {
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
      await expect(page.getByRole('heading', { name: 'Thank you for your order!', exact: true })).toBeVisible();
    });
  });
});
