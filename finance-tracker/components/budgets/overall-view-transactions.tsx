"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";

interface OverallViewTransactionsProps {
  slug?: string;
  range: {
    from: Date;
    to: Date;
  };
}

export const OverallViewTransactions = ({
  slug,
  range,
}: OverallViewTransactionsProps) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center pt-2">
      <Button
        variant="link"
        className="h-fit w-fit p-0 text-muted-foreground hover:text-primary"
        onClick={(e) => {
          e.stopPropagation();
          if (slug) {
            router.push(
              `/transactions?category=${slug}&from=${format(
                range.from,
                "yyyy-MM-dd",
              )}&to=${format(range.to, "yyyy-MM-dd")}`,
            );
          } else {
            router.push(
              `/transactions?from=${format(
                range.from,
                "yyyy-MM-dd",
              )}&to=${format(range.to, "yyyy-MM-dd")}`,
            );
          }
        }}
      >
        View Transactions
      </Button>
    </div>
  );
};
