import { Locator, Page } from "@playwright/test";

export class AutomationPracticeLoggedInPage {
  private readonly page: Page;
  readonly successText: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successText = page.getByText(
      /Congratulations|successfully logged in/i,
    );
    this.logoutLink = page.getByRole("link", { name: "Log out" });
  }

  async waitUntilLoaded(): Promise<void> {
    await this.page.waitForURL(/logged-in-successfully\/?/);
  }
}
