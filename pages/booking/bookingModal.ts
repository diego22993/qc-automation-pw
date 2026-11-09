import { expect, type Page } from "@playwright/test";

const registeredPages = new WeakSet<Page>();

export async function registerBookingModal(page: Page): Promise<void> {
  if (registeredPages.has(page)) return;

  const closeButton = page.getByRole("button", {
    name: /^(Dismiss sign-in info\.?|Ignorar información sobre el inicio de sesión\.?)$/i,
  });

  await page.addLocatorHandler(closeButton, async () => {
    await closeButton.click();
  });

  registeredPages.add(page);
}

export async function dismissBookingModalIfPresent(page: Page): Promise<void> {
  const closeButton = page.getByRole("button", {
    name: /^(Dismiss sign-in info\.?|Ignorar información sobre el inicio de sesión\.?)$/i,
  });

  if (await closeButton.isVisible()) {
    await closeButton.click();
    await expect(closeButton).toBeHidden();
  }
}