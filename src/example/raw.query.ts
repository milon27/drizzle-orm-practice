import { sql } from "drizzle-orm";
import { MySqlQueryResult } from "drizzle-orm/mysql2";
import { db } from "../db/db";
import { User, UserSchema } from "../db/schema/user.schema";

export const runRaw = async () => {
  // -----------raw query
  const result: MySqlQueryResult<User[]> = (await db.execute<User[]>(
    sql`select * from ${UserSchema} limit 2`
  )) as any;
  console.log("user list => ", result[0]);
  const testData: MySqlQueryResult<{ time: string }> = (await db.execute(
    sql`select now() as time`
  )) as any;
  console.log("time=> ", testData[0][0].time);
};
