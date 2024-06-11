"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSidebar } from "./hooks/use-open-sidebar";
import { Sidebar } from "./sidebar";

export const SidebarSheet = () => {
  const { isOpen, onClose } = useSidebar();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="max-sm:w-2/4 md:w-1/4 lg:hidden">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
