import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const fetchCategories = async () => {
  const res = await fetch("http://localhost:3000/api/categories");
  const categories: Category[] = await res.json();
  return categories;
};

const useCategoryData = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: Infinity,
    enabled: false,
  });
};

export default useCategoryData;
