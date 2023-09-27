"use client";

import { Route } from "@/types/types";
import { usePathname } from "next/navigation";
import { ImagePlus, Layers, LayoutGrid, Settings, Wallet2 } from "lucide-react";

import { NavigationMobile } from "./navigation-mobile";
import { NavigationDesktop } from "./navigation-desktop";

export const Navigation = () => {
  const pathname = usePathname();
  const routes: Route[] = [
    {
      icon: Layers,
      label: "Transactions",
      href: "/transactions",
      active: pathname.toLowerCase().startsWith("/transactions"),
    },
    {
      icon: Wallet2,
      label: "Budgets",
      href: "/budgets",
      active: pathname.toLowerCase().startsWith("/budgets"),
    },
    {
      icon: ImagePlus,
      label: "Receipts",
      href: "/receipts",
      active: pathname.toLowerCase().startsWith("/receipts"),
    },
    {
      icon: LayoutGrid,
      label: "Analytics",
      href: "/analytics",
      active: pathname.toLowerCase().startsWith("/analytics"),
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
      <NavigationMobile routes={routes} />
      <NavigationDesktop routes={routes} />
    </>
  );
};
