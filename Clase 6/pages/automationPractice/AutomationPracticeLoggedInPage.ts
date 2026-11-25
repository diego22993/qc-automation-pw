import { Locator, Page } from "@playwright/test";

export class AutomationPracticeLoggedInPage {
  private readonly page: Page;
  private readonly successHeading: Locator;
  private readonly logOutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successHeading = page.getByText(/Congratulations|logged in successfully/i);
    this.logOutButton = page.getByRole("link", { name: "Log out" });
  }

  async getSuccessMessage(): Promise<string> {
    await this.successHeading.first().waitFor({ state: "visible" });
    return (await this.successHeading.first().textContent()) ?? "";
  }

  async isLogOutButtonVisible(): Promise<boolean> {
    return this.logOutButton.isVisible();
  }

  async isSuccessUrl(): Promise<boolean> {
    return /logged-in-successfully\/?$/.test(this.page.url());
  }
}
