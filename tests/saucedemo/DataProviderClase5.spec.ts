import { test, expect } from "@playwright/test";
import { SauceLoginPage } from "../../pages/saucedemo/SauceLoginPage";
import { loadSauceDemoUsers } from "../../utils/saucedemo/userDataProvider";

const users = loadSauceDemoUsers();

test.describe(
  "SauceDemo - Pruebas de Autenticación Parametrizadas (Data Provider)",

  { tag: ["@saucedemo", "@auth", "@regression"] },
  () => {
    users.forEach((user) => {
      test(`Validar acceso para el usuario: ${user.username}`, async ({
        page,
      }) => {
        const sauceLoginPage = new SauceLoginPage(page);
        await test.step("Paso 1: Abrir la página de inicio de sesión", async () => {
          await sauceLoginPage.goto();
        });
        await test.step(`Paso 2: Ingresar credenciales para ${user.username}`, async () => {
          await sauceLoginPage.login(user.username, user.password);
        });
        await test.step("Paso 3: Verificar el resultado esperado según el tipo de usuario", async () => {
          if (user.expectedOutcome === "success") {
            await sauceLoginPage.getInventoryPageVisible();
          } else {
            const errorMessage = await sauceLoginPage.getErrorMessage();
            expect(errorMessage).toContain("Sorry, this user has been locked out.");
          }
        });
      });
    });
  },
);
