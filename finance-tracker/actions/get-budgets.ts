import { getCurrentUser } from "./get-current-user";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getBudgets = cache(async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const budgets = await prismadb.budget.findMany({
    where: {
      userId: user.id,
    },
    include: {
      category: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const category = budgets
    .filter((budget) => budget.type === "CATEGORY")
    .map((budget) => ({ ...budget, amount: Number(budget.amount) }));
  const overall = budgets
    .filter((budget) => budget.type === "OVERALL")
    .map((budget) => ({ ...budget, amount: Number(budget.amount) }));

  return { category, overall, budgets };
});
