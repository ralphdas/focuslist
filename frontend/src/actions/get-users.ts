"use server";
import { User } from "@/app/types";
import { getURLbasedOnEnv } from "@/utils";

export async function getUsers() {
  const response = await fetch(`${await getURLbasedOnEnv()}/api/users`, {
    method: "GET",
    cf: {
      cacheTtl: 60,
      cacheEverything: true,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch users`);
  }

  const users = <User[]>await response.json();
  return users;
}
