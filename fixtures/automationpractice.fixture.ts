import { test as base } from "@playwright/test";
import { AutomationPracticeLoginPage } from "../pages/automationpractice/AutomationPracticeLoginPage";

type AutomationPracticeFixtures = {
  loginPage: AutomationPracticeLoginPage;
};

export const test = base.extend<AutomationPracticeFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new AutomationPracticeLoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
});

export { expect } from "@playwright/test";
