import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { SyntheticUserSeed } from "./syntheticUser";

export interface ContactScenario {
  scenario: string;
  userIdentity: SyntheticUserSeed;
  message: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredText(
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

export function loadContactScenarios(): ContactScenario[] {
  const jsonPath = resolve(
    process.cwd(),
    "data",
    "practice-contact-scenarios.json",
  );
  const parsed: unknown = JSON.parse(readFileSync(jsonPath, "utf8"));

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("El JSON de contacto debe contener escenarios.");
  }

  return parsed.map((entry, index) => {
    const context = `Escenario ${index + 1}`;

    if (!isRecord(entry)) {
      throw new Error(`${context}: debe ser un objeto JSON.`);
    }

    const userIdentity = entry.userIdentity;
    if (!isRecord(userIdentity)) {
      throw new Error(`${context}: "userIdentity" debe ser un objeto.`);
    }

    const rawSurnames = userIdentity.surnames;
    if (!Array.isArray(rawSurnames) || rawSurnames.length === 0) {
      throw new Error(`${context}: "surnames" debe ser una lista no vacía.`);
    }

    const surnames = rawSurnames.map((surname, surnameIndex) => {
      if (typeof surname !== "string" || surname.trim() === "") {
        throw new Error(
          `${context}: apellido ${surnameIndex + 1} debe ser un texto no vacío.`,
        );
      }

      return surname;
    });

    return {
      scenario: requiredText(entry, "scenario", context),
      userIdentity: {
        firstName: requiredText(userIdentity, "firstName", context),
        surnames,
        domain: requiredText(userIdentity, "domain", context),
      },
      message: requiredText(entry, "message", context),
    };
  });
}
