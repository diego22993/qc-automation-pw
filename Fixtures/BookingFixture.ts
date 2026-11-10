import { test as baseTest } from '@playwright/test';
import { BookingSearchPage } from '../pages/booking/BookingSearchPage';
import { BookingResultsPage } from '../pages/booking/BookingResults';

// Le decimos a Playwright qué páginas vamos a inyectar
type BookingFixture = {
  searchPage: BookingSearchPage;
  resultsPage: BookingResultsPage;
};

// Configuramos el asistente
export const test = baseTest.extend<BookingFixture>({
  searchPage: async ({ page }, use) => {
    await use(new BookingSearchPage(page));
  },
  resultsPage: async ({ page }, use) => {
    await use(new BookingResultsPage(page));
  }
});

export { expect } from '@playwright/test';