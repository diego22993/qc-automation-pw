import { expect, test } from "./fixtures";

test.describe("Practice Test Automation - Login", () => {
  test("inicia sesión con credenciales válidas", async ({ page, loginPage }) => {
    await loginPage.login("student", "Password123");

    await expect(page).toHaveURL(/logged-in-successfully/);
    await expect(loginPage.getSuccessMessage()).toBeVisible();
    await expect(loginPage.getLogoutButton()).toBeVisible();
  });

  test("muestra un error con un usuario incorrecto", async ({ loginPage }) => {
    await loginPage.login("incorrectUser", "Password123");

    await expect(loginPage.getErrorMessage()).toBeVisible();
    await expect(loginPage.getErrorMessage()).toHaveText(
      "Your username is invalid!",
    );
  });

  test("muestra un error con una contraseña incorrecta", async ({ loginPage }) => {
    await loginPage.login("student", "incorrectPassword");

    await expect(loginPage.getErrorMessage()).toBeVisible();
    await expect(loginPage.getErrorMessage()).toHaveText(
      "Your password is invalid!",
    );
  });
});