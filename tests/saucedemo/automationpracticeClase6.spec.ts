import { expect } from "@playwright/test";
import { test } from "../../fixtures/automationPracticeFixtures";
import { loadAutomationPracticeLoginDataProvider } from "../../utils/automationpractice/automationPracticeLoginDataProvider";

test.describe(
  "Practice Test Automation - Login",
  { tag: ["@automationpractice", "@regression"] },
  () => {
    loadAutomationPracticeLoginDataProvider().forEach((loginData) => {
      test(
        `Validar login: ${loginData.scenario}`,
        async ({
          page,
          automationPracticeLoginPage,
          automationPracticeLoggedInPage,
        }) => {
        await test.step(`Ingresar credenciales para ${loginData.scenario}`, async () => {
          await automationPracticeLoginPage.login(
            loginData.userName,
            loginData.password,
          );
        });

        await test.step("Verificar el resultado esperado", async () => {
          if (loginData.expectSuccess) {
            await automationPracticeLoggedInPage.waitUntilLoaded();
            await expect(page).toHaveURL(/logged-in-successfully\/?/);
            await expect(
              automationPracticeLoggedInPage.successText,
            ).toBeVisible();
            await expect(
              automationPracticeLoggedInPage.logoutLink,
            ).toBeVisible();
          } else {
            expect(
              await automationPracticeLoginPage.getErrorMessage(),
            ).toBe(loginData.msjError);
          }
        });
        },
      );
    });
  },
);