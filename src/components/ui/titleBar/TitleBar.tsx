import React from "react";
import { Icon } from "@/components/ui/icon";

interface TitleBarProps {
  icon?: string;
  children: React.ReactNode;
}

export const TitleBar: React.FC<TitleBarProps> = ({ icon, children }) => (
  <h2 className="mb-6 -mx-8 -mt-8 px-2.5 py-2 bg-gradient-to-r from-slate-700 to-slate-600 text-white text-base font-semibold rounded-t-[inherit] text-left flex items-center gap-1.5">
    {icon && <Icon name={icon} size={20} />}
    {children}
  </h2>
);
