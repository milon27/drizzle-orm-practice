import { faker } from "@faker-js/faker";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { CreateUser, UserSchema } from "../db/schema/user.schema";

export function createRandomUser(id: string) {
  return {
    id,
    fullName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  } satisfies CreateUser;
}

export const crudUsers = async () => {
  // * insert
  const userId = createId();
  console.log("insert id ", userId, " ===============");
  await db.insert(UserSchema).values(createRandomUser(userId));
  // * read
  console.log("read===============================");
  const users = await db
    .select()
    .from(UserSchema)
    .where(eq(UserSchema.id, userId));
  console.log({ user: users[0] });
  // * update
  console.log("update===============================");
  await db.update(UserSchema).set({
    isEmailVerified: true,
    fullName: undefined,
  });

  // * read again
  console.log("read again===============================");
  const usersAfterUpdate = await db
    .select()
    .from(UserSchema)
    .where(eq(UserSchema.id, userId));
  console.log({ updateUser: usersAfterUpdate[0] });

  // * delete
  console.log("delete===============================");
  const p = await db.delete(UserSchema).where(eq(UserSchema.id, userId));
  console.log(
    p[0].affectedRows > 0 ? "user deleted" : "no user found for delete"
  );
};
