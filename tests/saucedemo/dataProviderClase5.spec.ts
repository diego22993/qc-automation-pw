import { expect, test } from "../../fixtures/saucedemo.fixture";
import { loadUserDataProvider } from "../../utils/saucedemo/userDataProvider";

test.describe(
  "SauceDemo - Pruebas de Autenticación Parametrizadas (Data Provider)",
  { tag: ["@saucedemo-data-provider", "@auth", "@regression"] },
  () => {
    loadUserDataProvider().forEach((user) => {
      test(`Validar acceso para el escenario: ${user.scenario}`, async ({
        sauceLoginPage,
      }) => {
        await test.step("Paso 1: Verificar que el fixture abrió el login", async () => {
          expect(await sauceLoginPage.isUsernameVisible()).toBeTruthy();
        });
        await test.step(`Paso 2: Ingresar credenciales para ${user.scenario}`, async () => {
          await sauceLoginPage.login(user.userName, user.password);
        });
        await test.step("Paso 3: Verificar el resultado esperado según el tipo de usuario", async () => {
          if (user.expectSuccess) {
            expect(await sauceLoginPage.getInventoryPageVisible()).toBeTruthy();
          } else {
            const errorMessage = await sauceLoginPage.getErrorMessage();
            expect(errorMessage).toContain(user.msjError);
          }
        });
      });
    });
  },
);
