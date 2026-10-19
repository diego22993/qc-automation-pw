import { test, expect } from '@playwright/test';

test('Mi primera prueba en Playwright', async ({ page }) => {
  await page.goto('https://example.org');
  await expect(page).toHaveTitle(/Example Domain/);
});
