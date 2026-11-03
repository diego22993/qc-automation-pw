import { expect, Locator } from '@playwright/test';
import { BookingBasePage, BookingPageSource } from './BookingBasePage';

export type GuestField = 'firstname' | 'lastname' | 'email';

export interface GuestFieldValidation {
  value: string;
  required: boolean;
  valueMissing: boolean;
  validationMessage: string;
  nativeValidationEnabled: boolean;
  userInvalid: boolean;
  ariaInvalid: boolean;
  messages: string[];
}

export class BookingCheckoutPage extends BookingBasePage {
  constructor(page: BookingPageSource) {
    super(page);
  }

  private get fields(): Record<GuestField, Locator> {
    return {
      firstname: this.page.locator('#bookForm input[name="firstname"]:not([type="hidden"])'),
      lastname: this.page.locator('#bookForm input[name="lastname"]:not([type="hidden"])'),
      email: this.page.locator('#bookForm input[name="email"]:not([type="hidden"])'),
    };
  }

  private get continueButton(): Locator {
    return this.page.locator('#bookForm').getByRole('button', { name: /^Next:\s*Final details/i });
  }

  async waitForGuestForm(): Promise<void> {
    for (const field of Object.values(this.fields)) await expect(field).toBeVisible({ timeout: 15000 });
    await expect(this.continueButton).toBeVisible({ timeout: 15000 });
  }

  async submitEmptyForm(): Promise<void> {
    await this.waitForGuestForm();
    // Limpiar incluso si el navegador o Booking precargaron algun dato.
    for (const field of Object.values(this.fields)) {
      await field.clear();
      await expect(field).toHaveValue('');
    }
    await this.continueButton.click();
  }

  async getFieldValidation(field: GuestField): Promise<GuestFieldValidation> {
    return this.fields[field].evaluate((input: HTMLInputElement) => {
      const ids = [input.getAttribute('aria-errormessage'), input.getAttribute('aria-describedby')]
        .filter(Boolean).join(' ').split(/\s+/).filter(Boolean);
      const messages = [...new Set(ids)].map(id => document.getElementById(id))
        .filter((element): element is HTMLElement => !!element && element.getClientRects().length > 0)
        .map(element => element.innerText.trim()).filter(Boolean);
      return {
        value: input.value,
        required: input.required,
        valueMissing: input.validity.valueMissing,
        validationMessage: input.validationMessage,
        nativeValidationEnabled: !!input.form && !input.form.noValidate,
        userInvalid: input.matches(':user-invalid'),
        ariaInvalid: input.getAttribute('aria-invalid') === 'true',
        messages,
      };
    });
  }
}
