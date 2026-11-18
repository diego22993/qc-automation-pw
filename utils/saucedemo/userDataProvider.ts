import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "csv-parse/sync";

export interface UserData {
  scenario: string;
  userName: string;
  password: string;
  expectSuccess: boolean;
  msjError: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validateUserData(
  value: unknown,
  scenarioKey: string,
): asserts value is UserData {
  if (!isRecord(value)) {
    throw new Error(`El escenario "${scenarioKey}" debe ser un objeto.`);
  }

  const requiredTextFields = ["scenario", "userName", "password"] as const;

  for (const field of requiredTextFields) {
    if (typeof value[field] !== "string" || value[field].trim() === "") {
      throw new Error(
        `El campo "${field}" del escenario "${scenarioKey}" es obligatorio.`,
      );
    }
  }

  if (typeof value.expectSuccess !== "boolean") {
    throw new Error(
      `El campo "expectSuccess" del escenario "${scenarioKey}" debe ser booleano.`,
    );
  }

  if (typeof value.msjError !== "string") {
    throw new Error(
      `El campo "msjError" del escenario "${scenarioKey}" debe ser texto.`,
    );
  }

  if (!value.expectSuccess && value.msjError.trim() === "") {
    throw new Error(
      `El escenario fallido "${scenarioKey}" debe declarar "msjError".`,
    );
  }
}

export function loadUserData(): UserData[] {
  const jsonPath = resolve(__dirname, "../../data/userdata-provider.json");
  let parsedData: unknown;

  try {
    parsedData = JSON.parse(readFileSync(jsonPath, "utf8"));
  } catch (error) {
    throw new Error(
      `No se pudo cargar el archivo de usuarios: ${jsonPath}`,
      { cause: error },
    );
  }

  if (!isRecord(parsedData)) {
    throw new Error("El archivo de usuarios debe contener un objeto de escenarios.");
  }

  return Object.entries(parsedData).map(([scenarioKey, value]) => {
    validateUserData(value, scenarioKey);
    return value;
  });
}

export function userDataProvider(): UserData[] {
  return loadUserData();
}

export type LoginOutcome = "success" | "locked_out";

export interface SauceDemoUser {
  username: string;
  password: string;
  expectedOutcome: LoginOutcome;
}

export function loadSauceDemoUsers(): SauceDemoUser[] {
  const csvPath = resolve(__dirname, "../../data/saucedemo-users.csv");
  let records: Record<string, string>[];

  try {
    records = parse(readFileSync(csvPath), {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as Record<string, string>[];
  } catch (error) {
    throw new Error(
      `No se pudo cargar el archivo CSV de usuarios: ${csvPath}`,
      { cause: error },
    );
  }

  return records.map((record, index) => {
    const { username, password, expectedOutcome } = record;

    if (!username || !password) {
      throw new Error(`Fila ${index + 2} del CSV: username y password son obligatorios.`);
    }

    if (expectedOutcome !== "success" && expectedOutcome !== "locked_out") {
      throw new Error(
        `Fila ${index + 2} del CSV: expectedOutcome debe ser "success" o "locked_out".`,
      );
    }

    return { username, password, expectedOutcome };
  });
}
