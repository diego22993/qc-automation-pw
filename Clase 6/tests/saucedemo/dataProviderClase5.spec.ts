import { expect } from "@playwright/test";
import { test } from "../fixtures/sauceDemo.fixture";
import { loadUserDataProvider } from "../../utils/saucedemo/userDataProvider";

test.describe(
  "SauceDemo - Pruebas de Autenticación Parametrizadas (Data Provider)",
  { tag: ["@saucedemo-data-provider", "@auth", "@regression"] },
  () => {
    loadUserDataProvider().forEach((user) => {
      test(`Validar acceso para el escenario: ${user.scenario}`, async ({
        sauceDemoLoginPage,
      }) => {
        await test.step(`Paso 2: Ingresar credenciales para ${user.scenario}`, async () => {
          await sauceDemoLoginPage.login(user.userName, user.password);
        });
        await test.step("Paso 3: Verificar el resultado esperado según el tipo de usuario", async () => {
          if (user.expectSuccess) {
            expect(
              await sauceDemoLoginPage.getInventoryPageVisible(),
            ).toBeTruthy();
          } else {
            const errorMessage = await sauceDemoLoginPage.getErrorMessage();
            expect(errorMessage).toContain(user.msjError);
          }
        });
      });
    });
  },
);
