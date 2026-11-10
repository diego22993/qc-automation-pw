import {test, expect} from '@playwright/test';
import { LoginPage } from '../../Projects/sauceDemo/pages/login.page';
import { InventoryPage } from '../../Projects/sauceDemo/pages/inventory.page';

test.describe('Nivel Basico', {tag: ["@login", "@basico"]}, () => {
    test('Login' , async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateTo('https://www.saucedemo.com/');
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Login con error' , async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateTo('https://www.saucedemo.com/');
        await loginPage.login('', 'secret_sauce');
        await loginPage.expectErrorMessage('Epic sadface: Username is required');
    });
});

test.describe("Pruebas de Inventario", () => {
    test('Validad ordenamiento por precios de menor a mayor', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.navigateTo('https://www.saucedemo.com/');
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');



        await inventoryPage.sortByOption('lohi');
        
        const prices = await inventoryPage.getAllProductPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    });

});



