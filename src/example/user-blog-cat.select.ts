// get a user
//-> with all his post
// -> all post will have all category

import { desc } from "drizzle-orm";
import { db } from "../db/db";
import { UserSchema } from "../db/schema/user.schema";

export const runSelect = async () => {
  const data = await db.query.UserSchema.findMany({
    // extras: { // virtual column
    //   fullName: sql<string>`concat(${users.name}, " ", ${users.name})`.as(
    //     "full_name"
    //   ),
    // },
    with: {
      blogs: {
        columns: {
          slug: true,
        },
        with: {
          author: {
            columns: {
              fullName: true,
            },
          },
          blogToCategories: {
            columns: {},
            with: {
              category: true,
            },
          },
        },
      },
    },
    // orderBy: desc(UserSchema.createdAt),
  });

  console.log(JSON.stringify(data, null, 2));
};
