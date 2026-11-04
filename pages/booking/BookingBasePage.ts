import { Page, Locator } from '@playwright/test';

export class BookingBasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string): Promise<void> {
    await registerBookingModal(this.page);

    const acceptCookiesButton = this.page.locator(
      "#onetrust-accept-btn-handler",
    );

    await this.page.addLocatorHandler(acceptCookiesButton, async () => {
      await acceptCookiesButton.click();
    });

    await this.page.goto(url, {
      waitUntil: "domcontentloaded",
    });

    await this.dismissModalsIfPresent();
  }

  async dismissModalsIfPresent(): Promise<void> {
    await dismissBookingModalIfPresent(this.page);

    const acceptCookiesButton = this.page.locator(
      "#onetrust-accept-btn-handler",
    );

    if (await acceptCookiesButton.isVisible()) {
      await acceptCookiesButton.click();
      await expect(acceptCookiesButton).toBeHidden();
    }
  }
}
