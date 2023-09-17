import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const fetchCategories = async () => {
  const res = await fetch("/api/categories");
  const categories: Category[] = await res.json();
  return categories;
};

const useCategoryData = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: Infinity,
  });
};

export default useCategoryData;
