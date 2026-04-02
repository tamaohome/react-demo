import { TitleBar } from "@/components/ui/TitleBar";
import clsx from "clsx";
import React from "react";
import { useState } from "react";

export interface WindowProps {
  icon?: string;
  title: string;
  width?: number;
  height?: number;
  children: React.ReactNode;
}

export function Window({ icon, title, width, height, children }: WindowProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <section className="w-full shadow-2xl">
      <TitleBar
        icon={icon}
        isMinimized={isMinimized}
        onMinimizeClick={() => setIsMinimized((value) => !value)}
      >
        {title}
      </TitleBar>
      <div
        className={clsx(
          "w-full overflow-hidden rounded-b-xs bg-white p-8 pt-6 text-slate-700",
          isMinimized && "hidden",
        )}
        style={{ width, height }}
      >
        {children}
      </div>
    </section>
  );
}
