import { Page, Locator } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingSearchPage extends BookingBasePage {
    private destinationInput: Locator;
    private searchButton: Locator;
    private datePickerOpenBtn: Locator;
    private datePickerHasta: Locator;
    private guestsOccupancyBtn: Locator;
    private autocompleteResults: Locator;
    private datePickerCalendar: Locator;

    constructor(page: Page) {
        super(page);
        this.destinationInput = page.locator('input[name="ss"]');
        this.autocompleteResults = page.locator('[data-testid="autocomplete-result"]');
        this.datePickerCalendar = page.locator('[data-testid="searchbox-datepicker-calendar"]');
        this.searchButton = page.locator('button[type="submit"]');
        this.datePickerOpenBtn = page.locator('[data-testid="date-display-field-start"]');
        this.datePickerHasta = page.locator('[data-testid="date-display-field-end"]');
        this.guestsOccupancyBtn = page.locator('[data-testid="occupancy-config"]');
    }

    async goto() {
        await this.navigateTo('https://www.booking.com');
    }

    async searchDestination(destination: string) {
        await this.typeText(this.destinationInput, destination);
        // Esperamos una sugerencia que contenga el destino.
        const destinationResult = this.autocompleteResults.filter({ hasText: destination }).first();
        await this.clickElement(destinationResult);
    }

    async searchDate(checkInDate: string, checkOutDate: string) {
        await this.selectDate(checkInDate);
        await this.selectDate(checkOutDate);
    }

    async clickSearch() {
        await this.page.waitForTimeout(5000);
        await this.clickElement(this.searchButton);
        await this.page.waitForTimeout(5000);
    }

    private async selectDate(dateIso: string) {
        // Date Iso format: YYYY-MM-DD
        const dateLocator = this.page.locator(`span[data-date="${dateIso}"]`);
        await this.clickElement(dateLocator);
    }
}