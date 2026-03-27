import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import viteLogo from "/vite.svg";
import { Window } from "@/components/ui/Window";
import { TitleBar } from "@/components/ui/TitleBar";
import styles from "./Demo.module.css";
import { clsx } from "clsx";

export function Demo() {
  const [count, setCount] = useState(0);

  return (
    <Window>
      <TitleBar icon="React">Demo</TitleBar>
      <div className="flex flex-col">
        <div className="mb-6 flex justify-center gap-x-6">
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className={styles.logo} alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className={clsx(styles.logo, styles.react)} alt="React logo" />
          </a>
        </div>
        <h3 className="mb-12 text-center text-5xl font-semibold text-slate-700">Vite + React</h3>
        <button
          onClick={() => setCount((count) => count + 1)}
          className="mb-5 cursor-pointer self-center rounded-lg border border-transparent bg-slate-100 px-5 py-2 font-medium text-slate-700 transition-colors duration-250 hover:border-blue-500"
        >
          count is {count}
        </button>
        <p className="text-center">
          Edit <code>src/components/widgets/Demo/Demo.tsx</code> and save to test HMR
        </p>
        <p className="mt-6 text-center text-sm text-slate-400">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </Window>
  );
}
