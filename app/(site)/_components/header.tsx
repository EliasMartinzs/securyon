import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="w-full fixed top-0 left-0 h-14 mt-5 backdrop-blur-lg">
      <nav className="w-full h-full flex items-center justify-between px-4 lg:px-20 xl:px-40">
        <Link
          href="/"
          className="max-sm:text-2xl text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70"
        >
          Securyon
        </Link>
        <Link
          href="/sign-in"
          className={cn(
            buttonVariants(),
            "text-lg border rounded-full bg-primary text-primary-foreground transition-colors hover:bg-transparent hover:text-primary shadow-sm font-semibold max-sm:px-2 px-6"
          )}
        >
          Entrar
        </Link>
      </nav>
    </header>
  );
};
