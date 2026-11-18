import { test as base } from "@playwright/test";
import { AutomationPracticeLoggedInPage } from "../pages/automationpractice/AutomationPracticeLoggedInPage";
import { AutomationPracticeLoginPage } from "../pages/automationpractice/AutomationPracticeLoginPage";

type AutomationPracticeFixtures = {
  automationPracticeLoginPage: AutomationPracticeLoginPage;
  automationPracticeLoggedInPage: AutomationPracticeLoggedInPage;
};

export const test = base.extend<AutomationPracticeFixtures>({
  automationPracticeLoginPage: async ({ page }, use) => {
    const loginPage = new AutomationPracticeLoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  automationPracticeLoggedInPage: async ({ page }, use) => {
    await use(new AutomationPracticeLoggedInPage(page));
  },
});
