export type Todo = {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  username: string;
  user_id: number;
};

export type TodoStatus = "pending" | "done";

export type User = {
  id: number;
  username: string;
  todo_count: number;
};
