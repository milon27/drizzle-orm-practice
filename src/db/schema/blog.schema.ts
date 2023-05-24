import { InferModel, relations, sql } from "drizzle-orm";
import {
  AnyMySqlColumn,
  datetime,
  mysqlTable,
  varchar,
} from "drizzle-orm/mysql-core";
import { DbConstant } from "../db.constant";
import { UserSchema } from "./user.schema";

export const BlogSchema = mysqlTable("blog", {
  slug: varchar("slug", { length: 500 }).notNull().primaryKey(),
  title: varchar("title", { length: 450 }).notNull(),
  content: varchar("content", { length: 2000 }).notNull(),
  userId: varchar("user_id", DbConstant.UUID_OPTION)
    .notNull()
    .references(() => UserSchema.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  createdAt: datetime("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`), // todo: auto update
});

export const BlogRelations = relations(BlogSchema, ({ one, many }) => {
  return {
    author: one(UserSchema, {
      fields: [BlogSchema.userId],
      references: [UserSchema.id],
    }),
    blogToCategories: many(BlogToCategorySchema),
  };
});

export type Blog = InferModel<typeof BlogSchema, "select">;
export type CreateBlog = InferModel<typeof BlogSchema, "insert">;

export const CategorySchema = mysqlTable("category", {
  slug: varchar("slug", { length: 100 }).primaryKey().notNull(),
  title: varchar("title", { length: 50 }).notNull(),
  parentSlug: varchar("parent_slug", { length: 100 }).references(
    (): AnyMySqlColumn => CategorySchema.slug,
    {
      onDelete: "cascade",
      onUpdate: "cascade",
    }
  ), // self-referencing foreign key + nullable
  userId: varchar("user_id", DbConstant.UUID_OPTION)
    .notNull()
    .references(() => UserSchema.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  createdAt: datetime("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const CategoryRelations = relations(CategorySchema, ({ one, many }) => {
  return {
    author: one(UserSchema, {
      fields: [CategorySchema.userId],
      references: [UserSchema.id],
    }),
    blogToCategories: many(BlogToCategorySchema),
  };
});

export type Category = InferModel<typeof CategorySchema, "select">;
export type CreateCategory = InferModel<typeof CategorySchema, "insert">;

// blog to category many to many

export const BlogToCategorySchema = mysqlTable("blog_to_category", {
  blogSlug: varchar("blog_slug", { length: 500 }).references(
    () => BlogSchema.slug,
    {
      onDelete: "cascade",
      onUpdate: "cascade",
    }
  ),
  categorySlug: varchar("category_slug", { length: 100 }).references(
    () => CategorySchema.slug,
    {
      onDelete: "cascade",
      onUpdate: "cascade",
    }
  ),
});

export const BlogToCategoryRelations = relations(
  BlogToCategorySchema,
  ({ one }) => ({
    blog: one(BlogSchema, {
      fields: [BlogToCategorySchema.blogSlug],
      references: [BlogSchema.slug],
    }),
    category: one(CategorySchema, {
      fields: [BlogToCategorySchema.categorySlug],
      references: [CategorySchema.slug],
    }),
  })
);
