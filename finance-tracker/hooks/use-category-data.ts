import { getCategories } from "@/actions/get-categories";
import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const fetchCategories = async () => {
  const res = await fetch("/api/categories");
  const categories: Category[] = await res.json();
  const expense = categories.filter((category) => category.type === "EXPENSE");
  const income = categories.filter((category) => category.type === "INCOME");
  return { expense, income, categories };
};

const useCategoryData = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: Infinity,
  });
};

export default useCategoryData;
