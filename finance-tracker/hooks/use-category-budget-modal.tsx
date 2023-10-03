import { CategoryBudgetWithLimitAsNumber } from "@/types/types";
import { create } from "zustand";

interface UseCategoryBudgetStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  budget: CategoryBudgetWithLimitAsNumber | null;
  setBudget: (budget: CategoryBudgetWithLimitAsNumber | null) => void;
}

export const useCategoryBudget = create<UseCategoryBudgetStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  budget: null,
  setBudget: (budget) => set({ budget }),
}));
