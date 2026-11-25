import { loadPracticeLoginScenarios } from "../../utils/practice/practiceLoginScenarioProvider";
import { expect, test } from "../fixtures/practice.fixture";

test.describe(
  "Practice Test Automation - Login",
  { tag: ["@practice-login", "@auth"] },
  () => {
    for (const scenario of loadPracticeLoginScenarios()) {
      const isSuccessfulLogin = scenario.expectedOutcome === "success";
      const testTitle = isSuccessfulLogin
        ? `Iniciar sesión con credenciales válidas (${scenario.username})`
        : `Validar error de login (${scenario.scenario})`;

      test(
        testTitle,
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
            return;
          }

          await expect
            .poll(() => practiceLoginPage.getErrorMessage())
            .toContain(scenario.expectedError);
        },
      );
    }
  },
);
