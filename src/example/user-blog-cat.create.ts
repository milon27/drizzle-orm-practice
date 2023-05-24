import { faker } from "@faker-js/faker";
import { createId } from "@paralleldrive/cuid2";
import { db } from "../db/db";
import {
  BlogSchema,
  BlogToCategorySchema,
  CategorySchema,
} from "../db/schema/blog.schema";
import { UserSchema } from "../db/schema/user.schema";
import { createRandomBlog, genSlug } from "../util";
import { createRandomUser } from "./user.crud";
import { sql } from "drizzle-orm";

// create 2 category, create 2 blog for a user, fetch them several way, filter, pagination
export const createUserBlogCategory = async () => {
  // * create a user first
  const userId = createId();
  await db.insert(UserSchema).values(createRandomUser(userId));
  console.log("create user done with", userId);
  // * create 3 category with one parent [one to many relation]
  const categoryTitle0 = "Development";
  const categoryTitle1 = "Web Development";
  const categoryTitle2 = "Mobile Development";

  await db
    .insert(CategorySchema)
    .values([
      {
        slug: genSlug(categoryTitle0),
        title: categoryTitle0.trim(),
        userId,
      },
      {
        slug: genSlug(categoryTitle1),
        title: categoryTitle1.trim(),
        userId,
        parentSlug: genSlug(categoryTitle0),
      },
      {
        slug: genSlug(categoryTitle2),
        title: categoryTitle2.trim(),
        userId,
        parentSlug: genSlug(categoryTitle0),
      },
      {
        // ! intentionally duplicated the value here onDuplicateKeyUpdate.
        slug: genSlug(categoryTitle2),
        title: categoryTitle2.trim(),
        userId,
        parentSlug: genSlug(categoryTitle0),
      },
    ])
    .onDuplicateKeyUpdate({
      set: {
        slug: sql`values(slug)`,
      },
    });

  console.log("3 cat done");

  // * create 3 blog [many to many relation]
  await db.transaction(async (tx) => {
    console.log("i am inside transaction");
    // create blog
    const title = faker.lorem.lines(1);
    const blogSlug = genSlug(title);
    await tx
      .insert(BlogSchema)
      .values(createRandomBlog(blogSlug, title, userId));
    // attach with 2 category (0,1)
    await tx.insert(BlogToCategorySchema).values({
      blogSlug: blogSlug,
      categorySlug: genSlug(categoryTitle0),
    });
    await tx.insert(BlogToCategorySchema).values({
      blogSlug: blogSlug,
      categorySlug: genSlug(categoryTitle1),
    });
  });
  console.log("============all done=============");
};
