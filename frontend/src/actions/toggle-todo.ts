"use server";
import { revalidatePath } from "next/cache";
import { db } from "../../db/dbClient";
import { auth } from "@clerk/nextjs/server";

export async function toggleTodo(todoId: number) {
  const clerkUserId = (await auth()).userId;

  if (!clerkUserId) {
    // Optionally, you can throw an error or just return early
    // throw new Error("User not authenticated");
    return;
  }

  await db
    .updateTable("todos")
    .set({
      status: db.fn.coalesce(
        db
          .case()
          .when("status", "=", "completed")
          .then("pending")
          .else("completed")
          .end()
      ),
    })
    .where("clerk_external_id", "=", clerkUserId)
    .where("id", "=", todoId)
    .execute();

  revalidatePath("/");
}
