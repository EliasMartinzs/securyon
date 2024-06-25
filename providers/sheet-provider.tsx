"use client";

import { SidebarSheet } from "@/components/sidebar/sidebar-sheet";
import { SheetNewPassowrd } from "@/features/passwords/components/sheet-new-password";
import { SheetNewPayment } from "@/features/payments/components/sheet-new-payment";
import { useMountedState } from "react-use";

export default function SheetProvider() {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <SidebarSheet />
      <SheetNewPassowrd />
      <SheetNewPayment />
    </>
  );
}
