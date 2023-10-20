"use client";

import { Route } from "@/types/types";
import {
  Aperture,
  ArrowRightLeft,
  KanbanSquare,
  Settings,
  Target,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export const Navigation = () => {
  const pathname = usePathname();
  const routes: Route[] = [
    {
      icon: ArrowRightLeft,
      label: "Transactions",
      href: "/transactions",
      active: pathname.toLowerCase().startsWith("/transactions"),
    },
    {
      icon: Target,
      label: "Budgets",
      href: "/budgets",
      active: pathname.toLowerCase().startsWith("/budgets"),
    },
    {
      icon: Aperture,
      label: "Analytics",
      href: "/analytics",
      active: pathname.toLowerCase().startsWith("/analytics"),
    },
    {
      icon: KanbanSquare,
      label: "Receipts",
      href: "/receipts",
      active: pathname.toLowerCase().startsWith("/receipts"),
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
      active: pathname.toLowerCase().startsWith("/settings"),
    },
  ];
  return (
    <>
      <Sidebar routes={routes} />
      <Topbar routes={routes} />
    </>
  );
};
