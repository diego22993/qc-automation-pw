import { test, type Page } from "@playwright/test";
import { InventoryPage, SortOption } from "../../pages/saucedemo/InventoryPage";
import { LoginPage } from "../../pages/saucedemo/LoginPage";

const STANDARD_USER = "standard_user";
const PASSWORD = "secret_sauce";

/**
 * Helper compartido: inicia sesion con standard_user y devuelve el inventario cargado.
 */
async function loginToInventory(page: Page): Promise<InventoryPage> {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(STANDARD_USER, PASSWORD);
  await loginPage.expectInventoryPage();
  return new InventoryPage(page);
}

test.describe("SauceDemo - Ejercicios 22-25 (InventoryPage)", { tag: "@saucedemo" }, () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = await test.step("Iniciar sesion y cargar el inventario", async () =>
      loginToInventory(page),
    );
  });

  test("Ejercicio 22: ordenar por precio ascendente", async () => {
    await test.step("Seleccionar 'Price (low to high)' y verificar el valor 'lohi'", async () => {
      await inventoryPage.sortBy(SortOption.PriceLowToHigh, SortOption.PriceLowToHighValue);
    });
  });

  test("Ejercicio 23: ordenar por nombre descendente", async () => {
    await test.step("Seleccionar 'Name (Z to A)' y verificar el valor 'za'", async () => {
      await inventoryPage.sortBy(SortOption.NameZToA, SortOption.NameZToAValue);
    });
  });

  test("Ejercicio 24: filtrar Sauce Labs Onesie", async () => {
    await test.step("Verificar que una sola tarjeta visible coincide con 'Sauce Labs Onesie'", async () => {
      await inventoryPage.expectOnlyProduct("Sauce Labs Onesie");
    });
  });

  test("Ejercicio 25: agregar Bike Light y validar badge", async () => {
    await test.step("Agregar 'Sauce Labs Bike Light' desde su tarjeta", async () => {
      await inventoryPage.addProductToCart("Sauce Labs Bike Light");
    });

    await test.step("Verificar que el badge del carrito muestra 1", async () => {
      await inventoryPage.expectCartCount(1);
    });
  });
});
