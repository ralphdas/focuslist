import { Generated } from "kysely";

export interface Database {
  users: {
    id: Generated<number>;
    username: string;
    clerk_external_id: string;
  };
  todos: {
    id: Generated<number>;
    title: string;
    description: string;
    status: string;
    user_id: number;
  };
}
