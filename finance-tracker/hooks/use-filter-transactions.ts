import { DateRange } from "react-day-picker";
import { create } from "zustand";

interface UseFilterTransactionsState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  dateQuery: DateRange | undefined;
  setDateQuery: (dateQuery: DateRange | undefined) => void;
}

export const useFilterTransactionsStore = create<UseFilterTransactionsState>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    dateQuery: undefined,
    setDateQuery: (dateQuery) => set({ dateQuery: dateQuery }),
  })
);
