import { test, expect } from "@playwright/test";
import { SauceLoginPage } from "../../pages/saucedemo/SauceLoginPage";
import { loadUserDataProvider } from "../../utils/saucedemo/userDataProvider";

test.describe(
  "SauceDemo - Pruebas de Autenticación Parametrizadas (Data Provider)",
  { tag: ["@saucedemo-data-provider", "@auth", "@regression"] },
  () => {
    loadUserDataProvider().forEach((user) => {
      test(`Validar acceso para el escenario: ${user.scenario}`, async ({
        page,
      }) => {
        const sauceLoginPage = new SauceLoginPage(page);
        await test.step("Paso 1: Abrir la página de inicio de sesión", async () => {
          await sauceLoginPage.goto();
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
