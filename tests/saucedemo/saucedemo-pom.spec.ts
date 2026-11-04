import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/LoginPage';
import { InventoryPage } from '../../pages/saucedemo/InventoryPage';
import { CartPage } from '../../pages/saucedemo/CartPage';
import { CheckoutInformationPage } from '../../pages/saucedemo/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../../pages/saucedemo/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../../pages/saucedemo/CheckoutCompletePage';

test.describe('SauceDemo con Page Object Model - Login', () => {
  test('Login exitoso con standard_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.expectLoaded();
  });

  test('Login bloqueado con locked_out_user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await loginPage.expectError('Sorry, this user has been locked out.');
  });

  test('Login sin usuario muestra error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', '');

    await loginPage.expectError('Username is required');
  });
});

test.describe('SauceDemo con Page Object Model - Inventario y compra', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectLoaded();
  });

  test('Muestra los 6 productos del inventario', async () => {
    await expect(inventoryPage.items).toHaveCount(6);
  });

  test('Ordena los productos por precio de menor a mayor', async () => {
    await inventoryPage.sortBy('lohi');

    const precios = await inventoryPage.getPrices();
    expect(precios).toEqual([...precios].sort((a, b) => a - b));
  });

  test('Agrega y quita un producto del carrito', async () => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.expectCartCount(1);

    await inventoryPage.removeFromCart('Sauce Labs Backpack');
    await inventoryPage.expectCartCount(0);
  });

  test('Quita un producto desde el carrito', async ({ page }) => {
    const cartPage = new CartPage(page);

    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.expectLoaded();

    await cartPage.removeProduct('Sauce Labs Backpack');
    await cartPage.expectItemCount(0);
  });

  test('Cierra sesión desde el menú lateral', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await inventoryPage.logout();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('Completa la compra de 2 productos y vuelve al inicio', async ({ page }) => {
    const cartPage = new CartPage(page);
    const informationPage = new CheckoutInformationPage(page);
    const overviewPage = new CheckoutOverviewPage(page);
    const completePage = new CheckoutCompletePage(page);

    await test.step('Agregar productos al carrito', async () => {
      await inventoryPage.addToCart('Sauce Labs Backpack');
      await inventoryPage.addToCart('Sauce Labs Bike Light');
      await inventoryPage.expectCartCount(2);
    });

    await test.step('Revisar el carrito', async () => {
      await inventoryPage.openCart();
      await cartPage.expectLoaded();
      await cartPage.expectProduct('Sauce Labs Backpack');
      await cartPage.expectProduct('Sauce Labs Bike Light');
      await cartPage.checkout();
    });

    await test.step('Completar datos del comprador', async () => {
      await informationPage.expectLoaded();
      await informationPage.fillCustomer('Juan', 'Pérez', '5000');
    });

    await test.step('Revisar el resumen y finalizar', async () => {
      await overviewPage.expectLoaded();
      await overviewPage.expectProduct('Sauce Labs Backpack');
      await overviewPage.expectProduct('Sauce Labs Bike Light');
      await expect(overviewPage.total).toBeVisible();
      await overviewPage.finish();
    });

    await test.step('Validar la confirmación y volver al inicio', async () => {
      await completePage.expectLoaded();
      await completePage.backHome();
      await inventoryPage.expectLoaded();
    });
  });
});
