import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Window } from "@/components/ui/Window";
import { useTodo } from "@/hooks/useTodo";
import { TodoItem } from "./TodoItem";

const loadingComponent = (
  <ul className="list-none space-y-2">
    {[0, 1, 2, 3, 4].map((i) => (
      <li key={i} className="flex items-center gap-3 px-2 py-2">
        <Skeleton circle height={20} width={20} />
        <Skeleton width="70%" />
      </li>
    ))}
  </ul>
);

export function Todo() {
  const { todos, isLoading, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodo();

  return (
    <Window icon="Todo" title="Todo" height={400}>
      {/* 項目リスト */}
      <div className="flex h-full min-h-0 flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto pr-2">
          {isLoading ? (
            loadingComponent
          ) : (
            <ul className="custom-scrollbar list-none space-y-1 pr-2">
              {todos.length === 0 ? (
                <div className="py-8 text-center text-sm text-gray-400">タスクがありません</div>
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
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => addTodo("")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-xl font-bold text-white transition-colors hover:bg-blue-600"
          >
            ＋
          </button>
        </div>
      </div>
    </Window>
  );
}
