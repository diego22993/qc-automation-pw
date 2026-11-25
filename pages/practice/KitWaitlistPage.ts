import { Locator, Page } from "@playwright/test";

export class KitWaitlistPage {
  private readonly page: Page;
  private readonly emailInput: Locator;
  private readonly timezoneSelect: Locator;
  private readonly frameworkSelect: Locator;
  private readonly discoverySourceSelect: Locator;
  private readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel("Email Address");
    const tagSelects = page.locator('select[name="tags[]"]');
    this.timezoneSelect = tagSelects.filter({
      hasText: "What's your timezone?",
    });
    this.frameworkSelect = tagSelects.filter({
      hasText: "Which test framework?",
    });
    this.discoverySourceSelect = tagSelects.filter({
      hasText: "How did you find this?",
    });
    this.submitButton = page.getByRole("button", {
      name: "Join the waitlist",
      exact: true,
    });
    this.successMessage = page.locator('[data-element="success"]');
  }

  async goto(): Promise<void> {
    await this.page.goto("https://dmytro-shyshkin.kit.com/ai-workshop");
    await this.emailInput.waitFor({ state: "visible" });
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async selectTimezone(label: string): Promise<void> {
    await this.timezoneSelect.selectOption({ label });
  }

  async selectFramework(label: string): Promise<void> {
    await this.frameworkSelect.selectOption({ label });
  }

  async selectDiscoverySource(label: string): Promise<void> {
    await this.discoverySourceSelect.selectOption({ label });
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}
