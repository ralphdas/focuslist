"use server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "../../db/dbClient";

export async function addTodo(formData: FormData): Promise<void> {
  const clerkUser = await auth();
  if (!clerkUser.userId) {
    throw new Error("User not authenticated");
  }

  const title = formData.get("title");
  const description = formData.get("description");

  if (typeof title !== "string" || typeof description !== "string") {
    throw new Error("Invalid form data");
  }

  await db
    .insertInto("todos")
    .values({
      clerk_external_id: clerkUser.userId,
      title,
      description,
      status: "pending",
    })
    .returningAll()
    .execute();

  revalidatePath("/");
}
