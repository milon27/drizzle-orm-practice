import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { config } from "dotenv";
import * as blogSchema from "./schema/blog.schema";
import * as userSchema from "./schema/user.schema";
config();

// create the connection
const poolConnection = mysql.createPool({
  uri: process.env.DATABASE_URL,
});

export const db = drizzle(poolConnection, {
  logger: false,
  schema: {
    ...userSchema,
    ...blogSchema,
  },
});
