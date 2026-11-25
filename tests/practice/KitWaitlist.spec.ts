import { expect, Page, Request, test } from "@playwright/test";
import { KitWaitlistPage } from "../../pages/practice/KitWaitlistPage";
import {
  generateWaitlistEmail,
  loadWaitlistScenarios,
  WaitlistScenario,
} from "../../utils/practice/waitlistScenarioProvider";

const subscriptionEndpoint =
  "https://app.kit.com/forms/9657695/subscriptions";

async function mockKitRequests(
  page: Page,
  onSubscription: (request: Request) => void,
): Promise<void> {
  await page.route("**/*", async (route) => {
    const request = route.request();
    const requestUrl = new URL(request.url());

    if (requestUrl.hostname === "app.convertkit.com") {
      await route.fulfill({ status: 204 });
      return;
    }

    if (requestUrl.hostname === "app.kit.com") {
      if (
        request.method() === "POST" &&
        requestUrl.href === subscriptionEndpoint
      ) {
        onSubscription(request);
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ status: "success" }),
        });
        return;
      }

      await route.abort();
      return;
    }

    if (
      request.method() === "POST" &&
      requestUrl.pathname.endsWith("/subscriptions")
    ) {
      await route.abort();
      throw new Error(
        `Se bloqueó un POST de suscripción no simulado: ${request.url()}`,
      );
    }

    await route.continue();
  });
}

async function fillPreferences(
  waitlistPage: KitWaitlistPage,
  scenario: WaitlistScenario,
): Promise<void> {
  await waitlistPage.selectTimezone(scenario.preferences.timezone.label);
  await waitlistPage.selectFramework(scenario.preferences.framework.label);
  await waitlistPage.selectDiscoverySource(
    scenario.preferences.discoverySource.label,
  );
}

test.describe(
  "Kit Workshop - Waitlist",
  { tag: ["@waitlist", "@practice"] },
  () => {
    for (const scenario of loadWaitlistScenarios()) {
      test(
        `envía la solicitud de inscripción (${scenario.scenario})`,
        { tag: "@smoke" },
        async ({ page }) => {
          let submittedBody = "";
          await mockKitRequests(page, (request) => {
            submittedBody = request.postData() ?? "";
          });

          const waitlistPage = new KitWaitlistPage(page);
          await waitlistPage.goto();

          const email = generateWaitlistEmail(scenario);
          await waitlistPage.fillEmail(email);
          await fillPreferences(waitlistPage, scenario);
          await waitlistPage.submit();

          await expect(waitlistPage.successMessage).toHaveText(
            scenario.expectedSuccessMessage,
          );
          expect(submittedBody).toContain(email);

          for (const { tagValue } of Object.values(scenario.preferences)) {
            expect(submittedBody).toContain(tagValue);
          }
        },
      );
    }

    test(
      "no envía la solicitud sin email",
      { tag: "@validation" },
      async ({ page }) => {
        let submissionCount = 0;
        await mockKitRequests(page, () => {
          submissionCount += 1;
        });

        const scenario = loadWaitlistScenarios()[0];
        if (!scenario) {
          throw new Error("No hay escenarios para validar el formulario.");
        }

        const waitlistPage = new KitWaitlistPage(page);
        await waitlistPage.goto();
        await fillPreferences(waitlistPage, scenario);
        await waitlistPage.submit();

        const emailIsMissing = await page
          .getByRole("textbox", { name: "Email Address" })
          .evaluate((element) => {
            if (!(element instanceof HTMLInputElement)) {
              throw new Error("Email Address no es un input HTML.");
            }

            return element.validity.valueMissing;
          });
        expect(emailIsMissing).toBe(true);
        expect(submissionCount).toBe(0);
      },
    );
  },
);
