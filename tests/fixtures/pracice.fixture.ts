import { test as base, expect } from "@playwright/test";
import { PracticeTestLoginPage } from "../../pages/practice/PracticeTestLoginPage";

type PracticeFixtures = {
  practiceLoginPage: PracticeTestLoginPage;
};

export const test = base.extend<PracticeFixtures>({
  practiceLoginPage: async ({ page }, use) => {
    const practiceLoginPage = new PracticeTestLoginPage(page);
    await practiceLoginPage.goto();
    await use(practiceLoginPage);
  },
});

export { expect };
