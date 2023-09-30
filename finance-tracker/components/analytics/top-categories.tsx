"use client";

import {
  cn,
  getCategoryBySlug,
  getTotalAmountPerCategory,
  groupTransactionsByCategory,
} from "@/lib/utils";
import { useState } from "react";
import { TransactionWithCategoryWithAmountAsNumber } from "@/types/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const types = [
  {
    value: "EXPENSE",
    label: "Expense",
  },
  {
    value: "INCOME",
    label: "Income",
  },
];

interface TopCategories {
  transactions: TransactionWithCategoryWithAmountAsNumber[];
  range: string;
}

export const TopCategories = ({
  transactions: initialData,
  range,
}: TopCategories) => {
  const [value, setValue] = useState<"INCOME" | "EXPENSE">("EXPENSE");

  const transactions = initialData.filter(
    (transaction) => transaction.type === value
  );

  const group = groupTransactionsByCategory(transactions);
  const totalAmount = getTotalAmountPerCategory({ group });

  return (
    <div className="p-4 rounded-lg border-t  border-input bg-accent/50 space-y-8 col-span-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold">Top Categories</h1>
          <p className="text-muted-foreground text-sm">
            This {range}&apos;s transactions
          </p>
        </div>
        <Select
          defaultValue={value}
          onValueChange={(value) => setValue(value as "INCOME" | "EXPENSE")}
        >
          <SelectTrigger className="w-fit rounded-full bg-inherit gap-2">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem value={type.value} key={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-4">
        {transactions.length === 0 && (
          <div className="py-2 text-sm text-muted-foreground">
            No transactions found.
          </div>
        )}
        {Object.keys(totalAmount).map((slug) => {
          const category = getCategoryBySlug(slug, transactions);
          return (
            <div
              key={slug}
              className={cn(
                "flex items-center ",
                slug === "totalForType" && "hidden"
              )}
            >
              <div className="flex gap-4 items-center">
                <div
                  className="rounded-full text-xl p-1.5 leading-none"
                  style={{ backgroundColor: category?.color }}
                >
                  {category?.emoji}
                </div>
                <div className="font-medium">{category?.title}</div>
              </div>

              <span className="text-end font-bold ml-auto mr-4">
                $ {totalAmount[slug].toLocaleString("en-US")}
              </span>
              <span className="text-end  text-muted-foreground text-sm min-w-[36.48px]">
                {(
                  (totalAmount[slug] / totalAmount["totalForType"]) *
                  100
                ).toFixed(0)}
                %
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
