import { create } from "zustand";

interface DeleteCategoryState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useDeleteCategoryStore = create<DeleteCategoryState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
