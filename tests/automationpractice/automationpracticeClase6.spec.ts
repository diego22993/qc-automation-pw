import { expect, test } from "../../fixtures/automationpractice.fixture";
import { AutomationPracticeLoggedInPage } from "../../pages/automationpractice/AutomationPracticeLoggedInPage";
import { loadUserDataProvider } from "../../utils/automationpractice/userDataProvider";

test.describe(
  "Practice Test Automation - Login parametrizado",
  { tag: ["@automationpractice", "@auth", "@regression"] },
  () => {
    loadUserDataProvider().forEach((user) => {
      test(`Validar acceso para el escenario: ${user.scenario}`, async ({
        page,
        loginPage,
      }) => {
        await test.step(
          `Ingresar credenciales para ${user.scenario}`,
          async () => {
            await loginPage.login(user.userName, user.password);
          },
        );

        await test.step(
          "Verificar el resultado esperado según el escenario",
          async () => {
            if (user.expectSuccess) {
              const loggedInPage = new AutomationPracticeLoggedInPage(page);
              await loggedInPage.verifySuccessfulLogin();
            } else {
              await expect(loginPage.getErrorMessage()).toBeVisible();
              await expect(loginPage.getErrorMessage()).toHaveText(
                user.msjError,
              );
            }
          },
        );
      });
    });
  });
