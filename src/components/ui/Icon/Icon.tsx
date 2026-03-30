import type { IconType } from "react-icons";
import { FaReact, FaClock, FaCalendarDays, FaStopwatch, FaSun, FaCalculator, FaList } from "react-icons/fa6";
import { TbTicTac } from "react-icons/tb";

export const ICONS: Record<string, IconType> = {
  React: FaReact,
  Clock: FaClock,
  Calendar: FaCalendarDays,
  Timer: FaStopwatch,
  Weather: FaSun,
  Calculator: FaCalculator,
  Todo: FaList,
  TicTac: TbTicTac,
} as const;

export type IconName = keyof typeof ICONS;

export interface IconProps {
  name: IconName;
  size?: number | string;
  className?: string;
  color?: string;
}

export function Icon({ name, size, className = "", color }: IconProps) {
  const IconComponent = ICONS[name];

  return <IconComponent size={size} className={className} color={color} />;
}
