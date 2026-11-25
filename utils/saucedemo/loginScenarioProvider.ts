import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export type LoginScenarioOutcome = "success" | "error";

export interface SauceDemoLoginScenario {
  scenario: string;
  username: string;
  password: string;
  expectedOutcome: LoginScenarioOutcome;
  expectedError: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(
  record: Record<string, unknown>,
  field: string,
  scenarioNumber: number,
): string {
  const value = record[field];

  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(
      `Escenario ${scenarioNumber}: "${field}" debe ser un texto no vacío.`,
    );
  }

  return value;
}

export function loadSauceDemoLoginScenarios(): SauceDemoLoginScenario[] {
  const jsonPath = resolve(
    process.cwd(),
    "data",
    "saucedemo-login-scenarios.json",
  );
  const parsed: unknown = JSON.parse(readFileSync(jsonPath, "utf8"));

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("El JSON de escenarios debe contener una lista no vacía.");
  }

  return parsed.map((entry, index) => {
    const scenarioNumber = index + 1;

    if (!isRecord(entry)) {
      throw new Error(`Escenario ${scenarioNumber}: debe ser un objeto JSON.`);
    }

    const scenario = requiredString(entry, "scenario", scenarioNumber);
    const username = requiredString(entry, "username", scenarioNumber);
    const password = requiredString(entry, "password", scenarioNumber);
    const expectedOutcome = entry.expectedOutcome;
    const expectedError = entry.expectedError;

    if (expectedOutcome !== "success" && expectedOutcome !== "error") {
      throw new Error(
        `Escenario ${scenarioNumber}: "expectedOutcome" debe ser "success" o "error".`,
      );
    }

    if (typeof expectedError !== "string") {
      throw new Error(
        `Escenario ${scenarioNumber}: "expectedError" debe ser un texto.`,
      );
    }

    if (
      (expectedOutcome === "success" && expectedError.trim() !== "") ||
      (expectedOutcome === "error" && expectedError.trim() === "")
    ) {
      throw new Error(
        `Escenario ${scenarioNumber}: "expectedError" debe estar vacío para success y contener un mensaje para error.`,
      );
    }

    return {
      scenario,
      username,
      password,
      expectedOutcome,
      expectedError,
    };
  });
}

