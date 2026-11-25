import { expect, Locator, Page } from "@playwright/test";

export class AutomationPracticeLoggedInPage {
  private readonly page: Page;
  private readonly successHeading: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successHeading = page.getByRole("heading", {
      name: "Logged In Successfully",
    });
    this.logoutLink = page.getByRole("link", { name: "Log out" });
  }

  async verifySuccessfulLogin() {
    await expect(this.page).toHaveURL(/logged-in-successfully/);
    await expect(this.successHeading).toBeVisible();
    await expect(this.logoutLink).toBeVisible();
  }
}
