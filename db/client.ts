import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    "Missing DATABASE_URL. Set it to your Neon pooled connection string.",
  );
}

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });

export type Db = typeof db;
