import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export interface SauceDemoCheckoutScenario {
  scenario: string;
  products: string[];
  customer: {
    firstName: string;
    lastName: string;
    postalCode: string;
  };
  expected: {
    subtotal: string;
    tax: string;
    total: string;
    confirmation: string;
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(
  record: Record<string, unknown>,
  field: string,
  context: string,
): string {
  const value = record[field];

  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${context}: "${field}" debe ser un texto no vacío.`);
  }

  return value;
}

export function loadSauceDemoCheckoutScenarios(): SauceDemoCheckoutScenario[] {
  const jsonPath = resolve(
    process.cwd(),
    "data",
    "saucedemo-checkout-scenarios.json",
  );
  const parsed: unknown = JSON.parse(readFileSync(jsonPath, "utf8"));

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("El JSON de checkout debe contener una lista no vacía.");
  }

  return parsed.map((entry, index) => {
    const context = `Escenario ${index + 1}`;

    if (!isRecord(entry)) {
      throw new Error(`${context}: debe ser un objeto JSON.`);
    }

    const scenario = requiredString(entry, "scenario", context);
    const rawProducts = entry.products;

    if (!Array.isArray(rawProducts) || rawProducts.length === 0) {
      throw new Error(`${context}: "products" debe ser una lista no vacía.`);
    }

    const products = rawProducts.map((product, productIndex) => {
      if (typeof product !== "string" || product.trim() === "") {
        throw new Error(
          `${context}: el producto ${productIndex + 1} debe ser un texto no vacío.`,
        );
      }

      return product;
    });

    if (!isRecord(entry.customer)) {
      throw new Error(`${context}: "customer" debe ser un objeto.`);
    }

    if (!isRecord(entry.expected)) {
      throw new Error(`${context}: "expected" debe ser un objeto.`);
    }

    return {
      scenario,
      products,
      customer: {
        firstName: requiredString(entry.customer, "firstName", context),
        lastName: requiredString(entry.customer, "lastName", context),
        postalCode: requiredString(entry.customer, "postalCode", context),
      },
      expected: {
        subtotal: requiredString(entry.expected, "subtotal", context),
        tax: requiredString(entry.expected, "tax", context),
        total: requiredString(entry.expected, "total", context),
        confirmation: requiredString(entry.expected, "confirmation", context),
      },
    };
  });
}
