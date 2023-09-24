"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useTransactionModal } from "@/hooks/use-transaction-modal";

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
  const { onOpen, setTransaction } = useTransactionModal();
  return (
    <ActionTooltip label="Add Transaction" side={tooltipSide} align="center">
      <Button
        onClick={() => {
          setTransaction(null);
          onOpen();
        }}
        className={cn("h-9 w-9 rounded-full", className)}
      >
        <Plus className="shrink-0" />
      </Button>
    </ActionTooltip>
  );
};
