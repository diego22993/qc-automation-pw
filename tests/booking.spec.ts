import { test, expect } from '@playwright/test';

test.describe('Flujo de búsqueda en Booking.com', () => {

  test('Debe buscar alojamiento para un destino específico', async ({ page }) => {
    // 1. Navegar a la página principal
    await page.goto('https://www.booking.com/', { waitUntil: 'domcontentloaded' });

    // 2. Gestionar banners y popups iniciales (cookies / login)
    // Aceptar cookies si aparece el botón
    const acceptCookiesBtn = page.locator('#onetrust-accept-btn-handler');
    if (await acceptCookiesBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await acceptCookiesBtn.click();
    }

    // Cerrar modal emergente de inicio de sesión si se muestra
    const closeSignInModal = page.locator('button[aria-label="Ignorar información de inicio de sesión"]');
    if (await closeSignInModal.isVisible({ timeout: 5000 }).catch(() => false)) {
      await closeSignInModal.click();
    }

    // 3. Ingresar destino en la barra de búsqueda
    const destinationInput = page.locator('input[name="ss"]');
    await destinationInput.waitFor({ state: 'visible' });
    await destinationInput.fill('Córdoba');

    // Esperar y seleccionar la primera opción del desplegable de sugerencias
    const firstOption = page.locator('[data-testid="autocomplete-result"]').first();
    await firstOption.waitFor({ state: 'visible', timeout: 5000 });
    await firstOption.click();

    // 4. Hacer clic en el botón de búsqueda
    const searchButton = page.locator('button[type="submit"]');
    await searchButton.click();

    // 5. Validaciones y Aserciones
    // Esperar a que cargue la lista de resultados
    const propertyCards = page.locator('[data-testid="property-card"]');
    await expect(propertyCards.first()).toBeVisible({ timeout: 15000 });

    // Validar que se muestre al menos un alojamiento disponible
    const count = await propertyCards.count();
    expect(count).toBeGreaterThan(0);
  });

});