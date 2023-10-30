import { calculatePercentage } from "@/lib/utils";
import { getBudgetDateRange } from "@/app/(dashboard)/budgets/_components/utils";
import prismadb from "@/lib/prismadb";
import { getAnalyticsDateRange, toTitleCase } from "@/lib/utils";
import { privateProcedure, router } from "@/trpc/trpc";
import { TopCategory } from "@/types/types";
import { z } from "zod";

export const analyticsRouter = router({
  get: router({
    netOverall: privateProcedure
      .input(
        z.object({
          range: z.string().optional(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const { userId } = ctx;
        const { range } = input;

        const { current, previous } = getAnalyticsDateRange(range);

        const currentTransactions = await prismadb.transaction.groupBy({
          by: ["type"],
          where: {
            userId,
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
            currentTransactions.find(
              (transaction) => transaction.type === "EXPENSE",
            )?._sum.amount,
          ) || 0;
        const currentTotalIncome =
          Number(
            currentTransactions.find(
              (transaction) => transaction.type === "INCOME",
            )?._sum.amount,
          ) || 0;
        const currentNetOverall =
          Number(currentTotalIncome) - Number(currentTotalExpense) || 0;

        const previousTransactions = await prismadb.transaction.groupBy({
          by: ["type"],
          where: {
            userId,
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
            previousTransactions.find(
              (transaction) => transaction.type === "EXPENSE",
            )?._sum.amount,
          ) || undefined;
        const previousTotalIncome =
          Number(
            previousTransactions.find(
              (transaction) => transaction.type === "INCOME",
            )?._sum.amount,
          ) || undefined;
        const previousNetOverall =
          Number(previousTotalIncome) - Number(previousTotalExpense) ||
          undefined;

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
          netOverall: {
            amount: currentNetOverall,
            percentage: netOverallPercentage,
          },
          totalExpense: {
            amount: currentTotalExpense,
            percentage: expensePercentage,
          },
          totalIncome: {
            amount: currentTotalIncome,
            percentage: incomePercentage,
          },
        };
      }),
    overallLimit: privateProcedure.query(async ({ ctx }) => {
      const { userId } = ctx;
      const overallLimit = await prismadb.overallBudget.findFirst({
        where: {
          userId,
        },
      });

      if (!overallLimit) {
        return null;
      }

      const { from, to } = getBudgetDateRange({ budget: overallLimit });

      const amount = await prismadb.transaction.aggregate({
        where: {
          userId,
          date: {
            gte: from,
            lt: to,
          },
          type: "EXPENSE",
        },
        _sum: {
          amount: true,
        },
      });

      if (overallLimit) {
        const totalSpent = Number(amount._sum.amount);
        const limit = Number(overallLimit.limit);
        const percentage = (totalSpent / limit) * 100;
        const title = `${toTitleCase(overallLimit.duration)} Limit`;

        return { totalSpent, limit, percentage, title };
      } else {
        return null;
      }
    }),
    topCategories: privateProcedure
      .input(
        z.object({
          range: z.string().optional(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const { userId } = ctx;
        const { range } = input;

        const { current } = getAnalyticsDateRange(range);

        const categories = await prismadb.category.findMany({
          where: {
            userId,
            type: "EXPENSE",
          },
        });

        const topCategories = await prismadb.transaction.groupBy({
          by: ["categoryId"],
          where: {
            userId,
            type: "EXPENSE",
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

        const categoryIdSet = new Set(
          topCategories.map((category) => category.categoryId),
        );

        const topCategoriesWithCategory = categories
          .filter((category) => categoryIdSet.has(category.id))
          .map((category) => {
            const matchingTopCategory = topCategories.find(
              (topCategory) => topCategory.categoryId === category.id,
            );

            return {
              ...category,
              amount: matchingTopCategory
                ? Number(matchingTopCategory._sum.amount)
                : 0,
            };
          });

        const totalExpense = topCategories.reduce(
          (total, category) => total + Number(category._sum.amount),
          0,
        );

        const topCategoriesWithPercentage: TopCategory[] =
          topCategoriesWithCategory.map((item) => ({
            id: item.id,
            name: item.title,
            color: item.color,
            value: (item.amount / totalExpense) * 100,
          }));

        return topCategoriesWithPercentage
          .sort((a, b) => b.value - a.value)
          .slice(0, 5);
      }),
  }),
});
