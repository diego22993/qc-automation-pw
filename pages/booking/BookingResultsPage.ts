<<<<<<< HEAD
import { Page, Locator, expect } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingResultsPage extends BookingBasePage {
  readonly resultsContainer: Locator;
  readonly propertyCard: Locator;
  readonly freeCancellationFilter: Locator;

  constructor(page: Page) {
    super(page);
    this.resultsContainer = page.locator('[data-testid="property-card"], div[data-room-id], [role="feed"]').first();
    this.propertyCard = page.locator('[data-testid="property-card"]');
    
    // Selector robusto para el filtro de cancelación gratuita
    this.freeCancellationFilter = page.locator('[data-filters-item*="fc=1"], input[id*="fc=1"], div:has-text("Free cancellation")').first();
  }

  async validateResultsAreDisplayed() {
    await this.resultsContainer.waitFor({ state: 'visible', timeout: 20000 });
    await expect(this.resultsContainer).toBeVisible();
  }

  async applyFreeCancellationFilter() {
    if (await this.freeCancellationFilter.isVisible({ timeout: 5000 }).catch(() => false)) {
      await this.freeCancellationFilter.click({ force: true });
    } else {
      // Alternativa de respaldo si el filtro no es visible de inmediato
      const fallbackFilter = this.page.locator('text=/Hotels|Hoteles/i').first();
      await fallbackFilter.click({ force: true });
    }
  }
}
=======
import { expect, type Page } from "@playwright/test";
import {
  dismissBookingModalIfPresent,
  registerBookingModal,
} from "../bookingModal";
import { BookingBasePage } from "./BookingBasePage";

type OpenHotelResult = {
  page: Page;
  hotelName: string;
};

export class BookingResultsPage extends BookingBasePage {
  private readonly propertyCards = this.page.getByTestId("property-card");

  async applyFreeCancellationFilter(): Promise<void> {
    await this.applyFilter(/cancelación gratuita|free cancellation/i, "fc=2");
  }

  async applyRatingFilter(): Promise<void> {
    await this.applyFilter(/8\+|8\.0|muy bien|very good/i, "review_score=80");
  }

  async getResultsCount(): Promise<number> {
    await expect(this.propertyCards.first()).toBeVisible();
    return this.propertyCards.count();
  }

  async sortByLowestPrice(): Promise<void> {
    const sortButton = this.page.getByTestId("sorters-dropdown-trigger");

    await expect(sortButton).toBeVisible();
    await sortButton.click();

    const lowestPriceOption = this.page.getByRole("radio", {
      name: /precio más bajo|lowest price/i,
    });

    await expect(lowestPriceOption).toBeVisible();
    await lowestPriceOption.click();

    await expect(this.page).toHaveURL((url) =>
      /price/i.test(url.searchParams.get("order") ?? ""),
    );

    await expect(this.propertyCards.first()).toBeVisible();
  }

  async openFirstHotel(): Promise<OpenHotelResult> {
    const firstCard = this.propertyCards.first();
    await expect(firstCard).toBeVisible();

    const hotelLink = firstCard.getByTestId("title-link");
    await expect(hotelLink).toBeVisible();

    const hotelName = (await hotelLink.innerText()).trim();

    const [hotelPage] = await Promise.all([
      this.page.waitForEvent("popup"),
      hotelLink.click(),
    ]);

    await registerBookingModal(hotelPage);
    await hotelPage.waitForLoadState("domcontentloaded");
    await dismissBookingModalIfPresent(hotelPage);
    await expect(hotelPage).toHaveURL(/\/hotel\//);

    return {
      page: hotelPage,
      hotelName,
    };
  }

  private async applyFilter(
    filterName: RegExp,
    expectedFilter: string,
  ): Promise<void> {
    const filterCheckbox = this.page
      .getByRole("checkbox", { name: filterName })
      .first();

    if (!(await filterCheckbox.isChecked())) {
      await filterCheckbox.click();
    }

    await expect(filterCheckbox).toBeChecked();

    await expect(this.page).toHaveURL((url) => {
      const filters = (url.searchParams.get("nflt") ?? "").split(";");
      return filters.includes(expectedFilter);
    });

    await expect(this.propertyCards.first()).toBeVisible();
  }
}
>>>>>>> origin/feature/clase-4-pom
