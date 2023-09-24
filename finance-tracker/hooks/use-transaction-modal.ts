import { TransactionWithCategoryWithAmountAsNumber } from "@/types/types";
import { create } from "zustand";

interface UseTransactionModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  transaction: TransactionWithCategoryWithAmountAsNumber | null;
  setTransaction: (
    category: TransactionWithCategoryWithAmountAsNumber | null
  ) => void;
}

export const useTransactionModal = create<UseTransactionModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  transaction: null,
  setTransaction: (transaction) => set({ transaction }),
}));
