// https://tone-row.com/blog/drizzle-orm-quickstart-tutorial-first-impressions

import { migrate } from "drizzle-orm/mysql2/migrator";
import { db } from "../src/db/db";
import path from "path";

// this will automatically run needed migrations on the database
// migrate(db, { migrationsFolder: path.resolve(__dirname, "src", "config", "db", "migrations") })
export const migrationPath = path.resolve(".drizzle", "migrations");

migrate(db, {
  migrationsFolder: migrationPath,
})
  .then(() => {
    console.log("Migrations complete!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Migrations failed!", err);
    process.exit(1);
  });
