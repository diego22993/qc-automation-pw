import { test, expect } from "@playwright/test";

// 1. EL GRUPO (Test Suite): Agrupa pruebas de un mismo tema
test.describe("Suite: Pruebas del Carrito", () => {
  // 2. CONFIGURACIÓN (BeforeEach): Se ejecuta ANTES de cada prueba
  test.beforeEach(async ({ page }) => {
    await test.step("Iniciar sesión en la tienda", async () => {
      await page.goto("https://www.saucedemo.com/");
      await page.getByPlaceholder("Username").fill("standard_user");
      await page.getByPlaceholder("Password").fill("secret_sauce");
      await page.getByRole("button", { name: "Login" }).click();
    });
  });

  // 3. LIMPIEZA (AfterEach): Se ejecuta DESPUÉS de cada prueba
  test.afterEach(async ({ page }) => {
    await test.step("Cerrar sesión al terminar", async () => {
      await page.getByRole("button", { name: "Open Menu" }).click();
      await page.getByRole("link", { name: "Logout" }).click();
    });
  });

  // 4. LAS PRUEBAS DIVIDIDAS EN PASOS (Test y Steps)
  test("Debe agregar un producto al carrito", async ({ page }) => {
    await test.step("Paso 1: Hacer clic en agregar al carrito", async () => {
      await page.getByRole("button", { name: "Add to cart" }).first().click();
    });

    await test.step("Paso 2: Validar que el contador marque 1", async () => {
      await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
    });
  });
});
