import { test as base, expect, Page } from '@playwright/test';
import { BookingSearchPage } from '../pages/booking/BookingSearchPage';
import { BookingResultsPage } from '../pages/booking/BookingResultsPage';
import { BookingDetailPage } from '../pages/booking/BookingDetailPage';
import { BookingCheckoutPage } from '../pages/booking/BookingCheckoutPage';

interface HotelTab {
  readonly page: Page;
  bind(page: Page): void;
}

interface BookingFixtures {
  searchPage: BookingSearchPage;
  searchResultsPage: BookingResultsPage;
  hotelTab: HotelTab;
  detailPage: BookingDetailPage;
  checkoutPage: BookingCheckoutPage;
}

export const test = base.extend<BookingFixtures>({
  locale: 'en-GB',
  timezoneId: 'America/Argentina/Buenos_Aires',
  actionTimeout: 15000,
  navigationTimeout: 30000,
  screenshot: 'on',
  trace: 'retain-on-failure',

  searchPage: async ({ page }, use) => {
    await use(new BookingSearchPage(page));
  },
  searchResultsPage: async ({ page }, use) => {
    await use(new BookingResultsPage(page));
  },
  hotelTab: async ({ page, context }, use) => {
    // Estado propio de cada prueba; nunca se comparte entre tests o workers.
    let selectedPage: Page | undefined;
    await use({
      get page(): Page {
        if (!selectedPage) throw new Error('Primero debe asignar la nueva pestana con hotelTab.bind().');
        if (selectedPage.isClosed()) throw new Error('La pestana del alojamiento esta cerrada.');
        return selectedPage;
      },
      bind(tab: Page): void {
        if (tab === page || tab.context() !== context || tab.isClosed()) {
          throw new Error('Debe asignar una nueva pestana abierta del contexto de esta prueba.');
        }
        if (selectedPage && selectedPage !== tab) {
          throw new Error('La prueba ya tiene una pestana de alojamiento asignada.');
        }
        selectedPage = tab;
      },
    });
    // Playwright cierra el contexto y todas sus pestanas despues de capturar evidencias.
  },
  detailPage: async ({ hotelTab }, use) => {
    await use(new BookingDetailPage(() => hotelTab.page));
  },
  checkoutPage: async ({ hotelTab }, use) => {
    await use(new BookingCheckoutPage(() => hotelTab.page));
  },
});

export { expect };
