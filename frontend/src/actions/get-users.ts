"use server";
import { db } from "../../db/dbClient";

export async function getUsers() {
  const results = await db
    .selectFrom("todos")
    .innerJoin("users", "todos.user_id", "users.id")
    .groupBy("users.id")
    .select(["users.username", db.fn.count("todos.id").as("todoCount")])
    .execute();

  return results;
}
