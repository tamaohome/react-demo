import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Window } from "@/components/ui/Window";
import { TitleBar } from "@/components/ui/TitleBar";
import { useTodo } from "@/hooks/useTodo";
import { TodoItem } from "./TodoItem";

export const Todo: React.FC = () => {
  const { todos, isLoading, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodo();

  return (
    <Window>
      <TitleBar icon="Todo">Todo</TitleBar>

      {/* 項目リスト */}
      <div className="flex flex-col h-96">
        <div className="min-h-64 flex-1 overflow-y-auto">
          {isLoading ? (
            <ul className="space-y-2 list-none">
              {[0, 1, 2, 3, 4].map((i) => (
                <li key={i} className="flex items-center gap-3 px-2 py-2">
                  <Skeleton circle height={20} width={20} />
                  <Skeleton width="70%" />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="space-y-1 pr-2 custom-scrollbar list-none">
              {todos.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm">タスクがありません</div>
              ) : (
                todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onUpdate={updateTodo}
                  />
                ))
              )}
            </ul>
          )}
        </div>

        {/* 追加ボタン */}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => addTodo("")}
            className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold hover:bg-blue-600 transition-colors"
          >
            ＋
          </button>
        </div>
      </div>
    </Window>
  );
};
