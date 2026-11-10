import { test } from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/LoginPage';
import { InventoryPage } from '../../pages/saucedemo/InventoryPage';

// Helper de login integrado según el diagrama de secuencia
async function loginToInventory(page: any): Promise<InventoryPage> {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.expectInventoryPage();

  return inventoryPage;
}

test.describe('SauceDemo: Secuencias de ejercicios 22-25', () => {

  test('Ejercicio 22: Ordenar por precio ascendente', async ({ page }) => {
    let inventoryPage: InventoryPage;

    await test.step('Preparar sesión', async () => {
      inventoryPage = await loginToInventory(page);
    });

    await test.step('Ordenar por Price (low to high)', async () => {
      await inventoryPage.sortBy('Price (low to high)', 'lohi');
    });
  });

  test('Ejercicio 23: Ordenar por nombre descendente', async ({ page }) => {
    let inventoryPage: InventoryPage;

    await test.step('Preparar sesión', async () => {
      inventoryPage = await loginToInventory(page);
    });

    await test.step('Ordenar por Name (Z to A)', async () => {
      await inventoryPage.sortBy('Name (Z to A)', 'za');
    });
  });

  test('Ejercicio 24: Filtrar Sauce Labs Onesie', async ({ page }) => {
    let inventoryPage: InventoryPage;

    await test.step('Preparar sesión', async () => {
      inventoryPage = await loginToInventory(page);
    });

    await test.step('Validar producto único Sauce Labs Onesie', async () => {
      await inventoryPage.expectOnlyProduct('Sauce Labs Onesie');
    });
  });

  test('Ejercicio 25: Agregar Bike Light y validar badge', async ({ page }) => {
    let inventoryPage: InventoryPage;

    await test.step('Preparar sesión', async () => {
      inventoryPage = await loginToInventory(page);
    });

    await test.step('Agregar Sauce Labs Bike Light al carrito', async () => {
      await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    });

    await test.step('Validar que el badge del carrito sea 1', async () => {
      await inventoryPage.expectCartCount(1);
    });
  });

});