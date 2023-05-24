// const genSlug = (title: string) => {
//     return ,
// }

import { faker } from "@faker-js/faker";
import { CreateBlog } from "./db/schema/blog.schema";

export function genSlug(title: string) {
  return title.toLowerCase().replaceAll(" ", "-").trim();
}

export function createRandomBlog(slug: string, title: string, userId: string) {
  return {
    title,
    slug,
    content: faker.lorem.paragraph(5),
    userId,
  } satisfies CreateBlog;
}
