"use client";

import { cn, formatCurrency, greenToRed, toTitleCase } from "@/lib/utils";
import { CategoryBudgetWithLimitAsNumber } from "@/types/types";
import { TriangleUpIcon } from "@radix-ui/react-icons";
import { useCategoryBudget } from "@/hooks/use-category-budget-modal";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { getStartDate } from "./utils";
import { Profile } from "@prisma/client";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface CategoriesItemClientProps {
  budget: CategoryBudgetWithLimitAsNumber;
  percentage: number;
  total: number;
  spendingLimitLeft: number;
  daysLeft: number;
  range: {
    from: Date;
    to: Date;
  };
  profile: Profile | null;
}

export const CategoriesItemClient = ({
  budget,
  percentage,
  total,
  spendingLimitLeft,
  daysLeft,
  range,
  profile,
}: CategoriesItemClientProps) => {
  const { onOpen, setBudget } = useCategoryBudget();
  const router = useRouter();

  return (
    <div
      className="flex cursor-pointer flex-col rounded-sm border p-4 hover:bg-accent/25"
      onClick={() => {
        setBudget(budget);
        onOpen();
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-fit rounded-sm p-2 text-xl leading-none"
            style={{ backgroundColor: budget.category.color }}
          >
            <div>{budget.category.emoji}</div>
          </div>
          <div className="flex flex-col gap-1 text-sm font-medium leading-none">
            <div className="font-bold">
              {toTitleCase(budget.category.title)}
            </div>
            <div className="text-muted-foreground">{getStartDate(budget)}</div>
          </div>
        </div>

        <div
          className={cn(
            "flex items-center justify-end gap-1",
            percentage > 100 ? "text-red-500" : "text-green-500",
            percentage === 100 && "text-muted-foreground",
          )}
        >
          <TriangleUpIcon className="h-4 w-4" />
          <div className="font-semibold leading-none">
            {Math.abs(100 - percentage).toFixed(0)}%
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 pt-8 leading-none text-muted-foreground">
        <div className="flex items-center justify-between text-sm font-medium text-primary">
          <div>
            <span className="hidden sm:inline">Current: </span>
            {formatCurrency({ profile, amount: total })}
          </div>
          <div>
            <span className="hidden sm:inline">Target: </span>
            {formatCurrency({ profile, amount: Number(budget.limit) })}
          </div>
        </div>
        <Progress
          value={percentage > 100 ? 100 : percentage}
          className="h-2"
          indicatorBgColor={greenToRed(percentage > 100 ? 100 : percentage)}
        />
        <div className="flex items-center justify-between text-sm">
          <div className={cn(percentage >= 100 && "text-red-500")}>
            {formatCurrency({
              profile,
              amount: spendingLimitLeft,
              signDisplay: "never",
            })}{" "}
            {spendingLimitLeft >= 0 ? "under" : "over"}
          </div>
          <div>
            {daysLeft} {daysLeft > 1 ? "days" : "day"} left
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center pt-2">
        <Button
          variant="link"
          className="h-fit w-fit p-0 text-muted-foreground hover:text-primary"
          onClick={(e) => {
            e.stopPropagation();
            router.push(
              `/transactions?category=${budget.category.slug}&from=${format(
                range.from,
                "yyyy-MM-dd",
              )}&to=${format(range.to, "yyyy-MM-dd")}`,
            );
          }}
        >
          View Transactions
        </Button>
      </div>
    </div>
  );
};
