import { Budget, Transaction } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const fetchTransactions = async () => {
  const res = await fetch("/api/transactions");
  if (!res.ok) {
    throw new Error("Failed to fetch transactions.");
  }
  const data: Transaction[] = await res.json();
  return data;
};

const useTransactionData = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    staleTime: Infinity,
  });
};

export default useTransactionData;
