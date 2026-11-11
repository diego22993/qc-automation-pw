import {LoginPage} from '../../pages/saucedemo/LoginPage';
import {InventoryPage} from '../../pages/saucedemo/InventoryPage';
import {CartPage} from '../../pages/saucedemo/CartPage';
import { test, expect } from '@playwright/test';

test.describe('CLASE 5 POM: EJERCICIO 22 A 25', {tag: ['@login-inv']}, ()=> {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login("standard_user", "secret_sauce");
        await expect(page).toHaveURL(/.*inventory\.html/);
    });
    /*
    test('Ejercicio 21 POM', async ({ page}) => {
        //Login con usuario y contraseña correctos
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login("standard_user", "secret_sauce");
         
        const cartPage = new CartPage(page);
        await cartPage.goToCart();
        await expect(cartPage.page).toHaveURL("https://www.saucedemo.com/cart.html");
        await cartPage.checkoutButton.click();        
    });
    */

    test('Ejercicio 22 POM', async ({ page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.orderItem("hilo", "Price (high to low)");
        await inventoryPage.orderItem("lohi", "Price (low to high)");
    });
    
    test('Ejercicio 23 POM', async ({ page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.orderItem("az", "Name (A to Z)");
        await inventoryPage.orderItem("za", "Name (Z to A)");
    });
    test('Ejercicio 24 POM', async ({ page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.verifySingleVisibleItem('Sauce Labs Onesie');
    });

    test('Ejercicio 25 POM', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addItemToCart('Sauce Labs Bike Light');
        await inventoryPage.verifyCartBadge('1');
    });
});