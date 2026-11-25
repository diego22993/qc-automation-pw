import { expect, test } from "../fixtures/pracice.fixture";
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
        async ({ page, practiceLoginPage }) => {
          await practiceLoginPage.login(
            scenario.username,
            scenario.password,
          );

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
            .poll(() => practiceLoginPage.getErrorMessage())
            .toBe(scenario.expectedError);
        },
      );
    }
  },
);
