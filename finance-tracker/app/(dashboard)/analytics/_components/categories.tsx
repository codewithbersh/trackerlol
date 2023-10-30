"use client";

import Link from "next/link";
import { getTopCategories } from "@/actions/get-top-categories";
import { format } from "date-fns";
import { getAnalyticsDateRange } from "@/lib/utils";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CategoriesChart } from "./categories-chart";
import { trpc } from "@/app/_trpc/client";

interface CategoriesProps {
  range: string | undefined;
}

export const Categories = ({ range }: CategoriesProps) => {
  const { data: categories } = trpc.analytics.get.topCategories.useQuery({
    range,
  });

  const {
    current: { from, to },
  } = getAnalyticsDateRange(range);

  if (!categories) return null;

  return (
    <div className="col-span-full space-y-8 rounded-md border p-4 md:col-span-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Top Categories</h1>
        <Link
          href={{
            pathname: "/transactions",
            query: {
              from: format(from, "yyyy-MM-dd"),
              to: format(to, "yyyy-MM-dd"),
              type: "expense",
            },
          }}
          passHref
        >
          <Button variant="outline" className="shrink-0 gap-2">
            <Eye className="h-4 w-4" />
            <div>
              View <span className="hidden xl:inline"> Transactions</span>
            </div>
          </Button>
        </Link>
      </div>

      {categories?.length === 0 || !categories ? (
        <div className="my-auto py-6 text-center text-sm text-muted-foreground">
          No transactions.
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          <CategoriesChart categories={categories} />
          <div className="flex w-full flex-1 flex-col gap-4">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center gap-4">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <div className="leading-none text-muted-foreground">
                  {category.name}
                </div>
                <div className="ml-auto font-semibold leading-none">
                  {category.value.toFixed(0)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
