import { Generated } from "kysely";

export interface Database {
  users: {
    id: Generated<number>;
    username: string;
    clerk_id: string;
  };
  todos: {
    id: Generated<number>;
    user_id: number;
    title: string;
    description: string;
    status: string;
  };
}
