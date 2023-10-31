import { Receipt } from "@prisma/client";
import { create } from "zustand";

interface UseReceiptModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  receipt: Receipt | null;
  setReceipt: (receipt: Receipt | null) => void;
}

export const useReceiptModal = create<UseReceiptModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  receipt: null,
  setReceipt: (receipt) => set({ receipt }),
}));
