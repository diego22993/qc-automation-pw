
import { Page, Locator, expect } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingDetailPage extends BookingBasePage {

  readonly hotelTitle: Locator;

  constructor(page: Page) {
    super(page);

    // Posibles selectores del título del alojamiento
    this.hotelTitle = page.locator(
      '#hp_hotel_name, [data-testid="title"]'
    ).first();
  }

  async validateHotelTitle(
    expectedTitle: string
  ): Promise<void> {

    console.log(
      'Validando alojamiento:',
      expectedTitle
    );

    // Esperar que el título esté visible
    await expect(this.hotelTitle).toBeVisible({
      timeout: 15000
    });

    // Obtener nombre visible
    const actualTitle = (
      await this.hotelTitle.innerText()
    ).trim();

    console.log(
      'Título encontrado:',
      actualTitle
    );

    // Comparar con el hotel seleccionado
    await expect(this.hotelTitle).toContainText(
      expectedTitle,
      { ignoreCase: true }
    );

    console.log(
      'Título validado correctamente'
    );
  }
}

