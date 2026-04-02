import React from "react";
import { Icon } from "@/components/ui/Icon";
import clsx from "clsx";

import { FaCircle, FaMinusCircle } from "react-icons/fa";

interface MinimizeButtonProps {
  isMinimized: boolean;
  onClick: () => void;
}

const MinimizeButton = ({ isMinimized, onClick }: MinimizeButtonProps) => (
  <button
    type="button"
    aria-label={isMinimized ? "ウィンドウを元に戻す" : "ウィンドウを最小化"}
    aria-pressed={isMinimized}
    onClick={onClick}
    className="group pointer-events-auto absolute top-1/2 right-2 mr-1 h-3.5 w-3.5 -translate-y-1/2 cursor-pointer"
  >
    <FaCircle className="absolute inset-0 h-3.5 w-3.5 text-white/30 opacity-100 duration-150 group-hover:opacity-0" />
    <FaMinusCircle className="absolute inset-0 h-3.5 w-3.5 text-amber-300 opacity-0 duration-150 group-hover:opacity-100" />
  </button>
);

export interface TitleBarProps {
  icon?: string;
  children: React.ReactNode;
  isMinimized: boolean;
  onMinimizeClick: () => void;
}

export function TitleBar({ icon, children, isMinimized, onMinimizeClick }: TitleBarProps) {
  const classes = clsx(
    // ベースのスタイル
    "relative text-white h-10 flex items-center gap-1.5 rounded-t-xs pl-3 pr-9",
    // 背景のスタイル
    "bg-linear-to-r from-black/45 to-black/35 backdrop-blur-sm",
  );

  return (
    <h2 className={classes}>
      {icon && <Icon name={icon} size={20} />}
      {children}
      <MinimizeButton isMinimized={isMinimized} onClick={onMinimizeClick} />
    </h2>
  );
}
