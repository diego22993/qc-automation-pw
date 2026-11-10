import { Locator, Page } from '@playwright/test';

export class NavbarComponent {
    private readonly page: Page;
    private readonly menuButton: Locator;
    private readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuButton = page.getByRole('button', { name: 'Open Menu' });
        this.logoutButton = page.locator('#logout_sidebar_link');
    }

    async logout(): Promise<void> {
        await this.menuButton.click();
        await this.logoutButton.click();
    }

}