import { Route } from "@/types/types";

import { NavigationItem } from "./navigation-item";
import { TransactionButton } from "@/components/dashboard/transactions/transaction-button";

interface NavigationMobileProps {
  routes: Route[];
}

export const NavigationMobile = ({ routes }: NavigationMobileProps) => {
  return (
    <div className="fixed sm:hidden flex flex-row gap-3 left-1/2 -translate-x-1/2 bg-background/50 backdrop-blur-sm bottom-2 lg:left-4 border-border border rounded-full p-1">
      <div className="p-1 border border-border fixed top-0 right-0 translate-x-14 rounded-full">
        <TransactionButton tooltipSide="right" />
      </div>
      {routes.map((route) => (
        <NavigationItem tooltipSide="right" route={route} key={route.href} />
      ))}
    </div>
  );
};
