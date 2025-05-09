import { Kysely } from "kysely";
import { Database } from "../db/schema";

export function checkIfTodoExists(
  db: Kysely<Database>,
  username: string,
  todoId: number
) {
  return db
    .selectFrom("todos")
    .selectAll()
    .where("id", "=", todoId)
    .where(
      "user_id",
      "=",
      db.selectFrom("users").select("id").where("username", "=", username)
    )
    .executeTakeFirst() as Promise<Database["todos"] | undefined>;
}
