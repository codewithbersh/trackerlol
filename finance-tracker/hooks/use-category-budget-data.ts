import { Category, CategoryBudget } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const fetchCategoryBudgets = async () => {
  const res = await fetch("/api/category-budgets");
  const categoryBudgets: CategoryBudget[] = await res.json();
  return categoryBudgets;
};

const useCategoryBudgetsData = () => {
  return useQuery({
    queryKey: ["category-budgets"],
    queryFn: fetchCategoryBudgets,
    staleTime: Infinity,
  });
};

export default useCategoryBudgetsData;
