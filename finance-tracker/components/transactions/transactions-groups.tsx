"use client";

import { GroupedTransactionsType } from "@/types/types";

import { TransactionsGroup } from "./transactions-group";

interface TransactionsGroupsProps {
  transactions: GroupedTransactionsType[];
}

export const TransactionsGroups = ({
  transactions,
}: TransactionsGroupsProps) => {
  return (
    <>
      {transactions.map((group) => (
        <TransactionsGroup group={group} key={group.date} />
      ))}
    </>
  );
};
