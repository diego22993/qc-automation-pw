import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "csv-parse/sync";

export type LoginOutcome = "success" | "locked_out";

export interface SauceDemoUser {
  username: string;
  password: string;
  expectedOutcome: LoginOutcome;
}

export function loadSauceDemoUsers(): SauceDemoUser[] {
  const csvPath = resolve(__dirname, "../../data/saucedemo-users.csv");
  const records = parse(readFileSync(csvPath, "utf8"), {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as Record<string, string>[];

  if (records.length === 0) {
    throw new Error("El CSV de usuarios debe contener al menos un escenario.");
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