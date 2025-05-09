"use server";
import { revalidatePath } from "next/cache";
import { getURLbasedOnEnv } from "@/utils";

export async function addTodo(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const username = formData.get("username") as string;

  const response = await fetch(
    `${await getURLbasedOnEnv()}/api/${username}/todos`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    }
  );

  console.log("Response from API:", await response.json());

  if (!response.ok) {
    throw new Error(`Failed to add todo`);
  }

  revalidatePath("/");
}
