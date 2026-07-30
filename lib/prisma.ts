import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pgPool: Pool | undefined;
};

function createPrismaClient() {
  const rawUrl = process.env.DATABASE_URL;

  if (!rawUrl) {
    throw new Error(
      "DATABASE_URL is not set. Add your Supabase connection string to .env.local.",
    );
  }

  // Strip sslmode from the URL so Pool ssl options take effect
  const connectionString = rawUrl
    .replace(/[?&]sslmode=[^&]*/g, "")
    .replace(/\?&/, "?")
    .replace(/[?&]$/, "");

  const pool =
    globalForPrisma.pgPool ??
    new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.pgPool = pool;
  }

  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
