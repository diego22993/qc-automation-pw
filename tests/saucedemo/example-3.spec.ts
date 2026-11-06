import { test, expect, Page } from "@playwright/test";

async function loginTo(page: Page): Promise<void> {
  await page.goto("https://www.saucedemo.com/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
}

test.describe("Suite: Pruebas del Carrito", () => {
  test.beforeEach(async ({ page }) => {
    await test.step("Iniciar sesión en la tienda", async () => {
      await loginTo(page);
    });
  });

  test.afterEach(async ({ page }) => {
    await test.step("Cerrar sesión al terminar", async () => {
      // 1. Abrir el menú lateral
      await page.getByRole("button", { name: "Open Menu" }).click();

      // 2. Definir el locator del enlace de logout

      const logoutLink = page.locator('[data-test="logout-sidebar-link"]');
      // 3. Garantizar que el menú terminó de desplegarse antes de hacer clic
      

      // 4. Ejecutar la acción de salida
      await logoutLink.click();
      await expect(page).toHaveURL("https://www.saucedemo.com/");
    });
  });

  test("Debe agregar al menos un producto al carrito", async ({ page }) => {
    await test.step("Paso 1: Hacer clic en agregar al carrito el primer elemento existente", async () => {
      await page.getByRole("button", { name: "Add to cart" }).first().click();
    });

    await test.step("Paso 2: Validar que el contador del carrito marque 1", async () => {
      await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
    });

    await test.step("Paso 3: Validar que el carrito contenga al menos un producto", async () => {
      const cartCount = await page
        .locator(".shopping_cart_badge")
        .textContent();
      expect(Number(cartCount)).toBeGreaterThanOrEqual(1);
    });
    await test.step("Paso 4: Abrir el carrito y validar que contenga productos", async () => {
      const cartItemBadge = await page.locator(".shopping_cart_badge");
      await cartItemBadge.click();
    });

    await test.step("Paso 5: Validar que el carrito se pueda vaciar", async () => {
      await page.getByRole("button", { name: "Remove" }).first().click();
      const cartItemsAfterRemove = await page.locator(".cart_item").count();
      expect(cartItemsAfterRemove).toBe(0);
    });
    await test.step("Paso 6: Validar que el contador del carrito desaparezca", async () => {
      await expect(page.locator(".shopping_cart_badge")).toHaveCount(0);
    });
    await test.step("Paso 7: Validar que el carrito esté vacío visualmente", async () => {
      const cartItems = await page.locator(".cart_item").count();
      expect(cartItems).toBe(0);
    });
  });
});
