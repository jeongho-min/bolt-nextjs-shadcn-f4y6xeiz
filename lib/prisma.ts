import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

// Test database connection
prisma
  .$connect()
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((e) => {
    console.error("Database connection failed:", e);
  });

export default prisma;
