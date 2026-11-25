import { test as base } from "@playwright/test";
import { SauceLoginPage } from "../../pages/saucedemo/SauceLoginPage";

type SauceDemoFixtures = {
  sauceDemoLoginPage: SauceLoginPage;
};

export const test = base.extend<SauceDemoFixtures>({
  sauceDemoLoginPage: async ({ page }, use) => {
    const loginPage = new SauceLoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
});
