import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export interface AutomationPracticeUserData {
  scenario: string;
  userName: string;
  password: string;
  expectSuccess: boolean;
  msjError: string;
}

export function loadAutomationPracticeDataProvider(): AutomationPracticeUserData[] {
  const jsonPath = resolve(
    process.cwd(),
    "data",
    "automation-practice-users.json",
  );
  const rawData: unknown = JSON.parse(readFileSync(jsonPath, "utf8"));

  if (!rawData || typeof rawData !== "object" || Array.isArray(rawData)) {
    throw new Error(
      "El archivo automation-practice-users.json debe contener un objeto de escenarios.",
    );
  }

  return Object.entries(rawData as Record<string, unknown>).map(
    ([key, value]) => {
      if (!key.trim()) {
        throw new Error(
          "Cada escenario de automation-practice-users.json debe tener una clave no vacia.",
        );
      }

      if (!value || typeof value !== "object" || Array.isArray(value)) {
        throw new Error(`El escenario "${key}" debe ser un objeto.`);
      }

      const scenario = value as Record<string, unknown>;
      const { scenario: name, userName, password, expectSuccess, msjError } =
        scenario;

      if (
        typeof name !== "string" ||
        !name.trim() ||
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

      return {
        scenario: name,
        userName,
        password,
        expectSuccess,
        msjError,
      };
    },
  );
}
