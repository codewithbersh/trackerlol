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
          "rounded-full p-1.5 hover:bg-neutral-600/80",
          active
            ? " text-foreground bg-neutral-600 "
            : "text-muted-foreground/50"
        )}
      >
        <Icon />
      </Link>
    </ActionTooltip>
  );
};
