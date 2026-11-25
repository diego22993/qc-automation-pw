import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export interface AutomationPracticeUserData {
  scenario: string;
  userName: string;
  password: string;
  expectSuccess: boolean;
  msjError: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function loadAutomationPracticeUserData(): AutomationPracticeUserData[] {
  const jsonPath = resolve(
    process.cwd(),
    "data",
    "automationpractice-users.json",
  );
  const rawData: unknown = JSON.parse(readFileSync(jsonPath, "utf8"));

  if (!isRecord(rawData) || Object.keys(rawData).length === 0) {
    throw new Error(
      "automationpractice-users.json debe contener un objeto de escenarios no vacío.",
    );
  }

  return Object.entries(rawData).map(([key, value]) => {
    if (!key.trim() || !isRecord(value)) {
      throw new Error(
        `El escenario "${key}" de automationpractice-users.json debe ser un objeto con una clave no vacía.`,
      );
    }

    const { scenario, userName, password, expectSuccess, msjError } = value;
    if (
      typeof scenario !== "string" ||
      !scenario.trim() ||
      typeof userName !== "string" ||
      !userName.trim() ||
      typeof password !== "string" ||
      !password.trim() ||
      typeof expectSuccess !== "boolean" ||
      typeof msjError !== "string"
    ) {
      throw new Error(
        `El escenario "${key}" no cumple el contrato de AutomationPracticeUserData.`,
      );
    }

    if (expectSuccess && msjError.trim()) {
      throw new Error(
        `El escenario exitoso "${key}" no debe definir un mensaje de error.`,
      );
    }

    if (!expectSuccess && !msjError.trim()) {
      throw new Error(
        `El escenario fallido "${key}" debe definir msjError.`,
      );
    }

    return { scenario, userName, password, expectSuccess, msjError };
  });
}
