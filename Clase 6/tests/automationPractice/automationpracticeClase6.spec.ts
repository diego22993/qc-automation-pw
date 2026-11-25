import { expect } from "@playwright/test";
import { test } from "../fixtures/automationPractice.fixture";
import { loadAutomationPracticeDataProvider } from "../../utils/automationPractice/automationPracticeDataProvider";

test.describe(
  "Practice Test Automation - Login",
  { tag: ["@automation-practice", "@login", "@regression"] },
  () => {
    loadAutomationPracticeDataProvider().forEach((scenario) => {
      test(scenario.scenario, async ({ automationPracticeLoginPage }) => {
        await test.step(`Ingresar credenciales: ${scenario.scenario}`, async () => {
          await automationPracticeLoginPage.login(
            scenario.userName,
            scenario.password,
          );
        });

        await test.step("Verificar el resultado esperado", async () => {
          if (scenario.expectSuccess) {
            const loggedInPage =
              await automationPracticeLoginPage.goToLoggedInPage();
            expect(await loggedInPage.isSuccessUrl()).toBeTruthy();
            expect(
              (await loggedInPage.getSuccessMessage()).toLowerCase(),
            ).toContain("logged in");
            expect(await loggedInPage.isLogOutButtonVisible()).toBeTruthy();
          } else {
            expect(await automationPracticeLoginPage.getErrorMessage()).toBe(
              scenario.msjError,
            );
          }
        });
      });
    });
  },
);