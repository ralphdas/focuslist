import { Context, Hono } from "hono";
import { createDbClient } from "../db/dbClient";
import {
  validateUsername,
  validateTodoBodyJSON,
  validateIdValue,
} from "./validation";
import { checkIfTodoExists } from "./utils";
import { D1Database } from "@cloudflare/workers-types";
import { ClerkClient, createClerkClient, verifyToken } from "@clerk/backend";
import type { UserWebhookEvent } from "@clerk/backend";

type HonoBindings = {
  Bindings: {
    DB: D1Database;
  };
};

type apiContext = Context<HonoBindings>;

const api = new Hono<HonoBindings>();
const app = new Hono<HonoBindings>();

const verifyTokenHandler = async (c: apiContext) => {
  const token = c.req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return c.text("Authorization token not found", 401);
  }
  const secretKey = (c.env as Cloudflare.Env).CLERK_SECRET_KEY;
  const verifiedToken = await verifyToken(token, {
    secretKey,
  });
  if (!verifiedToken) {
    return c.text("Invalid token", 401);
  } else {
    return c.json(verifiedToken, 200);
  }
};

const clerkWebhookHandler = async (c: apiContext) => {
  const payload = await c.req.json<UserWebhookEvent>();
  const eventType = payload.type;

  if (eventType !== "user.created") {
    return c.text("Event not handled", 400);
  }

  const { id: clerk_id, first_name, last_name } = payload.data;

  const username = payload.data.username || `${first_name} ${last_name}`;

  if (!username) {
    return c.text("Invalid user data", 400);
  }

  const db = createDbClient(c.env.DB);

  try {
    await db
      .insertInto("users")
      .values({
        username,
        clerk_id,
      })
      .execute();

    return c.json({ success: true }, 201);
  } catch (error) {
    console.error("Error inserting user:", error);
    return c.text("Failed to register user", 500);
  }
};

const listUsersHandler = async (c: apiContext) => {
  const db = createDbClient(c.env.DB);

  const users = await db
    .selectFrom("users")
    .innerJoin("todos", "users.id", "todos.user_id")
    .select(["users.id", "users.username"])
    .select((eb) => eb.fn.count("todos.id").as("todo_count"))
    .groupBy("users.username")
    .execute();

  return c.json(users, 200);
};

const listTodosHandler = async (c: apiContext) => {
  const db = createDbClient(c.env.DB);
  const username = c.req.param("username");
  console.log("Authorization header:", c.req.header("Authorization"));

  const todos = await db
    .selectFrom("todos")
    .innerJoin("users", "todos.user_id", "users.id")
    .select([
      "todos.id as id",
      "todos.title",
      "todos.description",
      "todos.status",
      "users.username as username",
      "users.id as user_id",
    ])
    .where("users.username", "=", username)
    .execute();

  return c.json(todos, 200);
};

const createTodoHandler = async (c: apiContext) => {
  const db = createDbClient(c.env.DB);
  const username = c.req.param("username");
  const { title, description = "" } = await c.req.json();

  const user = await db
    .selectFrom("users")
    .select("id")
    .where("username", "=", username)
    .executeTakeFirst();

  if (!user) {
    return c.text("User not found", 404);
  }

  const result = await db
    .insertInto("todos")
    .values({
      user_id: user.id,
      title,
      description,
      status: "pending",
    })
    .returningAll()
    .execute();

  return c.json({ success: true, result }, 201);
};

const deleteTodoHandler = async (c: apiContext) => {
  const db = createDbClient(c.env.DB);
  const username = c.req.param("username");
  const todoId = parseInt(c.req.param("id"));

  const todoDoesExist = await checkIfTodoExists(db, username, todoId);

  if (!todoDoesExist) {
    return c.text("Todo not found", 404);
  }

  await db
    .deleteFrom("todos")
    .where("id", "=", todoId)
    .where(
      "user_id",
      "=",
      db.selectFrom("users").select("id").where("username", "=", username)
    )
    .execute();

  return c.json({ success: true }, 200);
};

const toggleTodoStatusHandler = async (c: apiContext) => {
  const db = createDbClient(c.env.DB);
  const username = c.req.param("username");
  const todoId = parseInt(c.req.param("id"));

  const todo = await checkIfTodoExists(db, username, todoId);

  if (!todo) {
    return c.text("Todo not found", 404);
  }

  const result = await db
    .updateTable("todos")
    .set({ status: todo.status === "done" ? "pending" : "done" })
    .where("id", "=", todoId)
    .where(
      "user_id",
      "=",
      db.selectFrom("users").select("id").where("username", "=", username)
    )
    .returningAll()
    .execute();

  return c.json({ success: true, result }, 200);
};

// API Routing
api.get("/", (c) => c.json({ message: "Todos API" }, 200));
api.post("/webhooks/clerk", clerkWebhookHandler);
api.get("/users/verify", verifyTokenHandler);
api.get("/users", listUsersHandler);
api.get(":username/todos", validateUsername, listTodosHandler);
api.post(
  ":username/todos",
  validateUsername,
  validateTodoBodyJSON,
  createTodoHandler
);
api.delete(
  ":username/todos/:id",
  validateUsername,
  validateIdValue,
  deleteTodoHandler
);

api.patch(
  ":username/todos/:id/toggle",
  validateUsername,
  validateIdValue,
  toggleTodoStatusHandler
);

app.route("/api", api);

export type EnvBindings = {
  DB: D1Database;
};

export type AppType = typeof app;

export default app;
