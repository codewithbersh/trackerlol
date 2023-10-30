import { CategoriesBudgets } from "@/app/_trpc/client";
import { create } from "zustand";

interface UseCategoryBudgetStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  budget: CategoriesBudgets[number] | null;
  setBudget: (budget: CategoriesBudgets[number] | null) => void;
}

export const useCategoryBudget = create<UseCategoryBudgetStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  budget: null,
  setBudget: (budget) => set({ budget }),
}));
