import { cache } from "react";
import { getCurrentUser } from "./get-current-user";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { toTitleCase } from "@/lib/utils";

import { getBudgetDateRange } from "@/components/budgets/utils";

export const getOverallLimit = cache(async () => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/login");
  }

  const overallLimit = await prismadb.overallBudget.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!overallLimit) {
    return null;
  }

  const { from, to } = getBudgetDateRange({ budget: overallLimit });

  const amount = await prismadb.transaction.aggregate({
    where: {
      userId: user.id,
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
});
