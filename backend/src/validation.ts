import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const usernameSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(100)
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        "Username can only contain alphanumeric characters, underscores, and dashes",
    }),
});

const todoBodySchema = z.object({
  title: z
    .string()
    .min(3)
    .max(100)
    .regex(/^[a-zA-Z0-9 ]*$/, {
      message: "Title can only contain alphanumeric characters and spaces",
    }),
  description: z.optional(
    z
      .string()
      .max(500)
      .regex(/^[a-zA-Z0-9 .,!?]*$/, {
        message:
          "Description can only contain alphanumeric characters, spaces, and basic punctuation",
      })
  ),
});

const validateTodoBodyJSON = zValidator("json", todoBodySchema);
const validateUsername = zValidator("param", usernameSchema);
const validateIdValue = zValidator(
  "param",
  z.object({
    id: z.string().transform((val) => {
      const parsed = parseInt(val, 10);
      if (isNaN(parsed) || parsed <= 0) {
        throw new Error("ID must be a positive integer");
      }
      return parsed;
    }),
  })
);

export { validateTodoBodyJSON, validateUsername, validateIdValue };
