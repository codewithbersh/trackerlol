"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ActionTooltip } from "@/components/action-tooltip";
import Link from "next/link";

interface TransactionButtonProps {
  tooltipSide: "right" | "top";
  className?: string;
}

export const TransactionButton = ({
  className,
  tooltipSide,
}: TransactionButtonProps) => {
  return (
    <ActionTooltip label="Add Transaction" side={tooltipSide} align="center">
      <Link href="/transactions/new" passHref scroll={false}>
        <Button
          className={cn("h-10 w-10 rounded-full", className)}
          // onClick={onOpen}
        >
          <Plus className="shrink-0" />
        </Button>
      </Link>
    </ActionTooltip>
  );
};
