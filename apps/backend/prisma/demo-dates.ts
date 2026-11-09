import { isWorkingDay } from "@driving-school/shared";

const toUtc = (value: string): Date => new Date(`${value}T00:00:00Z`);

export const addDays = (value: string, days: number): string => {
  const date = toUtc(value);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
};

export const addWorkingDays = (value: string, count: number): string => {
  const step = count < 0 ? -1 : 1;
  let remaining = Math.abs(count);
  let current = value;

  while (remaining > 0) {
    current = addDays(current, step);
    if (isWorkingDay(current)) remaining -= 1;
  }

  return current;
};

export const workingDayOnOrBefore = (value: string): string => {
  let current = value;
  while (!isWorkingDay(current)) current = addDays(current, -1);
  return current;
};

export const workingDayOnOrAfter = (value: string): string => {
  let current = value;
  while (!isWorkingDay(current)) current = addDays(current, 1);
  return current;
};