import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

// create the connection
const poolConnection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "test",
  // database: "my_db",
  // password: "myPassWord",
  // port: 3308,
});

export const db = drizzle(poolConnection, { logger: false });
