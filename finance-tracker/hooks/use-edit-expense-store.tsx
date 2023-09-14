import { Category } from "@prisma/client";
import { create } from "zustand";

interface EditExpenseState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  category: Category | null;
  setCategory: (category: Category | null) => void;
}

export const useEditExpenseStore = create<EditExpenseState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  category: null,
  setCategory: (category) => set({ category }),
}));
