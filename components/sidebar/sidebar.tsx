"use client";

import { Logo } from "@/components/global/logo";
import { sidebarIcons } from "@/constants";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { useSidebar } from "./hooks/use-open-sidebar";
import { Button } from "../ui/button";
import { LogOut, Plus } from "lucide-react";
import { ModeToggle } from "../global/mode-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { OpenSheetPassword } from "@/features/passwords/components/open-sheet-password";
import { useMediaQuery } from "usehooks-ts";
import { OpenAllSheet } from "../global/open-all-sheet";

export const Sidebar = () => {
  const { onClose } = useSidebar();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 1024px)");

  return (
    <aside className="min-h-full w-full flex items-start justify-start px-4 flex-col gap-y-8 py-10 overflow-auto hidden-scrollbar relative">
      <Button onClick={onClose} className="w-full items-center my-10">
        <Logo width={72} height={72} />
      </Button>

      <ul className="space-y-5 relative">
        {sidebarIcons.map(({ icon, label, href }, i) => {
          const Icon = icon;

          return (
            <li key={i} className="p-2">
              <Link
                href={href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-x-3 shrink-0 whitespace-nowrap",
                  pathname === href && "text-primary"
                )}
              >
                <Icon className="size-7" />
                <p>{label}</p>
              </Link>
            </li>
          );
        })}
      </ul>

      {isMobile && (
        <Button onClick={onClose} variant="ghost">
          <SignOutButton>
            <div className="flex gap-2 items-center text-muted-foreground hover:text-white transition-colors">
              <LogOut className="size-5" /> Sair
            </div>
          </SignOutButton>
        </Button>
      )}

      <ModeToggle />

      <div className="absolute bottom-5">
        <OpenAllSheet
          sheetType="/dashboard/payments"
          className="bg-primary text-primary-foreground hover:bg-primary/80 transition-colors flex items-center gap-x-3 p-5 px-7"
        >
          <Plus className="size-4" /> Novo
        </OpenAllSheet>
      </div>
    </aside>
  );
};
