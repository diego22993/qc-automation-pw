import { expect, test } from "./fixtures";
import { loadUserDataProvider } from "../../utils/saucedemo/userDataProvider";

test.describe(
  "SauceDemo - Pruebas de Autenticación Parametrizadas (Data Provider)",
  { tag: ["@saucedemo-data-provider", "@auth", "@regression"] },
  () => {
    loadUserDataProvider().forEach((user) => {
      test(`Validar acceso para el escenario: ${user.scenario}`, async ({
        loginPage,
      }) => {
        await test.step("Paso 1: Abrir la página de inicio de sesión", async () => {
          expect(await loginPage.isUsernameVisible()).toBeTruthy();
        });
        await test.step(`Paso 2: Ingresar credenciales para ${user.scenario}`, async () => {
          await loginPage.login(user.userName, user.password);
        });
        await test.step("Paso 3: Verificar el resultado esperado según el tipo de usuario", async () => {
          if (user.expectSuccess) {
            expect(await loginPage.getInventoryPageVisible()).toBeTruthy();
          } else {
            const errorMessage = await loginPage.getErrorMessage();
            expect(errorMessage).toContain(user.msjError);
          }
        });
      });
    });
  },
);
