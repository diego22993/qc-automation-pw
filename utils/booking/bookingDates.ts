function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function futureStay(daysAhead = 45, nights = 5): {
  checkIn: string;
  checkOut: string;
} {
  if (!Number.isInteger(daysAhead) || daysAhead < 1) {
    throw new Error("La fecha de ingreso debe ser futura.");
  }

  if (!Number.isInteger(nights) || nights < 1) {
    throw new Error("La estadía debe durar al menos una noche.");
  }

  const checkIn = new Date();
  checkIn.setHours(12, 0, 0, 0);
  checkIn.setDate(checkIn.getDate() + daysAhead);

  const checkOut = new Date(checkIn);
  checkOut.setDate(checkOut.getDate() + nights);

  return {
    checkIn: formatLocalDate(checkIn),
    checkOut: formatLocalDate(checkOut),
  };
}