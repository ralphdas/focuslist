"use client";

import { Todo } from "@/app/types";
import { toggleTodo } from "@/actions/toggle-todo";
import { deleteTodo } from "@/actions/delete-todo";
import { Trash } from "lucide-react";
import React from "react";

export function TodoItem(props: Readonly<{ todo: Todo }>) {
  const [status, setStatus] = React.useState(props.todo.status);
  const { todo: _todo } = props;

  const handleToggle = async (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    const currentStatus = props.todo.status;
    setStatus(currentStatus === "done" ? "pending" : "done");
    try {
      const result = await toggleTodo(_todo.id, _todo.username);
      console.log("Toggled todo", result);
    } catch (e) {
      console.error(`Failed to toggle todo with id: ${_todo.id}`, e);
    }
  };

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const feedback = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (!feedback) {
      return;
    }
    await deleteTodo(_todo.id, _todo.username);
  };

  if (!_todo) {
    return null; // Render nothing if _todo is not defined
  }

  return (
    <li
      className="flex p-4 cursor-pointer rounded hover:shadow outline outline-primary/20 hover:outline-primary bg-elevated mb-4 transition-all"
      onClick={handleToggle}
    >
      <div className="mr-4 flex items-center">
        <input
          type="checkbox"
          checked={status === "done"}
          onChange={(e) => e.stopPropagation()} // Prevent checkbox from triggering the parent click
          className="appearance-none w-4 h-4 border border-gray-300 rounded-sm checked:bg-primary checked:border-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        />
      </div>
      <div className="flex flex-col flex-1">
        <h2
          className={`text-xl mb-1 font-bold text-header ${
            _todo.status === "done" ? "line-through" : ""
          }`}
        >
          {_todo.title}
        </h2>
        <p className="text-sm text-primary/80 ">{_todo.description}</p>
      </div>
      <button
        className="flex flex-col items-center font-bold p-4 rounded pointer"
        onClick={handleDelete}
      >
        <Trash size={24} className="mb-1" />
      </button>
    </li>
  );
}
