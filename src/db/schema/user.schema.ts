import {
  boolean,
  datetime,
  mysqlEnum,
  mysqlTable,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";
import { InferModel, relations, sql } from "drizzle-orm";
import { DbConstant } from "../db.constant";
import { BlogSchema, CategorySchema } from "./blog.schema";

export const UserSchema = mysqlTable(
  "user",
  {
    id: varchar("id", DbConstant.UUID_OPTION).primaryKey(), // .default(sql`UUID()`)
    fullName: varchar("full_name", { length: 50 }).notNull(),
    email: varchar("email", { length: 100 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    isEmailVerified: boolean("is_email_verified").notNull().default(false),
    role: mysqlEnum("role", ["admin", "user"]).notNull().default("user"),
    createdAt: datetime("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: datetime("updated_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`), // todo: auto update
  },
  (userSchema) => {
    return {
      emailUniqueIndex: uniqueIndex("email_unique_index").on(userSchema.email),
    };
  }
);

// user has many blog and many category
export const UserRelations = relations(UserSchema, ({ one, many }) => {
  return {
    blogs: many(BlogSchema),
    categories: many(CategorySchema),
  };
});

export type User = InferModel<typeof UserSchema, "select">; // return type when queried
export type CreateUser = InferModel<typeof UserSchema, "insert">; // insert type
