<<<<<<< HEAD
import { Page, Locator } from '@playwright/test';
=======
import { expect, type Page } from "@playwright/test";
import {
  dismissBookingModalIfPresent,
  registerBookingModal,
} from "../bookingModal";
>>>>>>> origin/feature/clase-4-pom

export class BookingBasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

<<<<<<< HEAD
  /**
   * Navega a la URL base configurada en playwright.config.ts
   */
  // pages/booking/BookingBasePage.ts
// pages/booking/BookingBasePage.ts
async navigate() {
  await this.page.goto('/', { waitUntil: 'domcontentloaded' });
}

  /**
   * Espera a que un elemento esté visible y realiza un clic
   */
  async clickElement(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /**
   * Espera a que un campo de texto esté visible y completa su contenido
   */
  async typeText(locator: Locator, text: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }
}
=======
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
>>>>>>> origin/feature/clase-4-pom
