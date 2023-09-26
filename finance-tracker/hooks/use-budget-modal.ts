import { Budget } from "@prisma/client";
import { create } from "zustand";

interface UseBudgetModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  budget: Budget | null;
  setBudget: (budget: Budget | null) => void;
}

export const useBudgetModal = create<UseBudgetModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  budget: null,
  setBudget: (budget) => set({ budget }),
}));
