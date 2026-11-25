
import { test, expect } from '../../Clase6/fixtures/sauceDemoFixtures';

test.describe('Clase 6 - SauceDemo Inventory', () => {

  test('TC06 - Validar acceso a Inventory', async ({ inventoryPage }) => {

    await inventoryPage.validateInventoryPage();

  });

  test('TC07 - Validar cantidad de productos', async ({ inventoryPage }) => {

    await inventoryPage.validateProductCount(6);

  });

  test('TC08 - Agregar un producto al carrito', async ({ inventoryPage }) => {

    await inventoryPage.addProductToCart(
      'Sauce Labs Backpack'
    );

    await inventoryPage.validateCartCount(1);

  });

  test('TC09 - Agregar dos productos al carrito', async ({ inventoryPage }) => {

    await inventoryPage.addProductToCart(
      'Sauce Labs Backpack'
    );

    await inventoryPage.addProductToCart(
      'Sauce Labs Bike Light'
    );

    await inventoryPage.validateCartCount(2);

  });

  test('TC10 - Ordenar productos por precio ascendente', async ({ inventoryPage }) => {

    await inventoryPage.sortProducts('lohi');

    const priceTexts = await inventoryPage.inventoryItems
      .locator('[data-test="inventory-item-price"]')
      .allTextContents();

    const prices = priceTexts.map(
      price => Number(price.replace('$', '').trim())
    );

    const sortedPrices = [...prices].sort(
      (a, b) => a - b
    );

    expect(prices).toHaveLength(6);

    expect(prices).toEqual(sortedPrices);

    console.log('Precios ordenados:', prices);

  });

  test('TC11 - Acceder al carrito', async ({ inventoryPage }) => {

    await inventoryPage.addProductToCart(
      'Sauce Labs Backpack'
    );

    await inventoryPage.openCart();

  });

  test('TC12 - Validar aislamiento del carrito', async ({ inventoryPage }) => {

    await expect(
      inventoryPage.cartBadge
    ).toHaveCount(0);

    console.log('El carrito comienza vacío');

  });

});
