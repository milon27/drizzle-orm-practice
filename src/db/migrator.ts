// https://tone-row.com/blog/drizzle-orm-quickstart-tutorial-first-impressions

import { migrate } from "drizzle-orm/mysql2/migrator";
import { db } from "./db";
import path from "path";

// this will automatically run needed migrations on the database
// migrate(db, { migrationsFolder: path.resolve(__dirname, "src", "config", "db", "migrations") })
migrate(db, {
  migrationsFolder: path.resolve("migrations"),
})
  .then(() => {
    console.log("Migrations complete!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Migrations failed!", err);
    process.exit(1);
  });
