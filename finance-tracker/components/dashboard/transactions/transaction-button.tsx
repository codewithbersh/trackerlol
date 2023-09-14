"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTransactionModal } from "@/hooks/use-transaction-modal";
import { ActionTooltip } from "@/components/action-tooltip";
import useCategoryData from "@/hooks/use-category-data";

interface TransactionButtonProps {
  tooltipSide: "right" | "top";
  className?: string;
}

export const TransactionButton = ({
  className,
  tooltipSide,
}: TransactionButtonProps) => {
  const { onOpen } = useTransactionModal();
  const { data, refetch, isLoading } = useCategoryData();

  const handleClick = () => {
    onOpen();
    refetch();
  };
  return (
    <ActionTooltip label="Add Transaction" side={tooltipSide} align="center">
      <Button
        className={cn("h-10 w-10 rounded-full", className)}
        onClick={handleClick}
      >
        <Plus className="shrink-0" />
      </Button>
    </ActionTooltip>
  );
};
