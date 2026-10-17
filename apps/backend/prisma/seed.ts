import bcrypt from "bcrypt";
import { env } from "../src/config/config.js";
import { prisma } from "../src/config/database.js";

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

const main = async () => {
  await seedAdmin();
};

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());