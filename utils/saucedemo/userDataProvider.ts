import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export type LoginOutcome = "success" | "locked_out";

export interface SauceDemoUser {
  username: string;
  password: string;
  expectedOutcome: LoginOutcome;
  scenario?: string;
}

interface JsonUserRecord {
  scenario?: string;
  userName?: string;
  username?: string;
  password?: string;
  expectSuccess?: boolean;
  expectedOutcome?: string;
}

export function loadSauceDemoUsers(): SauceDemoUser[] {
  const jsonPath = resolve(process.cwd(), "data", "userdata-provider.json");
  const raw = JSON.parse(readFileSync(jsonPath, "utf-8")) as Record<string, JsonUserRecord>;

  return Object.values(raw).map((record, index) => {
    const username = record.userName ?? record.username;
    const password = record.password;
    const expectedOutcome =
      record.expectedOutcome === "locked_out" || record.expectedOutcome === "success"
        ? record.expectedOutcome
        : record.expectSuccess === false
          ? "locked_out"
          : "success";

    if (!username || !password) {
      throw new Error(`Registro ${index + 1} del JSON: username y password son obligatorios.`);
    }

    return {
      username,
      password,
      expectedOutcome,
      scenario: record.scenario,
    };
  });
}