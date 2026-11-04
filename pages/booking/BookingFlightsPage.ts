import { expect, type Locator, type Page } from "@playwright/test";
import { BookingBasePage } from "./BookingBasePage";

export class BookingFlightsPage extends BookingBasePage {
  private readonly languageButton: Locator;
  private readonly cheapestSortButton: Locator;
  private readonly originInput: Locator;
  private readonly destinationInput: Locator;

  constructor(page: Page) {
    super(page);

    this.languageButton = page.getByTestId("header-language-picker-trigger");

    this.cheapestSortButton = page.getByRole("button", {
      name: /más barato|menor precio|cheapest|lowest price/i,
    });

    this.originInput = page.getByRole("combobox").nth(0);
    this.destinationInput = page.getByRole("combobox").nth(1);
  }

  async goto(): Promise<void> {
    await this.navigate("https://www.booking.com/flights?lang=es");
  }

  async selectSpanishArgentina(): Promise<void> {
    await this.languageButton.click();

    const spanishArgentinaOption = this.page.getByText("Español (Argentina)", {
      exact: true,
    });

    await spanishArgentinaOption.click();
    await expect(this.page.locator("html")).toHaveAttribute("lang", /^es/i);
  }

  async searchRoundTrip(
    origin: string,
    destination: string,
    departureDate: string,
    returnDate: string,
  ): Promise<void> {
    await this.selectAirport(this.originInput, origin);
    await this.selectAirport(this.destinationInput, destination);

    const departureButton = this.page.getByRole("button", {
      name: /salida|departure/i,
    });

    await departureButton.click();
    await this.selectDate(departureDate);
    await this.selectDate(returnDate);

    const searchButton = this.page.getByRole("button", {
      name: /buscar|search/i,
    });

    await searchButton.click();
    await expect(this.cheapestSortButton).toBeVisible();
  }

  async selectCheapestFlight(): Promise<void> {
    await this.cheapestSortButton.click();

    const firstFlightCard = this.page.getByTestId("flight-card").first();
    await expect(firstFlightCard).toBeVisible();

    const selectFlightButton = firstFlightCard.getByRole("button", {
      name: /seleccionar|elegir|select|choose/i,
    });

    await selectFlightButton.click();
  }

  private async selectAirport(
    input: Locator,
    airportName: string,
  ): Promise<void> {
    await input.fill(airportName);

    const airportSuggestion = this.page
      .getByRole("option", { name: airportName, exact: false })
      .first();

    await expect(airportSuggestion).toBeVisible();
    await airportSuggestion.click();
  }

  private async selectDate(dateIso: string): Promise<void> {
    const dateCell = this.page.locator(`[data-date="${dateIso}"]:visible`);

    await expect(dateCell).toBeVisible();
    await dateCell.click();
  }
}
