import { Route } from "@/types/types";

import { NavigationItem } from "./navigation-item";
import { TransactionButton } from "@/components/transaction-button";
import { ModeToggle } from "@/components/mode-toggle";

interface NavigationDesktopProps {
  routes: Route[];
}

export const NavigationDesktop = ({ routes }: NavigationDesktopProps) => {
  return (
    <div className="hidden sm:fixed sm:flex flex-col gap-3 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur-sm left-2 lg:left-4 border-border border rounded-full p-1">
      <div className="p-1 border border-border fixed top-0 left-0 -translate-y-14 rounded-full">
        <TransactionButton tooltipSide="right" />
      </div>
      {routes.map((route) => (
        <NavigationItem tooltipSide="right" route={route} key={route.href} />
      ))}
      <ModeToggle />
    </div>
  );
};
