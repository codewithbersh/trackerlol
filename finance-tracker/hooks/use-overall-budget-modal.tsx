import { create } from "zustand";
import { OverallBudget } from "@/app/_trpc/client";

interface UseOverallBudgetStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  budget: NonNullable<OverallBudget>["budget"] | null;
  setBudget: (budget: NonNullable<OverallBudget>["budget"] | null) => void;
}

export const useOverallBudget = create<UseOverallBudgetStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  budget: null,
  setBudget: (budget) => set({ budget }),
}));
