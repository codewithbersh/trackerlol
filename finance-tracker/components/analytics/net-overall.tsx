import { cn } from "@/lib/utils";
import {
  Package,
  PackageMinus,
  PackagePlus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

type NetOverallType = {
  amount: number;
  percentage: number;
};

interface NetOverallProps {
  netOverall: NetOverallType;
  totalIncome: NetOverallType;
  totalExpense: NetOverallType;
}

export const NetOverall = ({
  netOverall,
  totalIncome,
  totalExpense,
}: NetOverallProps) => {
  const cards = [
    {
      isPrimary: true,
      amount: netOverall.amount,
      percentage: netOverall.percentage,
      title: "Net Overall",
      icon: Package,
      percentageIcon: netOverall.percentage >= 0 ? TrendingUp : TrendingDown,
    },
    {
      amount: totalIncome.amount,
      percentage: totalIncome.percentage,
      title: "Total Income",
      icon: PackagePlus,
      percentageIcon: totalIncome.percentage >= 0 ? TrendingUp : TrendingDown,
    },
    {
      amount: totalExpense.amount,
      percentage: totalExpense.percentage,
      title: "Total Expense",
      icon: PackageMinus,
      percentageIcon: totalExpense.percentage >= 0 ? TrendingUp : TrendingDown,
    },
  ];
  return (
    <>
      {cards.map((card) => (
        <div
          key={card.title}
          className={cn(
            "col-span-3 flex aspect-square w-full flex-col gap-16 rounded-md border p-4",
            card.isPrimary && "bg-foreground",
          )}
        >
          <div
            className={cn(
              "w-fit rounded-full p-2",
              card.isPrimary
                ? "bg-accent/20 text-primary-foreground"
                : "bg-accent text-primary",
            )}
          >
            <card.icon className="h-6 w-6" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              <span>{card.percentage.toFixed(0)}%</span>
              <card.percentageIcon className="h-4 w-4" />
            </div>

            <div
              className={cn(
                "text-2xl font-semibold",
                card.isPrimary && "text-primary-foreground",
              )}
            >
              $ {Number(card.amount.toFixed(0)).toLocaleString("en-US")}
            </div>

            <div className="mt-1 font-medium text-muted-foreground">
              {card.title}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
