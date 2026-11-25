import { expect, test } from "@playwright/test";
import { PracticeTestLoginPage } from "../../pages/practice/PracticeTestLoginPage";
import { loadPracticeLoginScenarios } from "../../utils/practice/practiceLoginScenarioProvider";

test.describe(
  "Practice Test Automation - Login",
  { tag: ["@practice-login", "@auth"] },
  () => {
    for (const scenario of loadPracticeLoginScenarios()) {
      const isSuccessfulLogin = scenario.expectedOutcome === "success";

      test(
        scenario.scenario,
        isSuccessfulLogin ? { tag: "@smoke" } : {},
        async ({ page }) => {
          const loginPage = new PracticeTestLoginPage(page);
          await loginPage.goto();
          await loginPage.login(scenario.username, scenario.password);

          if (isSuccessfulLogin) {
            await expect(page).toHaveURL(
              new RegExp(scenario.expectedUrlPart),
            );
            await expect(
              page.getByText(scenario.expectedMessage, { exact: true }),
            ).toBeVisible();
            await expect(
              page.getByRole("link", { name: "Log out", exact: true }),
            ).toBeVisible();
            return;
          }

          await expect
            .poll(() => loginPage.getErrorMessage())
            .toBe(scenario.expectedError);
        },
      );
    }
  },
);
