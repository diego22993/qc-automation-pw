<<<<<<< HEAD
import { Page, Locator } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingSearchPage extends BookingBasePage {
  readonly destinationInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.destinationInput = page.locator('input[name="ss"], input[id="searchbox-horizontal-destination-input"]');
    this.searchButton = page.locator('button[type="submit"]');
  }

  async searchDestination(destination: string) {
    await this.typeText(this.destinationInput, destination);
    
    // Forzamos el cierre del calendario presionando Escape y haciendo clic fuera
    await this.page.keyboard.press('Escape');
    await this.page.locator('body').click({ position: { x: 10, y: 10 } }).catch(() => {});
    
    await this.clickElement(this.searchButton);
  }
}
=======
import { expect, type Locator, type Page } from "@playwright/test";
import { BookingBasePage } from "./BookingBasePage";

export class BookingSearchPage extends BookingBasePage {
  private readonly destinationInput: Locator;
  private readonly searchButton: Locator;
  private readonly datePickerOpenButton: Locator;

  constructor(page: Page) {
    super(page);

    this.destinationInput = page.getByRole("combobox", {
      name: /destino|destination/i,
    });
    this.searchButton = page.getByRole("button", {
      name: /^(Buscar|Search)$/i,
    });
    this.datePickerOpenButton = page.getByTestId("searchbox-dates-container");
  }

  async goto(): Promise<void> {
    await this.navigate("https://www.booking.com/?lang=es");
  }

  async searchDestination(
    destination: string,
    checkInDate: string,
    checkOutDate: string,
    adults = 2,
  ): Promise<void> {
    if (checkOutDate <= checkInDate) {
      throw new Error("La salida debe ser posterior al ingreso.");
    }

    if (!Number.isInteger(adults) || adults < 1 || adults > 30) {
      throw new Error("La cantidad de adultos debe estar entre 1 y 30.");
    }

    await this.destinationInput.fill(destination);

    const destinationSuggestion = this.page
      .getByRole("option", { name: destination, exact: false })
      .first();

    await expect(destinationSuggestion).toBeVisible({ timeout: 15_000 });
    await destinationSuggestion.click();

    if (
      (await this.datePickerOpenButton.getAttribute("aria-expanded")) !== "true"
    ) {
      await this.datePickerOpenButton.click();
    }
    await this.selectDate(checkInDate);
    await this.selectDate(checkOutDate);
    await this.setAdults(adults);
    await this.searchButton.click();

    await expect(this.page).toHaveURL(/\/(city|searchresults)/);

    if (this.page.url().includes("/city/")) {
      const resultsLink = this.page.getByRole("link", {
        name: new RegExp(`${destination}.*personas`, "i"),
      });

      await expect(resultsLink).toBeVisible();
      await resultsLink.click();
    }

    await expect(this.page).toHaveURL(/\/(city|searchresults)/);

    if (this.page.url().includes("/city/")) {
      await expect(
        this.page.getByRole("heading", {
          name: new RegExp(`${destination}:.*hoteles`, "i"),
        }),
      ).toBeVisible();
    } else {
      await expect(this.page.getByTestId("property-card").first()).toBeVisible();
    }
  }

  private async selectDate(dateIso: string): Promise<void> {
    const dateCell = this.page
      .locator(`[data-date="${dateIso}"]:visible`)
      .first();

    const firstVisibleDate = this.page.locator("[data-date]:visible").first();

    const nextMonthButton = this.page
      .getByRole("button", {
        name: /mes siguiente|next month/i,
      })
      .first();

    await expect(firstVisibleDate).toBeVisible();

    for (let month = 0; month < 18; month++) {
      if (await dateCell.isVisible()) {
        await dateCell.click();
        return;
      }

      if (month === 17) break;

      const previousDate = await firstVisibleDate.getAttribute("data-date");

      await expect(nextMonthButton).toBeVisible();
      await nextMonthButton.click();

      await expect(firstVisibleDate).not.toHaveAttribute(
        "data-date",
        previousDate!,
      );
    }

    throw new Error(`No se encontró la fecha ${dateIso} en el calendario.`);
  }

  private async setAdults(adults: number): Promise<void> {
    const occupancyButton = this.page.getByTestId("occupancy-config");

    await expect(occupancyButton).toBeVisible();
    await occupancyButton.click();

    const adultsInput = this.page.locator("#group_adults");
    await expect(adultsInput).toBeVisible();

    const increaseAdultsButton = this.page.getByRole("button", {
      name: /increase.*adult|aumentar.*adult/i,
    });

    const decreaseAdultsButton = this.page.getByRole("button", {
      name: /decrease.*adult|disminuir.*adult/i,
    });

    for (let attempt = 0; attempt < 30; attempt++) {
      const currentAdults = Number(await adultsInput.inputValue());

      if (currentAdults === adults) break;

      const button =
        currentAdults < adults ? increaseAdultsButton : decreaseAdultsButton;

      await expect(button).toBeVisible();
      await button.click();
      await expect(adultsInput).not.toHaveValue(String(currentAdults));
    }

    await expect(adultsInput).toHaveValue(String(adults));

    const doneButton = this.page.getByRole("button", {
      name: /^(listo|hecho|done)$/i,
    });

    if (await doneButton.isVisible()) {
      await doneButton.click();
    }
  }
}
>>>>>>> origin/feature/clase-4-pom
