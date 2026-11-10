import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "csv-parse/sync";

export type LoginOutcome = "success" | "locked_out";
export type DataFormat = "csv" | "json";

export interface SauceDemoUser {
  username: string;
  password: string;
  expectedOutcome: LoginOutcome;
}

export type LoginScenarioOutcome = "success" | "error";

export interface SauceDemoLoginScenario {
  scenario: string;
  username: string;
  password: string;
  expectedOutcome: LoginScenarioOutcome;
  expectedError: string;
}

export interface SauceDemoCheckoutScenario {
  scenario: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  postalCode: string;
  expectedError: string;
}

function readRecords(
  fileName: string,
  format: DataFormat,
): Record<string, string>[] {
  const csvPath = resolve(process.cwd(), "data", fileName);
  const contents = readFileSync(csvPath, "utf8");
  let records: Record<string, string>[];

  if (format === "csv") {
    records = parse(contents, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as Record<string, string>[];
  } else {
    const parsed: unknown = JSON.parse(contents);
    if (!Array.isArray(parsed)) {
      throw new Error(`El archivo ${fileName} debe contener un arreglo JSON.`);
    }

    records = parsed.map((record, index) => {
      if (typeof record !== "object" || record === null || Array.isArray(record)) {
        throw new Error(`Elemento ${index + 1} de ${fileName} debe ser un objeto JSON.`);
      }

      for (const [field, value] of Object.entries(record)) {
        if (typeof value !== "string") {
          throw new Error(
            `Elemento ${index + 1} de ${fileName}: ${field} debe ser texto.`,
          );
        }
      }

      return record as Record<string, string>;
    });
  }

  if (records.length === 0) {
    throw new Error(`El archivo ${fileName} no contiene escenarios.`);
  }

  return records;
}

function readCsvRecords(fileName: string): Record<string, string>[] {
  return readRecords(fileName, "csv");
}

function readField(
  record: Record<string, string>,
  field: string,
  rowNumber: number,
  fileName: string,
): string {
  const value = record[field];

  if (value === undefined) {
    throw new Error(`Fila ${rowNumber} de ${fileName}: falta la columna ${field}.`);
  }

  return value;
}

function readRequiredField(
  record: Record<string, string>,
  field: string,
  rowNumber: number,
  fileName: string,
): string {
  const value = readField(record, field, rowNumber, fileName);

  if (value.trim() === "") {
    throw new Error(`Fila ${rowNumber} de ${fileName}: ${field} es obligatorio.`);
  }

  return value;
}

export function loadSauceDemoUsers(): SauceDemoUser[] {
  const fileName = "saucedemo-users.csv";
  const records = readCsvRecords(fileName);

  return records.map((record, index) => {
    const { username, password, expectedOutcome } = record;

    if (!username || !password) {
      throw new Error(`Fila ${index + 2} de ${fileName}: username y password son obligatorios.`);
    }

    if (expectedOutcome !== "success" && expectedOutcome !== "locked_out") {
      throw new Error(
        `Fila ${index + 2} de ${fileName}: expectedOutcome debe ser "success" o "locked_out".`,
      );
    }

    return { username, password, expectedOutcome };
  });
}

export function loadSauceDemoLoginScenarios(
  format: DataFormat = "csv",
): SauceDemoLoginScenario[] {
  const extension = format === "csv" ? "csv" : "json";
  const fileName = `saucedemo-clase5-login.${extension}`;

  return readRecords(fileName, format).map((record, index) => {
    const rowNumber = index + 2;
    const expectedOutcome = readRequiredField(
      record,
      "expectedOutcome",
      rowNumber,
      fileName,
    );

    if (expectedOutcome !== "success" && expectedOutcome !== "error") {
      throw new Error(
        `Fila ${rowNumber} de ${fileName}: expectedOutcome debe ser "success" o "error".`,
      );
    }

    const expectedError = readField(record, "expectedError", rowNumber, fileName);
    if (expectedOutcome === "error" && !expectedError) {
      throw new Error(
        `Fila ${rowNumber} de ${fileName}: expectedError es obligatorio para escenarios de error.`,
      );
    }

    return {
      scenario: readRequiredField(record, "scenario", rowNumber, fileName),
      username: readRequiredField(record, "username", rowNumber, fileName),
      password: readRequiredField(record, "password", rowNumber, fileName),
      expectedOutcome,
      expectedError,
    };
  });
}

export function loadSauceDemoCheckoutScenarios(
  format: DataFormat = "csv",
): SauceDemoCheckoutScenario[] {
  const extension = format === "csv" ? "csv" : "json";
  const fileName = `saucedemo-clase5-checkout.${extension}`;

  return readRecords(fileName, format).map((record, index) => {
    const rowNumber = index + 2;

    return {
      scenario: readRequiredField(record, "scenario", rowNumber, fileName),
      username: readRequiredField(record, "username", rowNumber, fileName),
      password: readRequiredField(record, "password", rowNumber, fileName),
      firstName: readField(record, "firstName", rowNumber, fileName),
      lastName: readField(record, "lastName", rowNumber, fileName),
      postalCode: readField(record, "postalCode", rowNumber, fileName),
      expectedError: readRequiredField(
        record,
        "expectedError",
        rowNumber,
        fileName,
      ),
    };
  });
}