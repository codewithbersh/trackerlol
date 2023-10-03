import { CategoryBudget } from "@prisma/client";
import { create } from "zustand";

interface UseCategoryBudgetStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  budget: CategoryBudget | null;
  setBudget: (budget: CategoryBudget | null) => void;
}

export const useCategoryBudget = create<UseCategoryBudgetStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  budget: null,
  setBudget: (budget) => set({ budget }),
}));
