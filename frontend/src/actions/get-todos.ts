"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "../../db/dbClient";

export async function getTodos() {
  const clerkUserId = (await auth()).userId;

  const todos = await db
    .selectFrom("todos")
    .select(["id", "title", "description", "status"])
    .where("clerk_external_id", "=", clerkUserId)
    .execute();

  return todos;
}
