import { expect, test } from "@playwright/test";
import { SauceLoginPage } from "../../pages/saucedemo/SauceLoginPage";
import { loadSauceDemoUsers } from "../../utils/saucedemo/userDataProvider";

const users = loadSauceDemoUsers();

test.describe(
  "SauceDemo - Pruebas de autenticación con Data Provider",
  { tag: ["@saucedemo", "@auth", "@regression"] },
  () => {
    for (const user of users) {
      test(`Validar acceso para el escenario: ${user.username}`, async ({ page }) => {
        const sauceLoginPage = new SauceLoginPage(page);

        await test.step("Paso 1: Abrir la página de inicio de sesión", async () => {
          await sauceLoginPage.goto();
        });

        await test.step(`Paso 2: Ingresar credenciales para ${user.username}`, async () => {
          await sauceLoginPage.login(user.username, user.password);
        });

        await test.step("Paso 3: Verificar el resultado esperado según el tipo de usuario", async () => {
          if (user.expectedOutcome === "success") {
            expect(await sauceLoginPage.getInventoryPageVisible()).toBeTruthy();
            return;
          }

          const errorMessage = await sauceLoginPage.getErrorMessage();
          expect(errorMessage).toContain("Sorry, this user has been locked out");
        });
      });
    }
  },
);
