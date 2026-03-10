import React from "react";

interface WindowProps {
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ children }) => (
  <div className="p-8 rounded-lg overflow-hidden bg-white shadow-2xl text-slate-600 w-full">{children}</div>
);
