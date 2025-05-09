"use server";
import { getURLbasedOnEnv } from "@/utils";
import { revalidatePath } from "next/cache";

export async function deleteTodo(todoId: number, username: string) {
  const response = await fetch(
    `${await getURLbasedOnEnv()}/api/${username}/todos/${todoId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  revalidatePath("/");
  return await response.json();
}
