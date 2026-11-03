import { expect, Locator } from '@playwright/test';
import { BookingBasePage, BookingPageSource } from './BookingBasePage';

export class BookingDetailPage extends BookingBasePage {
  constructor(page: BookingPageSource) {
    super(page);
  }

  private get hotelName(): Locator {
    // Resolver al usarlo: la fixture se crea antes de abrir la nueva pestana.
    return this.page.locator('h1.pp-header__title');
  }

  async getHotelName(): Promise<string> {
    await expect(this.hotelName).toBeVisible({ timeout: 15000 });
    return (await this.hotelName.innerText()).trim();
  }

  async proceedToCheckout(): Promise<void> {
    const roomQuantity = this.page.locator('select[name^="nr_rooms_"]').filter({ visible: true }).first();
    await expect(roomQuantity).toBeVisible({ timeout: 15000 });
    await roomQuantity.selectOption('1');
    await expect(roomQuantity).toHaveValue('1');
    // Este boton abre los datos del huesped; no confirma la reserva.
    await this.page.locator('#hprt-form').getByRole('button', { name: /^(?:I['’]ll\s+)?reserve$/i }).click();
    await this.page.waitForURL(url => url.hostname === 'secure.booking.com' && url.pathname === '/book.html', {
      waitUntil: 'domcontentloaded', timeout: 30000,
    });
  }
}
