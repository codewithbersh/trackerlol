import { Budget } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const fetchBudgets = async () => {
  const res = await fetch("/api/budgets");
  if (!res.ok) {
    throw new Error("Failed to fetch budgets.");
  }
  const data: Budget[] = await res.json();
  return data;
};

const useBudgetData = () => {
  return useQuery({
    queryKey: ["budgets"],
    queryFn: fetchBudgets,
    staleTime: Infinity,
  });
};

export default useBudgetData;
