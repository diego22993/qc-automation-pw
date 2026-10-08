import { test, expect } from '@playwright/test';

test('Mi primer test: Verificar titulo de Google', async ({ page }) => {
  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle(/Google/);
});