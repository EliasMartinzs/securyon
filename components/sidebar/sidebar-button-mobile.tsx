"use client";

import { useSidebar } from "./hooks/use-open-sidebar";
import { PanelRight } from "lucide-react";

export const SidebarButtonMobile = () => {
  const { onOpen } = useSidebar();

  return (
    <PanelRight
      onClick={onOpen}
      className="text-muted-foreground cursor-pointer"
    />
  );
};
