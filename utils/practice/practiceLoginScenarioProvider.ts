import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export type PracticeLoginOutcome = "success" | "error";

export interface PracticeLoginScenario {
  scenario: string;
  username: string;
  password: string;
  expectedOutcome: PracticeLoginOutcome;
  expectedUrlPart: string;
  expectedMessage: string;
  expectedError: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredText(
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

function textValue(
  record: Record<string, unknown>,
  field: string,
  scenarioNumber: number,
): string {
  const value = record[field];

  if (typeof value !== "string") {
    throw new Error(
      `Escenario ${scenarioNumber}: "${field}" debe ser un texto.`,
    );
  }

  return value;
}

export function loadPracticeLoginScenarios(): PracticeLoginScenario[] {
  const jsonPath = resolve(
    process.cwd(),
    "data",
    "practice-test-login-scenarios.json",
  );
  const parsed: unknown = JSON.parse(readFileSync(jsonPath, "utf8"));

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error(
      "El JSON de login de Practice Test debe contener escenarios.",
    );
  }

  return parsed.map((entry, index) => {
    const scenarioNumber = index + 1;

    if (!isRecord(entry)) {
      throw new Error(`Escenario ${scenarioNumber}: debe ser un objeto JSON.`);
    }

    const scenario = requiredText(entry, "scenario", scenarioNumber);
    const username = requiredText(entry, "username", scenarioNumber);
    const password = requiredText(entry, "password", scenarioNumber);
    const expectedOutcome = entry.expectedOutcome;
    const expectedUrlPart = textValue(
      entry,
      "expectedUrlPart",
      scenarioNumber,
    );
    const expectedMessage = textValue(
      entry,
      "expectedMessage",
      scenarioNumber,
    );
    const expectedError = textValue(entry, "expectedError", scenarioNumber);

    if (expectedOutcome !== "success" && expectedOutcome !== "error") {
      throw new Error(
        `Escenario ${scenarioNumber}: "expectedOutcome" debe ser "success" o "error".`,
      );
    }

    const validExpectedValues =
      expectedOutcome === "success"
        ? expectedUrlPart.trim() !== "" &&
          expectedMessage.trim() !== "" &&
          expectedError.trim() === ""
        : expectedError.trim() !== "" &&
          expectedUrlPart.trim() === "" &&
          expectedMessage.trim() === "";

    if (!validExpectedValues) {
      throw new Error(
        `Escenario ${scenarioNumber}: los resultados esperados no corresponden a "${expectedOutcome}".`,
      );
    }

    return {
      scenario,
      username,
      password,
      expectedOutcome,
      expectedUrlPart,
      expectedMessage,
      expectedError,
    };
  });
}
