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

  const widgets = [
    { id: "tictactoe", node: <TicTacToe /> },
    { id: "todo", node: <Todo /> },
    { id: "weather", node: <Weather /> },
    { id: "calculator", node: <Calculator /> },
    { id: "clock", node: <Clock /> },
    { id: "demo", node: <Demo /> },
  ];

  useEffect(() => {
    document.documentElement.style.setProperty("--bg-gradient", backgroundColor);
  }, [backgroundColor]);

  return (
    <>
      <MenuBar />
      <main className="mx-auto w-full max-w-7xl columns-1 gap-6 px-4 py-6 md:columns-2 xl:columns-3">
        {widgets.map(({ id, node }) => (
          <div key={id} className="mb-6 break-inside-avoid">
            {node}
          </div>
        ))}
      </main>
    </>
  );
}
