import { test as base } from "@playwright/test";
import { AutomationPracticeLoginPage } from "../../pages/automationPractice/AutomationPracticeLoginPage";

type AutomationPracticeFixtures = {
  automationPracticeLoginPage: AutomationPracticeLoginPage;
};

export const test = base.extend<AutomationPracticeFixtures>({
  automationPracticeLoginPage: async ({ page }, use) => {
    const loginPage = new AutomationPracticeLoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
});
