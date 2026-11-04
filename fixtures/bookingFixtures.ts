import { test as base } from '@playwright/test';
import { BookingSearchPage } from '../pages/booking/BookingSearchPage';
import { BookingResultsPage } from '../pages/booking/BookingResultsPage';

type BookingFixtures = {
  searchPage: BookingSearchPage;
  resultsPage: BookingResultsPage;
};

export const test = base.extend<BookingFixtures>({
  searchPage: async ({ page }, use) => {
    await use(new BookingSearchPage(page));
  },
  resultsPage: async ({ page }, use) => {
    await use(new BookingResultsPage(page));
  },
});

export { expect } from '@playwright/test';