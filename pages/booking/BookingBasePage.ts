import { Page } from '@playwright/test';

export abstract class BookingBasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url = 'https://www.booking.com/'): Promise<void> {
    // Registrar antes de navegar: los modales pueden aparecer mas tarde.
    const cookies = this.page.locator('#onetrust-accept-btn-handler');
    await this.page.addLocatorHandler(cookies, async () => { await cookies.click(); });
    const signIn = this.page.getByRole('button', { name: /Dismiss sign.?in info/i });
    await this.page.addLocatorHandler(signIn, async () => { await signIn.click(); });
    await this.page.goto(url, { waitUntil: 'load' });
  }
}
