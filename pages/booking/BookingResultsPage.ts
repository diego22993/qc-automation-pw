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
