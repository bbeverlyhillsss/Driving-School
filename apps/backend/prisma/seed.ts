import bcrypt from "bcrypt";
import { env } from "../src/config/config.js";
import { prisma } from "../src/config/database.js";

// ADMIN
const seedAdmin = async () => {
  const passwordHash = await bcrypt.hash(env.ADMIN_PASSWORD, 10);

  await prisma.user.upsert({
    where: { email: env.ADMIN_EMAIL },
    update: {},
    create: {
      email: env.ADMIN_EMAIL,
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log(`Admin ready: ${env.ADMIN_EMAIL}`);
};

// CATEGORIES
const categoriesData = [
  { name: "A", minAge: 16, theoryHours: 20, practiceHours: 10, price: 8000 },
  { name: "B", minAge: 18, theoryHours: 60, practiceHours: 30, price: 15000 },
  { name: "C", minAge: 18, theoryHours: 60, practiceHours: 40, price: 20000 },
];

const seedCategories = async () => {
  const ids: Record<string, number> = {};

  for (const data of categoriesData) {
    const existing = await prisma.category.findFirst({
      where: { name: data.name },
    });
    const category = existing ?? (await prisma.category.create({ data }));
    ids[data.name] = category.id;
  }

  console.log(`Categories ready: ${Object.keys(ids).join(", ")}`);
  return ids;
};

// CARS
const seedCars = async (categoryIds: Record<string, number>) => {
  const carsData = [
    {
      category: "B",
      brand: "Renault",
      model: "Logan",
      plateNumber: "AB1234CD",
      year: 2020,
    },
    {
      category: "B",
      brand: "Skoda",
      model: "Octavia",
      plateNumber: "AB5678CD",
      year: 2021,
    },
    {
      category: "A",
      brand: "Honda",
      model: "CBR500R",
      plateNumber: "AB1111CD",
      year: 2019,
    },
    {
      category: "C",
      brand: "Mercedes",
      model: "Atego",
      plateNumber: "AB2222CD",
      year: 2018,
    },
  ];

  for (const { category, ...car } of carsData) {
    await prisma.car.upsert({
      where: { plateNumber: car.plateNumber },
      update: {},
      create: { ...car, categoryId: categoryIds[category]! },
    });
  }

  console.log(`Cars ready: ${carsData.length}`);
};

const main = async () => {
  await seedAdmin();
  const categoryIds = await seedCategories();
  await seedCars(categoryIds);
};

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

// pnpm --filter backend seed
