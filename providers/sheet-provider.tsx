"use client";

import { SidebarSheet } from "@/components/sidebar/sidebar-sheet";
import { useMountedState } from "react-use";

export default function SheetProvider() {
  const isMounted = useMountedState();

  if (!isMounted) return null;
  return (
    <>
      <SidebarSheet />
    </>
  );
}
