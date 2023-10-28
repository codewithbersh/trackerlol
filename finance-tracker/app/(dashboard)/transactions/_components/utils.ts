import { Category, Duration } from "@prisma/client";
import { format, getDate, isValid, parse, parseISO } from "date-fns";
import { Categories, TransactionWithCategory } from "@/app/_trpc/client";

export function getRecurringIntervalDate({
  value,
  date,
}: {
  value: Duration | null;
  date: Date;
}) {
  const dayOfMonth = getDate(date);

  switch (value) {
    case "DAILY":
      return "Everyday";
    case "WEEKLY":
      return `Every ${format(date, "EEEE")}`;
    case "YEARLY":
      return `Every ${format(date, "do 'of' MMMM")}`;
    default:
      return `Every ${dayOfMonth > 28 ? "28th" : format(date, "do")}`;
  }
}

export type FiltersType = {
  from: Date | undefined;
  to: Date | undefined;
  type: "EXPENSE" | "INCOME" | undefined;
  category: Categories[number];
};

export type ValidateSearchParamsType = {
  filters: FiltersType;
};

interface ValidateSearchParamsProps {
  searchParams: { [key: string]: string | undefined };
  categories: Categories;
}

export function validateSearchParams({
  searchParams,
  categories,
}: ValidateSearchParamsProps) {
  const from = validateDateParams(searchParams.from);
  const to = validateDateParams(searchParams.to);
  const type = validateTypeParams(searchParams.type);
  const category = validateCategoryParams({
    params: searchParams.categoryId,
    categories: categories,
  });

  return {
    filters: { from, to, type, category },
  } as ValidateSearchParamsType;
}

export const hasValidFilters = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { from, to, type, categoryId } = searchParams;

  return (
    validateDateParams(from) !== undefined ||
    validateDateParams(to) !== undefined ||
    validateTypeParams(type) !== undefined ||
    categoryId !== undefined
  );
};

export function validateDateParams(params: string | undefined | null) {
  if (!params) {
    return undefined;
  }

  const parsedDate = parse(params, "yyyy-MM-dd", new Date());
  if (isValid(parsedDate)) {
    return parseISO(params);
  }

  return undefined;
}

export function validateTypeParams(
  params: string | string[] | undefined | null,
) {
  if (typeof params !== "string") {
    return undefined;
  }

  if (["EXPENSE", "INCOME"].includes(params.toUpperCase())) {
    return params.toUpperCase() as "EXPENSE" | "INCOME";
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
  return categories.find((category) => category.id === params);
}

export function groupTransactionsByDate(
  transactions: TransactionWithCategory[],
): Record<string, TransactionWithCategory[]> {
  const groupedTransactions: Record<string, TransactionWithCategory[]> = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date).toDateString();

    if (!groupedTransactions[date]) {
      groupedTransactions[date] = [];
    }

    groupedTransactions[date].push(transaction);
  });

  return groupedTransactions;
}
