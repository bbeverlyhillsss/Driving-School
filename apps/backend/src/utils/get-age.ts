export const getAge = (birthDate: Date, onDate: Date): number => {
  let age = onDate.getUTCFullYear() - birthDate.getUTCFullYear();
  const monthDiff = onDate.getUTCMonth() - birthDate.getUTCMonth();

  if (monthDiff < 0 || (monthDiff === 0 && onDate.getUTCDate() < birthDate.getUTCDate())) {
    age -= 1;
  }

  return age;
};