"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";

interface TransactionButtonProps {
  tooltipSide: "right" | "top";
  className?: string;
}

export const TransactionButton = ({
  tooltipSide,
  className,
}: TransactionButtonProps) => {
  return (
    <ActionTooltip label="New Transaction" side={tooltipSide} align="center">
      <Button className={cn("h-fit w-fit p-[6px] rounded-full", className)}>
        <Plus />
      </Button>
    </ActionTooltip>
  );
};
