import { expect, test } from "../../fixtures/automationpractice.fixture";
import { AutomationPracticeLoggedInPage } from "../../pages/automationpractice/AutomationPracticeLoggedInPage";
import { loadAutomationPracticeUserData } from "../../utils/automationpractice/userDataProvider";

test.describe(
  "Automation Practice - Login",
  { tag: "@automationpractice" },
  () => {
    loadAutomationPracticeUserData().forEach((user) => {
      test(`validar escenario: ${user.scenario}`, async ({ loginPage, page }) => {
        await loginPage.login(user.userName, user.password);

        if (user.expectSuccess) {
          await expect(page).toHaveURL(
            /practicetestautomation\.com\/logged-in-successfully/,
          );

          const loggedInPage = new AutomationPracticeLoggedInPage(page);
          await expect(loggedInPage.successMessage).toBeVisible();
          await expect(loggedInPage.logoutLink).toBeVisible();
          return;
        }

        expect(await loginPage.getErrorMessage()).toBe(user.msjError);
      });
    });
  },
);
