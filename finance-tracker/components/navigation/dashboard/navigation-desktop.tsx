import { Route } from "@/types/types";

import { TransactionButton } from "@/components/transaction-button";
import { NavigationItem } from "./navigation-item";

interface NavigationDesktopProps {
  routes: Route[];
}

export const NavigationDesktop = ({ routes }: NavigationDesktopProps) => {
  return (
    <div className="hidden sm:fixed sm:flex flex-col gap-1.5 top-1/2 -translate-y-1/2 bg-secondary backdrop-blur-sm left-2 lg:left-4 border-border border rounded-full p-0.5">
      <div className="p-0.5 border border-border fixed top-0 left-0 -translate-y-14 rounded-full">
        <TransactionButton tooltipSide="right" />
      </div>
      {routes.map((route) => (
        <NavigationItem tooltipSide="right" route={route} key={route.href} />
      ))}
    </div>
  );
};
