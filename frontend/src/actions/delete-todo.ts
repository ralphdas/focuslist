"use server";
import { revalidatePath } from "next/cache";
import { db } from "../../db/dbClient";
import { auth } from "@clerk/nextjs/server";

export async function deleteTodo(todoId: number): Promise<void> {
  const clerkUserId = (await auth()).userId;

  const result = await db
    .deleteFrom("todos")
    .where("id", "=", todoId)
    .where("clerk_external_id", "=", clerkUserId)
    .execute();

  if (result.length === 0) {
    throw new Error(
      "Todo not found or you do not have permission to delete it."
    );
  }

  revalidatePath("/");
}
