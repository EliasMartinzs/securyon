"use client";

import { sidebarIcons } from "@/constants";
import { cn } from "@/lib/utils";
import Logo from "@/public/logo.png";
import {
  ClerkLoaded,
  ClerkLoading,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import { ChevronLeft, ChevronRight, Loader2, LogOut, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { OpenAllSheet } from "../global/open-all-sheet";
import { ModeToggle } from "../global/mode-toggle";

export const SidebarDesk = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative max-lg:hidden ml-5 py-6">
      <div
        className={cn(
          "bg-accent/50 backdrop-blur-md border rounded-2xl transition-all h-full duration-300 flex items-center justify-center",
          isExpanded ? "w-80" : "w-32"
        )}
      >
        <div className="flex flex-col items-center gap-y-12 py-6">
          <Image src={Logo} alt="logo" width={56} height={56} />

          <Separator />

          <div className="flex flex-col gap-y-8">
            {sidebarIcons.map(({ href, icon, label }) => {
              const Icon = icon;

              return (
                <Link
                  href={href}
                  key={href}
                  className={cn(
                    "flex whitespace-nowrap items-center gap-x-3 hover:text-primary/95 transition-colors",
                    pathname === href && "text-primary"
                  )}
                >
                  <Icon className="size-7" />
                  {isExpanded && <span>{label}</span>}
                </Link>
              );
            })}
          </div>

          <Separator />

          <div className="flex flex-col items-center justify-center gap-y-10">
            <UserButton />

            <OpenAllSheet
              sheetType={pathname}
              className="bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/85 transition-colors"
            >
              <Plus />
            </OpenAllSheet>

            <ModeToggle />

            <SignOutButton>
              <LogOut className="size-5 text-muted-foreground cursor-pointer" />
            </SignOutButton>
          </div>
        </div>

        <Button
          onClick={handleToggle}
          className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-accent rounded-full p-2"
        >
          {isExpanded ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </div>
    </div>
  );
};

const Separator = () => {
  return (
    <div className="w-full h-[1px] bg-gradient-to-r from-foreground/0 via-foreground to-foreground/0" />
  );
};
