import { expect, test as base } from "@playwright/test";
import { SauceInventoryPage } from "../../pages/saucedemo/SauceInventoryPage";
import { SauceLoginPage } from "../../pages/saucedemo/SauceLoginPage";

type SauceDemoFixtures = {
  loginPage: SauceLoginPage;
  inventoryPage: SauceInventoryPage;
};

export const SAUCE_DEMO_CREDENTIALS = {
  standardUser: "standard_user",
  password: "secret_sauce",
} as const;

export const test = base.extend<SauceDemoFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new SauceLoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
  inventoryPage: async ({ loginPage }, use) => {
    await loginPage.login(
      SAUCE_DEMO_CREDENTIALS.standardUser,
      SAUCE_DEMO_CREDENTIALS.password,
    );
    await loginPage.getInventoryPageVisible();
    await use(await loginPage.goToInventoryPage());
  },
});

export { expect };
