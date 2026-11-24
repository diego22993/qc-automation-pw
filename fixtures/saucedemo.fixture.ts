import { expect, test as base } from "@playwright/test";
import { SauceInventoryPage } from "../pages/saucedemo/SauceInventoryPage";
import { SauceLoginPage } from "../pages/saucedemo/SauceLoginPage";
import { userDataProvider } from "../utils/saucedemo/userDataProvider";

type SauceDemoFixtures = {
  sauceLoginPage: SauceLoginPage;
  authenticatedInventoryPage: SauceInventoryPage;
};

function getStandardUser() {
  const standardUser = userDataProvider().find(
    (user) => user.userName === "standard_user",
  );

  if (!standardUser) {
    throw new Error(
      'No se encontró el escenario de login para "standard_user".',
    );
  }

  return standardUser;
}

export const test = base.extend<SauceDemoFixtures>({
  sauceLoginPage: async ({ page }, use) => {
    const sauceLoginPage = new SauceLoginPage(page);
    await sauceLoginPage.goto();
    await use(sauceLoginPage);
  },

  authenticatedInventoryPage: async ({ sauceLoginPage }, use) => {
    const standardUser = getStandardUser();
    await sauceLoginPage.login(standardUser.userName, standardUser.password);
    await sauceLoginPage.getInventoryPageVisible();
    await use(await sauceLoginPage.goToInventoryPage());
  },
});

export { expect };
