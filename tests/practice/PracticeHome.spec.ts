import { expect, test } from "@playwright/test";
import { PracticeHomePage } from "../../pages/practice/PracticeHomePage";

test.describe(
  "Practice Test Automation - Practice page",
  { tag: ["@practice-hub", "@practice"] },
  () => {
    test("muestra las secciones de práctica y sus destinos", async ({ page }) => {
      const practiceHomePage = new PracticeHomePage(page);
      await practiceHomePage.goto();

      await expect(practiceHomePage.heading).toBeVisible();
      await expect(practiceHomePage.testLoginLink).toBeVisible();
      await expect(practiceHomePage.testLoginLink).toHaveAttribute(
        "href",
        "https://practicetestautomation.com/practice-test-login/",
      );
      await expect(practiceHomePage.testExceptionsLink).toBeVisible();
      await expect(practiceHomePage.testExceptionsLink).toHaveAttribute(
        "href",
        "https://practicetestautomation.com/practice-test-exceptions/",
      );
      await expect(practiceHomePage.testTableLink).toBeVisible();
      await expect(practiceHomePage.testTableLink).toHaveAttribute(
        "href",
        "https://practicetestautomation.com/practice-test-table/",
      );
    });
  },
);
