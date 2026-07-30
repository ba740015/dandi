import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Prefer .env.local (Next.js), then fall back to .env
config({ path: ".env.local" });
config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Direct/session connection for migrations (port 5432)
    url: env("DIRECT_URL"),
  },
});
