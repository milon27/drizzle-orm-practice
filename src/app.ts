import { createUserBlogCategory } from "./example/user-blog-cat.create";
import { runSelect } from "./example/user-blog-cat.select";
import { crudUsers } from "./example/user.crud";

const run = async () => {
  // await crudUsers();
  // await createUserBlogCategory();
  await runSelect();
  process.exit(0);
};

run();
