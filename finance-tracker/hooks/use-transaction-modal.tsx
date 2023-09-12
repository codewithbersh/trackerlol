import { create } from "zustand";

interface UseTransactionModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useTransactionModal = create<UseTransactionModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
