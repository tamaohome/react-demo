import { useState, useEffect } from "react";

const STORAGE_KEY = "app:widgets:todo:items";

export interface TodoItem {
  id: string;
  text: string;
  done: boolean;
}

export function useTodo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ローカルストレージから読み込み
  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setTodos(JSON.parse(saved));
      }
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // データの保存
  const saveTodos = (newTodos: TodoItem[]) => {
    setTodos(newTodos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
  };

  // 項目の追加
  const addTodo = (text: string) => {
    const newTodo: TodoItem = { id: crypto.randomUUID(), text: text.trim(), done: false };
    saveTodos([...todos, newTodo]);
  };

  // 完了状態をトグル
  const toggleTodo = (id: string) => {
    const newTodos = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    saveTodos(newTodos);
  };

  // 項目の削除
  const deleteTodo = (id: string) => {
    saveTodos(todos.filter((t) => t.id !== id));
  };

  // 項目内容を更新
  const updateTodo = (id: string, text: string) => {
    const newTodos = todos.map((t) => (t.id === id ? { ...t, text: text.trim() } : t));
    saveTodos(newTodos);
  };

  return { todos, isLoading, addTodo, toggleTodo, deleteTodo, updateTodo };
}
