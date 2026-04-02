import { useState, useEffect } from "react";
import { Demo } from "@/components/widgets/Demo";
import { Clock } from "@/components/widgets/Clock";
import { Calculator } from "@/components/widgets/Calculator";
import { Weather } from "@/components/widgets/Weather";
import { Todo } from "@/components/widgets/Todo";
import { MenuBar } from "@/components/ui/MenuBar/MenuBar";
import { TicTacToe } from "@/components/widgets/TicTacToe/TicTacToe";

export function App() {
  const [backgroundColor] = useState("linear-gradient(135deg, #667eea 0%, #764ba2 100%)");

  useEffect(() => {
    document.documentElement.style.setProperty("--bg-gradient", backgroundColor);
  }, [backgroundColor]);

  return (
    <>
      <MenuBar />
      <main className="flex w-xl flex-col gap-8">
        <TicTacToe />
        <Todo />
        <Weather />
        <Calculator />
        <Clock />
        <Demo />
      </main>
    </>
  );
}
