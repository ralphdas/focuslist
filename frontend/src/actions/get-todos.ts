"use server";
import { Todo } from "@/app/types";
import { getURLbasedOnEnv } from "@/utils";
import { auth } from "@clerk/nextjs/server";

export async function getTodos(username: string) {
  const { getToken } = await auth();
  const token = await getToken();

  const response = await fetch(
    `${await getURLbasedOnEnv()}/api/${username}/todos`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch todos for user: ${username}`);
  }

  const todos = <Todo[]>await response.json();
  return todos;
}
