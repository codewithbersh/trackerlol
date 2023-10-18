"use client";

import { GroupedTransactionsType } from "@/types/types";
import { Profile } from "@prisma/client";

import { TransactionsGroup } from "./transactions-group";

interface TransactionsGroupsProps {
  transactions: GroupedTransactionsType[];
  profile: Profile | null;
}

export const TransactionsGroups = ({
  transactions,
  profile,
}: TransactionsGroupsProps) => {
  return (
    <>
      {transactions.map((group) => (
        <TransactionsGroup group={group} key={group.date} profile={profile} />
      ))}
    </>
  );
};
