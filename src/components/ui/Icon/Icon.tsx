import type { IconType } from "react-icons";
import { FaReact, FaClock, FaCalendarDays, FaStopwatch, FaSun, FaCalculator } from "react-icons/fa6";

export const ICONS: Record<string, IconType> = {
  React: FaReact,
  Clock: FaClock,
  Calendar: FaCalendarDays,
  Timer: FaStopwatch,
  Weather: FaSun,
  Calculator: FaCalculator,
} as const;

export type IconName = keyof typeof ICONS;

export interface IconProps {
  name: IconName;
  size?: number | string;
  className?: string;
  color?: string;
}

export const Icon = ({ name, size, className = "", color }: IconProps) => {
  const IconComponent = ICONS[name];

  return <IconComponent size={size} className={className} color={color} />;
};
