import { LucideIcon } from "lucide-react";

export type Route = {
  icon: LucideIcon;
  label: string;
  href: string;
  active: boolean;
};
