import { expect, test } from "@playwright/test";
import { PracticeContactPage } from "../../pages/practice/PracticeContactPage";
import { loadContactScenarios } from "../../utils/practice/contactScenarioProvider";
import { generateSyntheticUser } from "../../utils/practice/syntheticUser";

test.describe(
  "Practice Test Automation - Contact",
  { tag: ["@practice", "@contact"] },
  () => {
    for (const scenario of loadContactScenarios()) {
      test(
        `completa los campos requeridos sin enviar el formulario (${scenario.scenario})`,
        async ({ page }) => {
          let contactPostAttempted = false;
          await page.route(
            "https://practicetestautomation.com/**",
            async (route) => {
              const request = route.request();
              const requestUrl = new URL(request.url());
              if (
                request.method() === "POST" &&
                requestUrl.pathname === "/contact/"
              ) {
                contactPostAttempted = true;
                await route.abort();
                return;
              }

              await route.continue();
            },
          );

          const contactPage = new PracticeContactPage(page);
          await contactPage.goto();

          const user = generateSyntheticUser(scenario.userIdentity);
          await contactPage.fillForm(
            user.firstName,
            user.lastName,
            user.email,
            scenario.message,
          );

          await expect(contactPage.heading).toBeVisible();
          await expect(contactPage.firstNameInput).toHaveValue(user.firstName);
          await expect(contactPage.lastNameInput).toHaveValue(user.lastName);
          await expect(contactPage.emailInput).toHaveValue(user.email);
          await expect(contactPage.messageInput).toHaveValue(scenario.message);
          await expect(contactPage.firstNameInput).toHaveAttribute(
            "required",
            "",
          );
          await expect(contactPage.lastNameInput).toHaveAttribute(
            "required",
            "",
          );
          await expect(contactPage.emailInput).toHaveAttribute("required", "");
          await expect(contactPage.messageInput).toHaveAttribute(
            "required",
            "",
          );
          await expect(contactPage.submitButton).toBeVisible();
          await expect(contactPage.recaptchaFrame).toBeAttached();
          expect(contactPostAttempted).toBe(false);
        },
      );
    }
  },
);
