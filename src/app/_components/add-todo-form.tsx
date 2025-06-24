"use server";
import { addTodo } from "@/actions/add-todo";
import InputTypeText from "@/app/_components/input-type-text";
import { Plus } from "lucide-react";
import Button from "./button";

export default async function addTodoForm(
  props: Readonly<{ username: string }>
) {
  const { username } = props;
  return (
    <div className="w-full max-w-[600px] mx-auto">
      <form action={addTodo} className="flex flex-col">
        <InputTypeText label="Title" placeholder="Jogging" name="title" />
        <InputTypeText
          label="Description"
          placeholder="Go for a jog in the park"
          name="description"
        />
        <input type="hidden" value={username} name="username" />
        <Button type="submit">
          Add Todo
          <Plus size={24} strokeWidth={2} className="ml-2" />
        </Button>
      </form>
    </div>
  );
}
