<<<<<<< HEAD
import { Page, Locator, expect } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingDetailPage extends BookingBasePage {
  private hotelTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.hotelTitle = page.locator('#hp_hotel_name, [data-testid="hp-hotel-title"]');
  }

  async validateHotelTitle(expectedName: string) {
    await expect(this.hotelTitle).toContainText(expectedName);
  }
}
=======
import { expect } from "@playwright/test";
import { BookingBasePage } from "./BookingBasePage";

export class BookingDetailPage extends BookingBasePage {
  async expectHotelName(expectedName: string): Promise<void> {
    await expect(this.page).toHaveURL(/\/hotel\//);

    const hotelHeading = this.page.getByRole("heading", {
      name: expectedName,
      exact: true,
    });

    await expect(hotelHeading).toBeVisible();
  }

  async reserveRoom(): Promise<void> {
    const roomSelector = this.page.locator('select[name^="nr_rooms"]').first();

    await expect(roomSelector).toBeVisible();

    const availableRoomValue = await roomSelector
      .locator("option")
      .evaluateAll((options) => {
        const availableOption = options.find((option) => {
          const roomOption = option as HTMLOptionElement;
          return !roomOption.disabled && Number(roomOption.value) > 0;
        }) as HTMLOptionElement | undefined;

        return availableOption?.value;
      });

    if (!availableRoomValue) {
      throw new Error("No se encontró una habitación disponible.");
    }

    await roomSelector.selectOption(availableRoomValue);

    const reserveButton = this.page.getByRole("button", {
      name: /voy a reservar|i.?ll reserve/i,
    });

    await expect(reserveButton).toBeVisible();
    await reserveButton.click();

    const firstNameInput = this.page.locator('input[name="firstname"]');

    await expect(firstNameInput).toBeVisible();
  }
}
>>>>>>> origin/feature/clase-4-pom
