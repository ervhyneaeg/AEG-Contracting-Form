import { defineConfig } from "drizzle-kit";

// drizzle-kit doesn't auto-load .env files. Use Node 20.12+ builtin to load
// .env.local (preferred) then fall back to .env.
try {
  process.loadEnvFile(".env.local");
} catch {
  try {
    process.loadEnvFile(".env");
  } catch {
    // no env file present; rely on shell env
  }
}

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
