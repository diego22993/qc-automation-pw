
import { Page, Locator, expect } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingSearchPage extends BookingBasePage {

  // =====================================
  // LOCATORS
  // =====================================

  readonly destinationInput: Locator;
  readonly searchButton: Locator;
  readonly dateField: Locator;
  readonly occupancyButton: Locator;

  constructor(page: Page) {
    super(page);

    // Campo de destino
    this.destinationInput = page.locator('[name="ss"]');

    // Botón de búsqueda
    this.searchButton = page.getByRole('button', {
      name: /search|buscar/i
    });

    // Campo de fechas
    this.dateField = page.locator(
      '[data-testid="searchbox-dates-container"]'
    );

    // Selector de pasajeros
    this.occupancyButton = page.locator(
      '[data-testid="occupancy-config"]'
    );
  }

  // =====================================
  // CERRAR POPUP GENIUS
  // =====================================

  async closeGeniusPopup(): Promise<void> {

    const closeButton = this.page.getByRole('button', {
      name: /dismiss sign-in|close|cerrar/i
    });

    try {
      await closeButton.first().click({
        timeout: 3000
      });

      console.log('Popup cerrado');

    } catch {
      console.log('Popup no encontrado o no cerrado');
    }
  }

  // =====================================
  // SELECCIONAR DESTINO
  // =====================================

  
async selectDestination(destino: string): Promise<void> {

  console.log('Seleccionando destino:', destino);

  // 1. Verificar que el campo esté disponible
  await expect(this.destinationInput).toBeVisible();

  // 2. Ingresar el destino
  await this.destinationInput.fill(destino);

  // 3. Verificar el valor ingresado
  await expect(this.destinationInput).toHaveValue(destino);

  // 4. Buscar sugerencias
  const suggestions = this.page.getByRole('option');

  try {
    // Esperar a que aparezcan sugerencias
    await expect(suggestions.first()).toBeVisible({
      timeout: 15000
    });

    console.log(
      'Sugerencias encontradas:',
      await suggestions.count()
    );

    // Seleccionar la primera sugerencia
    await suggestions.first().click();

    console.log('Destino seleccionado correctamente');

  } catch (error) {

    console.log('No aparecieron sugerencias');

    console.log(
      'URL actual:',
      this.page.url()
    );

    console.log(
      'Listbox:',
      await this.page.getByRole('listbox').count()
    );

    console.log(
      'Autocomplete:',
      await this.page.locator(
        '[data-testid*="autocomplete"]'
      ).count()
    );

    // Detener para inspeccionar el estado real
    await this.page.pause();

    throw error;
  }
}

  

  // =====================================
  // SELECCIONAR FECHAS
  // =====================================


async selectDates(
  fechaInicio: string,
  fechaFin: string
): Promise<void> {

  console.log('Seleccionando fechas');

  // 1. Abrir solamente si está cerrado
  const expanded = await this.dateField.getAttribute(
    'aria-expanded'
  );

  if (expanded !== 'true') {
    await this.dateField.click();
  }

  // 2. Confirmar que está abierto
  await expect(this.dateField).toHaveAttribute(
    'aria-expanded',
    'true'
  );

  // 3. Localizar fechas
  const checkIn = this.page.locator(
    `[data-date="${fechaInicio}"]`
  );

  const checkOut = this.page.locator(
    `[data-date="${fechaFin}"]`
  );

  // 4. Seleccionar check-in
  await expect(checkIn.first()).toBeVisible({
    timeout: 10000
  });

  await checkIn.first().click();

  console.log('Check-in seleccionado:', fechaInicio);

  // 5. Seleccionar check-out
  await expect(checkOut.first()).toBeVisible({
    timeout: 10000
  });

  await checkOut.first().click();

  console.log('Check-out seleccionado:', fechaFin);

  // 6. Validar fechas seleccionadas
  const startDate = this.page.locator(
    '[data-testid="date-display-field-start"]'
  );

  const endDate = this.page.locator(
    '[data-testid="date-display-field-end"]'
  );

  await expect(startDate).not.toHaveText('Check-in date');
  await expect(endDate).not.toHaveText('Check-out date');

  console.log('Fechas seleccionadas correctamente');
}


  // =====================================
  // CONFIGURAR ADULTOS
  // =====================================

  async selectAdults(
    cantidad: number
  ): Promise<void> {

    if (!Number.isInteger(cantidad) || cantidad < 1) {
      throw new Error('Cantidad de adultos inválida');
    }

    // Abrir selector de pasajeros
    await this.occupancyButton.click();

    // Localizador provisional del contador
    const adultsInput = this.page.locator(
      '[data-testid="occupancy-popup"] input'
    ).first();

    const actual = Number(
      await adultsInput.inputValue()
    );

    // Botones provisionales
    const buttons = this.page.locator(
      '[data-testid="occupancy-popup"] button'
    );

    const difference = cantidad - actual;

    const button = difference > 0
      ? buttons.nth(1)
      : buttons.first();

    for (let i = 0; i < Math.abs(difference); i++) {
      await button.click();
    }

    console.log(
      `Adultos solicitados: ${cantidad}`
    );
  }

  // =====================================
  // BÚSQUEDA COMPLETA
  // =====================================

  async searchDestination(
    destino: string,
    fechaInicio: string,
    fechaFin: string,
    adultos: number = 2
  ): Promise<void> {

    // 1. Navegar a Booking.com
    await this.navigateToHome();

    // 2. Cerrar popup Genius
    await this.closeGeniusPopup();

    // 3. Completar y seleccionar destino
    await this.selectDestination(destino);

    // 4. Seleccionar fechas
    await this.selectDates(fechaInicio, fechaFin);

    // 5. Configurar adultos
    await this.selectAdults(adultos);

    // 6. Ejecutar búsqueda
    await this.searchButton.click();

    console.log('Búsqueda ejecutada');
  }
}

