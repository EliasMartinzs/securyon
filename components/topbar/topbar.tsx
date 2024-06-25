import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import MyAccount from "./my-account";

export const Topbar = () => {
  return (
    <header className="w-full min-h-20 flex items-center justify-center containe relative">
      <div className="absolute right-0">
        <ClerkLoaded>
          <MyAccount />
        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className="text-muted-foreground animate-spin" />
        </ClerkLoading>
      </div>
    </header>
  );
};
