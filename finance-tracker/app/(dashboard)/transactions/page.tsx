import {
  groupTransactionsByDate,
  stringToDate,
  validateCategoryQuery,
  validateTypeQuery,
} from "@/lib/utils";
import { getTransactions } from "@/actions/get-transactions";
import { DateRange } from "react-day-picker";
import { getCategories } from "@/actions/get-categories";

import { GroupedTransactions } from "@/components/transactions/grouped-transactions";
import { FilterButton } from "@/components/transactions/filter-button";

interface TransactionsPageProps {
  searchParams: {
    categoryId: string;
    from: string;
    to: string;
    type: string;
    category: string;
  };
}

const TransactionsPage = async ({
  searchParams: { from, to, type, category },
}: TransactionsPageProps) => {
  const dateRangeQuery: DateRange = {
    from: stringToDate(from),
    to: stringToDate(to),
  };

  const { categories } = await getCategories();

  const typeQuery = validateTypeQuery(type);
  const categoryQuery = validateCategoryQuery(categories, category);

  const transactions = await getTransactions({
    from,
    to,
    type,
    slug: categoryQuery?.slug,
  });

  const groupedTransactions = groupTransactionsByDate(transactions);

  return (
    <div className="flex flex-col gap-8 py-24">
      <FilterButton
        dateRangeQuery={dateRangeQuery}
        typeQuery={typeQuery}
        categoryQuery={categoryQuery}
        categories={categories}
      />
      {groupedTransactions.length === 0 && (
        <div className="text-sm text-muted-foreground text-center py-12">
          No transactions found.
        </div>
      )}
      {groupedTransactions.map((group) => (
        <GroupedTransactions group={group} key={group.date} />
      ))}
    </div>
  );
};

export default TransactionsPage;
