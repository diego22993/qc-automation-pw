import type { Locator, Page } from "@playwright/test";

export class AutomationPracticeLoggedInPage {
  readonly successMessage: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.successMessage = page.getByRole("heading", {
      name: "Logged In Successfully",
    });
    this.logoutLink = page.getByRole("link", { name: "Log out" });
  }
}
