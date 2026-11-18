import { test, expect } from "@playwright/test";
import { SauceLoginPage } from "../../pages/saucedemo/SauceLoginPage";
import { userDataProvider } from "../../utils/saucedemo/userDataProvider";

const users = userDataProvider();

test.describe(
  "SauceDemo - Pruebas de Autenticación Parametrizadas (Data Provider)",
  { tag: ["@saucedemo", "@auth", "@regression"] },

  () => {
    test.describe.configure({ mode: "serial" });

    users.forEach((user1) => {
      test(`Validar acceso para el escenario: ${user1.scenario}`, async ({
        page,
      }) => {
        const sauceLoginPage = new SauceLoginPage(page);

        await test.step("Paso 1: Abrir la página de inicio de sesión", async () => {
          await sauceLoginPage.goto();
        });

        await test.step(`Paso 2: Ingresar credenciales para ${user1.scenario}`, async () => {
          await sauceLoginPage.login(user1.userName, user1.password);
        });

        await test.step("Paso 3: Verificar el resultado esperado según el tipo de usuario", async () => {
          if (user1.expectSuccess) {
            expect(await sauceLoginPage.getInventoryPageVisible()).toBeTruthy();
          } else {
            const errorMessage = await sauceLoginPage.getErrorMessage();

            expect(errorMessage).toContain(user1.msjError);
          }
        });
      });
    });
  },
);


