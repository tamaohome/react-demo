import React, { useState } from "react";
import classNames from "classnames";
import { FiTrash2 } from "react-icons/fi";

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isHovering, setIsHovering] = React.useState(false);
  const [text, setText] = useState(todo.text);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onUpdate(todo.id, text);
    }
  };

  const handleBlur = () => {
    if (text !== todo.text) {
      onUpdate(todo.id, text);
    }
  };

  return (
    <li
      className="group flex items-center gap-3 rounded px-2 py-2 transition-colors hover:bg-gray-100"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        className="h-5 w-5 cursor-pointer rounded-full border border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder="タスク名を入力"
        className={classNames(
          "flex-1 rounded border border-transparent bg-transparent px-2 py-1 text-sm transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none",
          todo.done ? "text-gray-400 line-through" : "text-gray-700",
        )}
      />
      <button
        onClick={() => onDelete(todo.id)}
        className={classNames(
          "p-1 text-gray-400 transition-all hover:text-red-500",
          isHovering ? "opacity-100" : "opacity-0",
        )}
      >
        <FiTrash2 size={16} />
      </button>
    </li>
  );
}
