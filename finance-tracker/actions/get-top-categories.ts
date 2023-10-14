import { cache } from "react";
import prismadb from "@/lib/prismadb";
import { getCurrentUser } from "./get-current-user";
import { redirect } from "next/navigation";
import { getAnalyticsDateRange } from "@/lib/utils";
import { TopCategory } from "@/types/types";

export const getTopCategories = cache(async (range: string | undefined) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const { current } = getAnalyticsDateRange(range);

  const categories = await prismadb.category.findMany({
    where: {
      userId: user.id,
      type: "EXPENSE",
    },
  });

  const topCategories = await prismadb.transaction.groupBy({
    by: ["categoryId"],
    where: {
      userId: user.id,
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
});
