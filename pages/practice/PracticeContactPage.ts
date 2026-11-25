import { Locator, Page } from "@playwright/test";

export class PracticeContactPage {
  private readonly page: Page;
  readonly heading: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;
  readonly recaptchaFrame: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", {
      name: "Contact",
      exact: true,
    });
    this.firstNameInput = page.locator("#wpforms-161-field_0");
    this.lastNameInput = page.locator("#wpforms-161-field_0-last");
    this.emailInput = page.locator("#wpforms-161-field_1");
    this.messageInput = page.locator("#wpforms-161-field_2");
    this.submitButton = page.locator("#wpforms-submit-161");
    this.recaptchaFrame = page.locator('iframe[title="reCAPTCHA"]');
  }

  async goto(): Promise<void> {
    await this.page.goto("https://practicetestautomation.com/contact/");
    await this.heading.waitFor({ state: "visible" });
  }

  async fillForm(
    firstName: string,
    lastName: string,
    email: string,
    message: string,
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.messageInput.fill(message);
  }
}
