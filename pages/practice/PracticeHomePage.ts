import { Locator, Page } from "@playwright/test";

export class PracticeHomePage {
  private readonly page: Page;
  readonly heading: Locator;
  readonly testLoginLink: Locator;
  readonly testExceptionsLink: Locator;
  readonly testTableLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", {
      name: "Practice",
      exact: true,
    });
    this.testLoginLink = page.getByRole("link", {
      name: "Test Login Page",
      exact: true,
    });
    this.testExceptionsLink = page.getByRole("link", {
      name: "Test Exceptions",
      exact: true,
    });
    this.testTableLink = page.getByRole("link", {
      name: "Test Table",
      exact: true,
    });
  }

  async goto(): Promise<void> {
    await this.page.goto("https://practicetestautomation.com/practice/");
    await this.heading.waitFor({ state: "visible" });
  }
}
