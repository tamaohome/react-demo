import { useState, useEffect } from "react";
import { Sample } from "@/components/Sample";
import { Clock } from "@/components/Clock";
import { Calculator } from "@/components/Calculator";

export function App() {
  const [backgroundColor] = useState("linear-gradient(135deg, #667eea 0%, #764ba2 100%)");

  useEffect(() => {
    document.documentElement.style.setProperty("--bg-gradient", backgroundColor);
  }, [backgroundColor]);

  return (
    <div className="flex flex-col items-center justify-center text-white gap-8">
      <Sample />
      <Clock />
      <Calculator />
    </div>
  );
}
