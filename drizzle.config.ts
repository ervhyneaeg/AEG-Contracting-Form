import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  // eslint-disable-next-line no-console
  console.warn("[drizzle.config] DATABASE_URL is not set. CLI commands will fail until it is.");
}

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
  strict: true,
  verbose: true,
});
