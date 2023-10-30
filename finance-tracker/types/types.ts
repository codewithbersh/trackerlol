import { LucideIcon } from "lucide-react";

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Route = {
  icon: LucideIcon;
  label: string;
  href: string;
  active: boolean;
};

export type TopCategory = {
  id: string;
  name: string;
  color: string;
  value: number;
};

export type WeekDayType = {
  value: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  label: string;
};
