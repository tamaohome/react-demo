import React, { useState } from "react";
import reactLogo from "@/assets/react.svg";
import viteLogo from "/vite.svg";
import { Window } from "@/components/ui/window/Window";
import { TitleBar } from "@/components/ui/titleBar/TitleBar";

export const Sample: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <Window>
      <TitleBar icon="React">Sample</TitleBar>
      <div className="flex justify-center gap-6">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img
            src={viteLogo}
            className="h-32 p-6 transition-all hover:drop-shadow-2xl will-change-filter"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            className="h-32 p-6 transition-all animate-logo-spin hover:drop-shadow-2xl will-change-filter"
            alt="React logo"
          />
        </a>
      </div>
      <h3 className="text-slate-700 text-6xl font-semibold mb-6">Vite + React</h3>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/components/sample/Sample.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-gray-500">Click on the Vite and React logos to learn more</p>
    </Window>
  );
};
