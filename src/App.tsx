import { useState, useEffect } from "react";
import { Demo } from "@/components/widgets/Demo";
import { Clock } from "@/components/widgets/Clock";
import { Calculator } from "@/components/widgets/Calculator";
import { Weather } from "@/components/widgets/Weather";
import { Todo } from "@/components/widgets/Todo";

export function App() {
  const [backgroundColor] = useState("linear-gradient(135deg, #667eea 0%, #764ba2 100%)");

  useEffect(() => {
    document.documentElement.style.setProperty("--bg-gradient", backgroundColor);
  }, [backgroundColor]);

  return (
    <div className="flex flex-col items-center justify-center text-white gap-8">
      <Demo />
      <Todo />
      <Weather />
      <Clock />
      <Calculator />
    </div>
  );
}
