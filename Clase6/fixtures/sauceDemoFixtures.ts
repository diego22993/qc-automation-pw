
import { test as base } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { USERS } from '../data/users';

type SauceDemoFixtures = {

  loginPage: LoginPage;
  inventoryPage: InventoryPage;

};

export const test = base.extend<SauceDemoFixtures>({

  loginPage: async ({ page }, use) => {

    console.log('Preparando fixture loginPage');

    const loginPage = new LoginPage(page);

    await loginPage.open();

    await use(loginPage);

  },

  inventoryPage: async ({ page, loginPage }, use) => {

    console.log('Preparando fixture inventoryPage');

    await loginPage.login(
      USERS.standard.username,
      USERS.standard.password
    );

    await loginPage.validateSuccessfulLogin();

    const inventoryPage = new InventoryPage(page);

    await inventoryPage.validateInventoryPage();

    await use(inventoryPage);

  }

});

export { expect } from '@playwright/test';
