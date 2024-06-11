import { Logo } from "@/components/global/logo";
import { Sidebar } from "@/components/sidebar/sidebar";
import { SidebarButtonMobile } from "@/components/sidebar/sidebar-button-mobile";
import { Topbar } from "@/components/topbar/topbar";
import Link from "next/link";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full min-h-svh lg:min-h-screen flex flex-col lg:flex-row">
      {/* sidebar desk */}
      <div className="min-h-full min-w-20 max-lg:hidden">
        <Sidebar />
      </div>

      {/* topbar desk */}
      <div className="w-full h-20 max-lg:hidden">
        <Topbar />
      </div>

      {/* sidebar mobile */}
      <div className="min-h-full lg:hidden">
        <header className="w-full container py-4 flex items-center justify-between">
          <div className="flex gap-x-3 items-center">
            <Logo width={48} height={48} />
            <Link href="/" className="text-lg font-medium">
              Securyon
            </Link>
          </div>
          <SidebarButtonMobile />
        </header>
      </div>

      {/* dashboard */}
      <div className="m-5">{children}</div>
    </main>
  );
}
