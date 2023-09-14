import { create } from "zustand";

interface UseTransactionModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useTransactionModal = create<UseTransactionModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
