import { expect, test } from "../fixtures/saucedemo.fixture";
import { loadSauceDemoLoginScenarios } from "../../utils/saucedemo/loginScenarioProvider";

test.describe(
  "SauceDemo - Fixture de login",
  { tag: ["@saucedemo", "@auth"] },
  () => {
    for (const scenario of loadSauceDemoLoginScenarios()) {
      const isSuccessfulLogin = scenario.expectedOutcome === "success";
      const testTitle = isSuccessfulLogin
        ? `Iniciar sesión con credenciales válidas (${scenario.username})`
        : `Validar error de login (${scenario.scenario})`;

      test(
        testTitle,
        isSuccessfulLogin ? { tag: "@smoke" } : {},
        async ({ sauceLoginPage }) => {
          if (isSuccessfulLogin) {
            await Promise.all([
              sauceLoginPage.waitForInventoryPage(),
              sauceLoginPage.login(scenario.username, scenario.password),
            ]);
            return;
          }

          await sauceLoginPage.login(scenario.username, scenario.password);
          await expect
            .poll(() => sauceLoginPage.getErrorMessage())
            .toContain(scenario.expectedError);
        },
      );
    }
  },
);