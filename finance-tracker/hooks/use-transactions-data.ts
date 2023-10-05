import { Transaction } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const fetchTransactions = async () => {
  const res = await fetch("/api/transactions");
  const transactions: Transaction[] = await res.json();
  return transactions;
};

const useTransactionsData = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    staleTime: Infinity,
  });
};

export default useTransactionsData;
