import Link from "next/link";
import { cn } from "@/lib/utils";
import { Route } from "@/types/types";

import { ActionTooltip } from "@/components/action-tooltip";

interface NavigationItem {
  route: Route;
  tooltipSide: "right" | "top";
}

export const NavigationItem = ({
  tooltipSide,
  route: { label, href, icon: Icon, active },
}: NavigationItem) => {
  return (
    <ActionTooltip label={label} key={href} side={tooltipSide} align="center">
      <Link
        href={href}
        passHref
        className={cn(
          "rounded-full p-2 hover:bg-accent",
          active ? " text-foreground bg-accent " : "text-muted-foreground"
        )}
      >
        <Icon />
      </Link>
    </ActionTooltip>
  );
};
