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

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onUpdate }) => {
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
      className="group flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 transition-colors"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 rounded-full border border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder="タスク名を入力"
        className={classNames(
          "flex-1 text-sm px-2 py-1 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-transparent transition-all",
          todo.done ? "line-through text-gray-400" : "text-gray-700",
        )}
      />
      <button
        onClick={() => onDelete(todo.id)}
        className={classNames(
          "p-1 text-gray-400 hover:text-red-500 transition-all",
          isHovering ? "opacity-100" : "opacity-0",
        )}
      >
        <FiTrash2 size={16} />
      </button>
    </li>
  );
};
