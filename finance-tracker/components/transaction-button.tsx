"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ActionTooltip } from "@/components/action-tooltip";

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
        <Button className={cn("h-9 w-9 rounded-full", className)}>
          <Plus className="shrink-0" />
        </Button>
      </Link>
    </ActionTooltip>
  );
};
