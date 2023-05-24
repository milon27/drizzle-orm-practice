import type { Config } from "drizzle-kit";
// import { config } from "dotenv";
// config();

export default {
  schema: "./src/db/schema",
  out: "./.drizzle/migrations",
  breakpoints: true,
  // connectionString: process.env.DATABASE_URL, // only for db push
} satisfies Config;
