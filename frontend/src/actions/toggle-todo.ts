"use server";
import { getURLbasedOnEnv } from "@/utils";
import { revalidatePath } from "next/cache";

export async function toggleTodo(todoId: number, username: string) {
  const response = await fetch(
    `${await getURLbasedOnEnv()}/api/${username}/todos/${todoId}/toggle`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to toggle todo with id: ${todoId}`);
  }

  revalidatePath("/");
  return await response.json();
}
