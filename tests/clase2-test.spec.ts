import { test, expect } from '@playwright/test';

test.describe('Lenovo - test basico', () => {

  test('test simple', async ({ page }) => {

  await page.goto('https://www.lenovo.com/ar/es/');

  
  
  
  await expect(
    page.locator('//div[@class="iconContainerpc"]')
  ).toBeVisible();
  await page.locator("//p[normalize-space()='PCs & Tablets']").click();
  await page.locator('//img[@alt="Lenovo Logo"]').click();
  await page.locator('//*[@id="common_footer_id"]').scrollIntoViewIfNeeded();

  await expect(
    page.locator('//*[@id="common_footer_id"]')
  ).toBeVisible();
});

});