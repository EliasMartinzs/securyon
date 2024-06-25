import { Logo } from "@/components/global/logo";
import { SidebarButtonMobile } from "@/components/sidebar/sidebar-button-mobile";
import { SidebarDesk } from "@/components/sidebar/sidebar-desk";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full min-h-svh lg:min-h-screen flex max-lg:flex-col overflow-hidden hidden-scrollbar">
      <SidebarDesk />

      <div className="lg:hidden w-full p-4 flex items-center justify-between ">
        <Logo height={48} width={48} />

        <SidebarButtonMobile />
      </div>

      {children}
    </main>
  );
}
