import {
  groupTransactionsByDate,
  stringToDate,
  validateCategoryQuery,
  validateTypeQuery,
} from "@/lib/utils";
import { getTransactions } from "@/actions/get-transactions";
import { getCategories } from "@/actions/get-categories";

import { AddTransactionButton } from "@/components/transactions/add-transaction-button";
import { PageHeading } from "@/components/page-heading";
import { Filters } from "@/components/transactions/filters";
import { GroupedTransactions } from "@/components/transactions/grouped-transactions";
import { FiltersMobile } from "@/components/transactions/filters-mobile";
import { FilterTransactionsSheet } from "@/components/modals/filter-transactions-sheet";

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
  const dateRangeQuery = {
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

  const hasValidQuery =
    dateRangeQuery.from !== undefined ||
    dateRangeQuery.to !== undefined ||
    typeQuery !== undefined ||
    categoryQuery !== undefined;

  return (
    <div className="mt-[60px] flex  flex-col py-8 pt-0 sm:mt-16 lg:mt-4">
      <PageHeading title="Transactions">
        <AddTransactionButton />
      </PageHeading>

      <div className="py-8">
        <div className="hidden w-fit gap-4 sm:flex">
          <Filters categories={categories} hasValidQuery={hasValidQuery} />
        </div>
        <FiltersMobile />
      </div>

      {groupedTransactions.length === 0 && (
        <div className="py-12 text-center text-sm text-muted-foreground">
          No transactions found.
        </div>
      )}
      <div className="space-y-16">
        {groupedTransactions.map((group) => (
          <GroupedTransactions group={group} key={group.date} />
        ))}
      </div>
      <FilterTransactionsSheet
        categories={categories}
        hasValidQuery={hasValidQuery}
      />
    </div>
  );
};

export default TransactionsPage;
