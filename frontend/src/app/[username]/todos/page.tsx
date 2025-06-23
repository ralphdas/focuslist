import { getTodos } from "@/actions/get-todos";
import { TodoItem } from "../../_components/todo-item";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import AddTodoForm from "@/app/_components/add-todo-form";

export default async function TodosList({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const todos = await getTodos();

  return (
    <>
      <div className="space-y-2 mb-8">
        <Link
          href="/"
          className="text-sm text-header uppercase tracking-wide flex font-bold mb-4 max-w-fit rounded-4xl p-2 pr-5 gap-2 items-center bg-primary/0.5 text-primary transition-all outline outline-primary/20 hover:outline-primary"
        >
          <ChevronLeft className="text-primary/40" />
          Back to Home
        </Link>
        <h1 className="text-4xl text-bold text-header">{username}</h1>
        <p className="text-lg text-primary/70 ">A list of all your todos</p>
      </div>
      <ul className="container mx-auto">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo}></TodoItem>
        ))}
      </ul>
      <AddTodoForm username={username}></AddTodoForm>
    </>
  );
}
