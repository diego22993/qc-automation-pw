import { expect, test as base } from "@playwright/test";
import { SauceLoginPage } from "../pages/saucedemo/SauceLoginPage";

interface SauceDemoFixtures {
  sauceLoginPage: SauceLoginPage;
}

export const test = base.extend<SauceDemoFixtures>({
  sauceLoginPage: async ({ page }, use) => {
    const sauceLoginPage = new SauceLoginPage(page);
    await sauceLoginPage.goto();
    await use(sauceLoginPage);
  },
});

export { expect };
