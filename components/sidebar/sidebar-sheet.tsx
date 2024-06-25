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
      <SheetContent className="max-sm:max-w-sm lg:hidden rounded-tl-3xl rounded-bl-3xl bg-accent/50 backdrop-blur-md">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
