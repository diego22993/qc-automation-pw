import { test, expect } from "@playwright/test";

test.describe(
  "SauceDemo - Flujo E2E de Compra (Refactorizado con getByRole)",
  {
    tag: ["@smoke", "@login", "@regresssion"],
  },
  () => {
    test(
      "Debería completar exitosamente el proceso de compra de 2 productos",
      { tag: ["@smoke", "@login", "@regresssion"] },
      async ({ page }) => {
        
        await test.step("Paso 1: Navegar a la página de inicio de sesión", async ({page}) => {
          await page.goto("https://www.saucedemo.com/");
          await expect(page).toHaveURL("https://www.saucedemo.com/");
        });

        // PASO 2: Autenticación
        await test.step("Paso 2: Iniciar sesión con credenciales válidas", async () => {
          await page.getByPlaceholder("Username").fill("standard_user");
          await page.getByPlaceholder("Password").fill("secret_sauce");
          await page.getByRole("button", { name: "Login" }).click();

          // Validaciones post-login
          await expect(page).toHaveURL(/.*inventory.html/);
          await expect(page.getByText("Products")).toBeVisible();

          await page.getByTestId("add-to-cart-sauce-labs-backpack");
          //.click();
          await page.getByRole("button", { name: "Add to cart" });
          //.click();
        });

        // PASO 3: Selección de Productos
        await test.step("Paso 3: Agregar 2 productos al carrito de compras", async () => {
          // Usamos getByRole buscando el botón 'Add to cart' específico para cada producto
          await page
            .locator(".inventory_item")
            .filter({ hasText: "Sauce Labs Backpack" })
            .getByRole("button", { name: "Add to cart" })
            .click();
          await page
            .locator(".inventory_item")
            .filter({ hasText: "Sauce Labs Bike Light" })
            .getByRole("button", { name: "Add to cart" })
            .click();

          // Validar contador del carrito
          const cartBadge = page.locator(".shopping_cart_badge");
          await expect(cartBadge).toHaveText("2");
        });

        // PASO 4: Verificación del Carrito
        await test.step("Paso 4: Ir al carrito y verificar los productos agregados", async () => {
          await page.locator(".shopping_cart_link").click();
          await expect(page).toHaveURL(/.*cart.html/);

          // Validar visibilidad de ítems en el carrito
          await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();
          await expect(page.getByText("Sauce Labs Bike Light")).toBeVisible();

          // Proceder al checkout usando el rol de botón/enlace correspondiente
          await page.getByRole("button", { name: "Checkout" }).click();
        });

        // PASO 5: Información del Cliente
        await test.step("Paso 5: Completar formulario con datos del comprador", async () => {
          await expect(page).toHaveURL(/.*checkout-step-one.html/);

          await page.getByPlaceholder("First Name").fill("Juan");
          await page.getByPlaceholder("Last Name").fill("Pérez");
          await page.getByPlaceholder("Zip/Postal Code").fill("5000");

          await page.getByRole("button", { name: "Continue" }).click();
        });

        // PASO 6: Confirmación y Pago
        await test.step("Paso 6: Revisar resumen de compra y finalizar orden", async () => {
          await expect(page).toHaveURL(/.*checkout-step-two.html/);

          await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();
          await expect(page.getByText("Sauce Labs Bike Light")).toBeVisible();

          await page.getByRole("button", { name: "Finish" }).click();
        });

        // PASO 7: Confirmación Final
        await test.step("Paso 7: Validar pantalla de confirmación de compra exitosa", async () => {
          await expect(page).toHaveURL(/.*checkout-complete.html/);

          const completeHeader = page.getByRole("heading", {
            name: "Thank you for your order!",
          });
          await expect(completeHeader).toBeVisible();
        });
      },
    );
  },
);
