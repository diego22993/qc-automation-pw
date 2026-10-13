import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://www.booking.com/index.es.html?aid=2311236;label=es-es-booking-desktop-onknyt5TBrS8m9RnGd*6fgS652829001115:pl:ta:p1:p2:ac:ap:neg:fi:tikwd-65526620:lp9190023:li:dec:dm;ws=&gad_source=1&gad_campaignid=19655506290&gbraid=0AAAAAD_Ls1IikTPm8vcVpgs9ek4rrIGYp&gclid=CjwKCAjwrbfWBhAeEiwAc2e6PuEipx9pLs_x6GD3uKc1eBIjVg1ADD2YQD5bFzsXxVappwQzp513KBoCDVwQAvD_BwE&chal_t=1791888292759&force_referer=https%3A%2F%2Fwww.google.com%2F');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Booking.com/);
});