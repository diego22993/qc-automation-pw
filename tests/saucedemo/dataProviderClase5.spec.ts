import { test, expect } from "../../fixtures/saucedemo.fixture";
import { userDataProvider } from "../../utils/saucedemo/userDataProvider";

const users = userDataProvider();

test.describe(
  "SauceDemo - Pruebas de Autenticación Parametrizadas (Data Provider)",
  { tag: ["@saucedemo", "@auth", "@regression"] },

  () => {
    test.describe.configure({ mode: "serial" });

    users.forEach((user1) => {
      test(`Validar acceso para el escenario: ${user1.scenario}`, async ({
        sauceLoginPage,
      }) => {
        await test.step(`Ingresar credenciales para ${user1.scenario}`, async () => {
          await sauceLoginPage.login(user1.userName, user1.password);
        });

        await test.step("Verificar el resultado esperado según el tipo de usuario", async () => {
          if (user1.expectSuccess) {
            expect(await sauceLoginPage.getInventoryPageVisible()).toBeTruthy();
          } else {
            const errorMessage = await sauceLoginPage.getErrorMessage();

            expect(errorMessage).toContain(user1.msjError);
          }
        });
      });
    });

    test(
      "La fixture inicia sesión con el usuario estándar",
      { tag: "@smoke" },
      async ({ authenticatedInventoryPage }) => {
        expect(await authenticatedInventoryPage.getProductNames()).not.toHaveLength(
          0,
        );
      },
    );
  },
);


