import { Page, Locator } from '@playwright/test';
import { BookingBasePage } from './BookingBasePage';

export class BookingSearchPage extends BookingBasePage {
    private destinationInput: Locator;
    private searchButton: Locator;
    private datePickerOpenBtn: Locator;
    private datePickerHasta: Locator;
    private guestsOccupancyBtn: Locator;
    private firstAutocompleteResult: Locator;
    private datePickerCalendar: Locator;

    constructor(page: Page) {
        super(page);
        this.destinationInput = page.locator('input[name="ss"]');
        this.firstAutocompleteResult = page.locator('[data-testid="autocomplete-result"]').first();
        this.datePickerCalendar = page.locator('[data-testid="searchbox-datepicker-calendar"]');
        this.searchButton = page.locator('button[type="submit"]');
        this.datePickerOpenBtn = page.locator('[data-testid="date-display-field-start"]');
        this.datePickerHasta = page.locator('[data-testid="date-display-field-end"]');
        this.guestsOccupancyBtn = page.locator('[data-testid="occupancy-config"]');
    }

    async goto() {
        await this.navigateTo('https://www.booking.com');
    }

    async searchDestination(destination: string, checkInDate: string, checkOutDate: string) {
        await this.typeText(this.destinationInput, destination);
        await this.clickElement(this.firstAutocompleteResult); // Click en la primer sugerencia.
        
        await this.selectDate(checkInDate);
        await this.selectDate(checkOutDate);

        await this.clickElement(this.searchButton);
    }

    private async selectDate(dateIso: string) {
        // Date Iso format: YYYY-MM-DD
        const dateLocator = this.page.locator(`span[data-date="${dateIso}"]`);
        await this.clickElement(dateLocator);
    }
}