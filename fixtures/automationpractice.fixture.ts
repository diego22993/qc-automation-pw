import { expect, test as base } from "@playwright/test";
import { AutomationPracticeLoginPage } from "../pages/automationpractice/AutomationPracticeLoginPage";

interface AutomationPracticeFixtures {
  loginPage: AutomationPracticeLoginPage;
}

export const test = base.extend<AutomationPracticeFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new AutomationPracticeLoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
});

export { expect };
