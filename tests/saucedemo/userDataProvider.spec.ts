import { expect, test } from "@playwright/test";
import {
  loadSauceDemoUsers,
  loadUserData,
} from "../../utils/saucedemo/userDataProvider";

test.describe("SauceDemo user data provider", () => {
  test("carga escenarios de login válidos", () => {
    const users = loadUserData();

    expect(users).toHaveLength(4);
    expect(users.map((user) => user.scenario)).toEqual([
      "Usuario estándar",
      "Usuario bloqueado",
      "Usuario problemático",
      "Usuario con problema de rendimiento",
    ]);
  });

  test("incluye el resultado esperado para cada escenario", () => {
    const users = loadUserData();
    const lockedOutUser = users.find(
      (user) => user.userName === "locked_out_user",
    );

    expect(lockedOutUser).toEqual(
      expect.objectContaining({
        expectSuccess: false,
        msjError: "Epic sadface: Sorry, this user has been locked out.",
      }),
    );
  });

  test("carga usuarios desde el CSV", () => {
    expect(loadSauceDemoUsers()).toEqual([
      {
        username: "standard_user",
        password: "secret_sauce",
        expectedOutcome: "success",
      },
      {
        username: "locked_out_user",
        password: "secret_sauce",
        expectedOutcome: "locked_out",
      },
    ]);
  });
});
