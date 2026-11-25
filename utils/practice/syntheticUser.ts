import { randomInt, randomUUID } from "node:crypto";

export interface SyntheticUserSeed {
  firstName: string;
  surnames: string[];
  domain: string;
}

export interface SyntheticUser {
  firstName: string;
  lastName: string;
  email: string;
}

function normalizeEmailPart(value: string): string {
  const normalized = value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");

  if (!normalized) {
    throw new Error("Los datos sintéticos deben producir un email válido.");
  }

  return normalized;
}

export function generateSyntheticUser(seed: SyntheticUserSeed): SyntheticUser {
  const surname = seed.surnames[randomInt(seed.surnames.length)];

  if (!surname) {
    throw new Error("No se pudo seleccionar un apellido para el usuario sintético.");
  }

  const firstName = seed.firstName.trim();
  const emailName = normalizeEmailPart(firstName);
  const emailSurname = normalizeEmailPart(surname);
  const email = `${emailName}_${emailSurname}_${randomUUID().slice(0, 8)}@${seed.domain}`;

  return {
    firstName,
    lastName: surname,
    email,
  };
}
