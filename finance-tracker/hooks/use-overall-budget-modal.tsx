import { OverallBudgetWithLimitAsNumber } from "@/types/types";
import { create } from "zustand";

interface UseOverallBudgetStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  budget: OverallBudgetWithLimitAsNumber | null;
  setBudget: (budget: OverallBudgetWithLimitAsNumber | null) => void;
}

export const useOverallBudget = create<UseOverallBudgetStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  budget: null,
  setBudget: (budget) => set({ budget }),
}));
