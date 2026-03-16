import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import viteLogo from "/vite.svg";
import { Window } from "@/components/ui/Window";
import { TitleBar } from "@/components/ui/TitleBar";
import styles from "./Demo.module.css";
import classNames from "classnames";

export function Demo() {
  const [count, setCount] = useState(0);

  return (
    <Window>
      <TitleBar icon="React">Demo</TitleBar>
      <div className="flex flex-col">
        <div className="flex justify-center gap-x-6 mb-6">
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className={styles.logo} alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className={classNames(styles.logo, styles.react)} alt="React logo" />
          </a>
        </div>
        <h3 className="text-slate-700 text-5xl text-center font-semibold mb-12">Vite + React</h3>
        <button
          onClick={() => setCount((count) => count + 1)}
          className="self-center mb-5 px-5 py-2 rounded-lg border border-transparent bg-slate-100 text-slate-700 font-medium transition-colors duration-250 hover:border-blue-500 cursor-pointer"
        >
          count is {count}
        </button>
        <p className="text-center">
          Edit <code>src/components/widgets/Demo/Demo.tsx</code> and save to test HMR
        </p>
        <p className="mt-6 text-slate-400 text-sm text-center">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </Window>
  );
}
