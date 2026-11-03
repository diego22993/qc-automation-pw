import { Page } from '@playwright/test';

export type BookingPageSource = Page | (() => Page);

export abstract class BookingBasePage {
  private readonly pageSource: BookingPageSource;

  constructor(page: BookingPageSource) {
    this.pageSource = page;
  }

  protected get page(): Page {
    return typeof this.pageSource === 'function' ? this.pageSource() : this.pageSource;
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
