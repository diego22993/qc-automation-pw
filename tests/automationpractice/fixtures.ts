import { expect, test as base } from "@playwright/test";
import { PracticeTestLoginPage } from "../../pages/practicetestautomation/PracticeTestLoginPage";

type AutomationPracticeFixtures = {
  loginPage: PracticeTestLoginPage;
};

export const test = base.extend<AutomationPracticeFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new PracticeTestLoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
});

export { expect };
