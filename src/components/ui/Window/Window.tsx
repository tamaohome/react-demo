import { TitleBar } from "@/components/ui/TitleBar";
import React from "react";

interface WindowProps {
  icon?: string;
  title: string;
  width?: number;
  height?: number;
  children: React.ReactNode;
}

export function Window({ icon, title, width, height, children }: WindowProps) {
  return (
    <section className="w-full shadow-2xl">
      <TitleBar icon={icon}>{title}</TitleBar>
      <div
        className="w-full overflow-hidden rounded-b-xs bg-white p-8 pt-6 text-slate-700"
        style={{ width, height }}
      >
        {children}
      </div>
    </section>
  );
}
