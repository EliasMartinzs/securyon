import { create } from "zustand";

type UseNewPayment = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewPayment = create<UseNewPayment>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
