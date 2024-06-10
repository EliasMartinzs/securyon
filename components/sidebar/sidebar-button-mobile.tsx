"use client";

import { useSidebar } from "./hooks/use-open-sidebar";
import { Menu } from "lucide-react";

export const SidebarButtonMobile = () => {
  const { onOpen } = useSidebar();

  return (
    <Menu onClick={onOpen} className="text-muted-foreground cursor-pointer" />
  );
};
