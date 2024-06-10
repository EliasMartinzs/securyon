"use client";

import { Logo } from "@/components/global/logo";
import { TooltipCustom } from "@/components/global/tooltip-custom";
import { sidebarIcons } from "@/constants";
import {
  ClerkLoaded,
  ClerkLoading,
  SignIn,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { useMedia } from "react-use";
import { useSidebar } from "./hooks/use-open-sidebar";
import { Button } from "../ui/button";
import { Loader2, LogOut } from "lucide-react";
import { ModeToggle } from "../global/mode-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const { onClose } = useSidebar();
  const pathname = usePathname();
  const isMobile = useMedia("(max-width: 1024px)", false);

  return (
    <aside className="min-h-full flex items-center justify-center px-10 flex-col lg:border-r gap-y-20">
      <div>
        <Logo width={48} height={48} />
      </div>

      <ul className="space-y-10 relative">
        {sidebarIcons.map(({ icon, label, href }, i) => {
          const Icon = icon;

          return (
            <li key={i} className="p-2 ">
              <Link href={href}>
                <TooltipCustom
                  icon={
                    <Icon
                      className={cn(
                        "size-8 cursor-pointer hover:text-primary transition-colors",
                        pathname === href && "text-primary"
                      )}
                      aria-label={label}
                    />
                  }
                  label={label}
                />
              </Link>
            </li>
          );
        })}
      </ul>

      {!isMobile && (
        <div>
          <ClerkLoaded>
            <UserButton />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      )}
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
    </aside>
  );
};
