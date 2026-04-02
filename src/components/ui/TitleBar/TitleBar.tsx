import React from "react";
import { Icon } from "@/components/ui/Icon";
import clsx from "clsx";

export interface TitleBarProps {
  icon?: string;
  children: React.ReactNode;
}

export function TitleBar({ icon, children }: TitleBarProps) {
  const classes = clsx(
    // ベースのスタイル
    "text-white h-9 flex items-center gap-1.5 rounded-t-xs pl-2 ",
    // 背景のスタイル
    "bg-linear-to-r from-black/45 to-black/35 backdrop-blur-sm",
  );

  return (
    <h2 className={classes}>
      {icon && <Icon name={icon} size={20} />}
      {children}
    </h2>
  );
}
