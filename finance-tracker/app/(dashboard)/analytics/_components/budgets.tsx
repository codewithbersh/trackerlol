"use client";

import Link from "next/link";
import { Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BudgetsCategory } from "./budgets-category";
import { trpc } from "@/app/_trpc/client";

export const Budgets = () => {
  const { data: budgets } = trpc.budget.categories.getAll.useQuery(undefined, {
    staleTime: Infinity,
  });

  if (!budgets) return null;

  return (
    <div className="col-span-full flex flex-col space-y-8 rounded-md border p-4 md:col-span-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Category Budgets</h1>
        <Link passHref href="/budgets">
          <Button variant="outline" className="shrink-0 gap-2">
            <Settings2 className="h-4 w-4" />
            <div>
              Manage <span className="hidden xl:inline"> Budgets</span>
            </div>
          </Button>
        </Link>
      </div>
      <div className="my-auto flex flex-wrap justify-between gap-4">
        {budgets?.length === 0 || !budgets ? (
          <div className="w-full py-6 text-center text-sm text-muted-foreground">
            No category budgets.
          </div>
        ) : (
          budgets
            .splice(0, 5)
            .map((budget) => (
              <BudgetsCategory
                key={budget.id}
                budget={{ ...budget, limit: Number(budget.limit) }}
              />
            ))
        )}
      </div>
    </div>
  );
};
