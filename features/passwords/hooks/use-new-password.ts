import { create } from "zustand";

type UseSheetPasswords = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewPasswords = create<UseSheetPasswords>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
