import React from "react";

interface WindowProps {
  children: React.ReactNode;
}

export function Window({ children }: WindowProps) {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-white p-8 text-slate-600 shadow-2xl">{children}</div>
  );
}
