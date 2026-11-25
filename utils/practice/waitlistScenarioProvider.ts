import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  generateSyntheticUser,
  type SyntheticUserSeed,
} from "./syntheticUser";

export interface WaitlistScenario {
  scenario: string;
  emailIdentity: SyntheticUserSeed;
  preferences: {
    timezone: { label: string; tagValue: string };
    framework: { label: string; tagValue: string };
    discoverySource: { label: string; tagValue: string };
  };
  expectedSuccessMessage: string;
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

function requiredRecord(
  record: Record<string, unknown>,
  field: string,
  context: string,
): Record<string, unknown> {
  const value = record[field];

  if (!isRecord(value)) {
    throw new Error(`${context}: "${field}" debe ser un objeto.`);
  }

  return value;
}

function requiredSelection(
  value: unknown,
  field: string,
  context: string,
): { label: string; tagValue: string } {
  if (!isRecord(value)) {
    throw new Error(`${context}: "${field}" debe ser un objeto.`);
  }

  return {
    label: requiredText(value, "label", context),
    tagValue: requiredText(value, "tagValue", context),
  };
}

export function loadWaitlistScenarios(): WaitlistScenario[] {
  const jsonPath = resolve(process.cwd(), "data", "kit-waitlist-scenarios.json");
  const parsed: unknown = JSON.parse(readFileSync(jsonPath, "utf8"));

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("El JSON de waitlist debe contener escenarios.");
  }

  return parsed.map((entry, index) => {
    const context = `Escenario ${index + 1}`;

    if (!isRecord(entry)) {
      throw new Error(`${context}: debe ser un objeto JSON.`);
    }

    const emailIdentity = requiredRecord(entry, "emailIdentity", context);
    const rawSurnames = emailIdentity.surnames;

    if (
      !Array.isArray(rawSurnames) ||
      rawSurnames.length === 0 ||
      rawSurnames.some(
        (surname) => typeof surname !== "string" || surname.trim() === "",
      )
    ) {
      throw new Error(
        `${context}: "emailIdentity.surnames" debe ser una lista de textos no vacía.`,
      );
    }

    const preferences = requiredRecord(entry, "preferences", context);

    return {
      scenario: requiredText(entry, "scenario", context),
      emailIdentity: {
        firstName: requiredText(emailIdentity, "firstName", context),
        surnames: rawSurnames,
        domain: requiredText(emailIdentity, "domain", context),
      },
      preferences: {
        timezone: requiredSelection(
          preferences.timezone,
          "timezone",
          context,
        ),
        framework: requiredSelection(
          preferences.framework,
          "framework",
          context,
        ),
        discoverySource: requiredSelection(
          preferences.discoverySource,
          "discoverySource",
          context,
        ),
      },
      expectedSuccessMessage: requiredText(
        entry,
        "expectedSuccessMessage",
        context,
      ),
    };
  });
}

export function generateWaitlistEmail(scenario: WaitlistScenario): string {
  return generateSyntheticUser(scenario.emailIdentity).email;
}
