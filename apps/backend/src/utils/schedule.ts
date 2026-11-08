export const toDbDate = (value: string): Date => new Date(`${value}T00:00:00.000Z`);

export const toDbTime = (value: string): Date => new Date(`1970-01-01T${value}:00.000Z`);

export const fromDbDate = (value: Date): string => value.toISOString().slice(0, 10);

export const fromDbTime = (value: Date): string => value.toISOString().slice(11, 16);

export const todayString = (): string => new Date().toLocaleDateString("sv-SE");