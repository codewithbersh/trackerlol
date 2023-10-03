import prismadb from "@/lib/prismadb";
import { getCurrentUser } from "./get-current-user";
import { redirect } from "next/navigation";
import { getAnalyticsDateRange } from "@/lib/utils";
import { cache } from "react";

interface GetNetOverallProps {
  range: string | undefined;
}

export const getNetOverall = cache(async ({ range }: GetNetOverallProps) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const { current, previous } = getAnalyticsDateRange(range);

  const currentTransactions = await prismadb.transaction.groupBy({
    by: ["type"],
    where: {
      userId: user.id,
      date: {
        gte: current.from,
        lt: current.to,
      },
    },
    _sum: {
      amount: true,
    },
    orderBy: {
      _sum: {
        amount: "desc",
      },
    },
  });

  const currentTotalExpense =
    Number(
      currentTransactions.find((transaction) => transaction.type === "EXPENSE")
        ?._sum.amount,
    ) || 0;
  const currentTotalIncome =
    Number(
      currentTransactions.find((transaction) => transaction.type === "INCOME")
        ?._sum.amount,
    ) || 0;
  const currentNetOverall =
    Number(currentTotalIncome) - Number(currentTotalExpense) || 0;

  const previousTransactions = await prismadb.transaction.groupBy({
    by: ["type"],
    where: {
      userId: user.id,
      date: {
        gte: previous.from,
        lt: previous.to,
      },
    },
    _sum: {
      amount: true,
    },
    orderBy: {
      _sum: {
        amount: "desc",
      },
    },
  });

  const previousTotalExpense =
    Number(
      previousTransactions.find((transaction) => transaction.type === "EXPENSE")
        ?._sum.amount,
    ) || undefined;
  const previousTotalIncome =
    Number(
      previousTransactions.find((transaction) => transaction.type === "INCOME")
        ?._sum.amount,
    ) || undefined;
  const previousNetOverall =
    Number(previousTotalIncome) - Number(previousTotalExpense) || undefined;

  const expensePercentage = calculatePercentage(
    previousTotalExpense,
    currentTotalExpense,
  );
  const incomePercentage = calculatePercentage(
    previousTotalIncome,
    currentTotalIncome,
  );
  const netOverallPercentage = calculatePercentage(
    previousNetOverall,
    currentNetOverall,
  );

  return {
    netOverall: { amount: currentNetOverall, percentage: netOverallPercentage },
    totalExpense: {
      amount: currentTotalExpense,
      percentage: expensePercentage,
    },
    totalIncome: { amount: currentTotalIncome, percentage: incomePercentage },
  };
});

export function calculatePercentage(
  previous: number | undefined,
  current: number | undefined,
): number {
  if (previous === undefined || previous === 0) {
    if (current === undefined) {
      return 0;
    } else {
      return 0;
    }
  }

  if (current === undefined) {
    return 0;
  }

  return ((current - previous) / previous) * 100;
}
