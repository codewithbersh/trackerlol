"use client";

import { trpc } from "@/app/_trpc/client";
import { cn, formatCurrency } from "@/lib/utils";
import {
  Package,
  PackageMinus,
  PackagePlus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface SummaryProps {
  range: string | undefined;
}

export const Summary = ({ range }: SummaryProps) => {
  const { data } = trpc.analytics.get.netOverall.useQuery(
    {
      range,
    },
    {
      staleTime: Infinity,
    },
  );
  const { data: profile } = trpc.profile.get.useQuery(undefined, {
    staleTime: Infinity,
  });

  if (!data || !profile) return null;

  const cards = [
    {
      isPrimary: true,
      amount: data.netOverall.amount,
      percentage: data.netOverall.percentage,
      title: "Net Overall",
      icon: Package,
      percentageIcon:
        data.netOverall.percentage >= 0 ? TrendingUp : TrendingDown,
    },
    {
      amount: data.totalIncome.amount,
      percentage: data.totalIncome.percentage,
      title: "Total Income",
      icon: PackagePlus,
      percentageIcon:
        data.totalIncome.percentage >= 0 ? TrendingUp : TrendingDown,
    },
    {
      amount: data.totalExpense.amount,
      percentage: data.totalExpense.percentage,
      title: "Total Expense",
      icon: PackageMinus,
      percentageIcon:
        data.totalExpense.percentage >= 0 ? TrendingUp : TrendingDown,
    },
  ];
  return (
    <>
      {cards.map((card) => (
        <div
          key={card.title}
          className={cn(
            "col-span-full flex w-full  flex-col gap-16 rounded-md border p-4 sm:col-span-6 md:col-span-3",
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
          <div className="mt-auto flex flex-col gap-3">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              <span>{Math.abs(card.percentage).toFixed(0)}%</span>
              <card.percentageIcon className="h-4 w-4" />
            </div>

            <div
              className={cn(
                "text-2xl font-semibold",
                card.isPrimary && "text-primary-foreground",
              )}
            >
              {formatCurrency({ profile, amount: card.amount })}
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
