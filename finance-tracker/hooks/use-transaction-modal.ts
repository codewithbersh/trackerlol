import { TransactionWithCategory } from "@/app/_trpc/client";
import { create } from "zustand";

interface UseTransactionModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  transaction: TransactionWithCategory | null;
  setTransaction: (category: TransactionWithCategory | null) => void;
}

export const useTransactionModal = create<UseTransactionModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  transaction: null,
  setTransaction: (transaction) => set({ transaction }),
}));
