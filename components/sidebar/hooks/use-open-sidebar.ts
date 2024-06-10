import { create } from "zustand";

type UseOpenSidebar = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSidebar = create<UseOpenSidebar>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
