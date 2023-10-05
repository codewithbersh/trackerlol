import { CategoriesByType } from "@/types/types";
import { Category } from "@prisma/client";
import { isValid, parse, parseISO } from "date-fns";

export type FiltersType = {
  from: Date | undefined;
  to: Date | undefined;
  type: "EXPENSE" | "INCOME" | undefined;
  category: Category | undefined;
};

export type ValidateSearchParamsType = {
  filters: FiltersType;
  hasValidFilter: boolean;
  categories: CategoriesByType;
};

interface ValidateSearchParamsProps {
  searchParams: { [key: string]: string | undefined };
  categories: CategoriesByType;
}

export function validateSearchparams({
  searchParams,
  categories,
}: ValidateSearchParamsProps) {
  const from = validateDateParams(searchParams.from);
  const to = validateDateParams(searchParams.to);
  const type = validateTypeParams(searchParams.type);
  const category = validateCategoryParams({
    params: searchParams.category,
    categories: categories.categories,
  });

  const hasValidFilter =
    from !== undefined ||
    to !== undefined ||
    type !== undefined ||
    category !== undefined;

  return {
    filters: { from, to, type, category },
    hasValidFilter,
    categories,
  } as ValidateSearchParamsType;
}

function validateDateParams(params: string | undefined) {
  if (!params) {
    return undefined;
  }

  const parsedDate = parse(params, "yyyy-MM-dd", new Date());
  if (isValid(parsedDate)) {
    return parseISO(params);
  }

  return undefined;
}

function validateTypeParams(params: string | undefined) {
  if (!params) {
    return undefined;
  }

  if (["EXPENSE", "INCOME"].includes(params.toUpperCase())) {
    return params.toUpperCase();
  }

  return undefined;
}

export function validateCategoryParams({
  params,
  categories,
}: {
  params: string | undefined;
  categories: Category[];
}) {
  return categories.find((category) => category.slug === params);
}
