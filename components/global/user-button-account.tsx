import { UserButton } from "@clerk/nextjs";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { LogOut, Settings } from "lucide-react";

export const UserButtonAccount = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-start justify-center gap-y-4">
      <div className="flex flex-col">
        <UserButton />
        <div className="flex flex-col mt-2">
          <small>E-mail</small>
          <small className="text-muted-foreground">
            {user?.emailAddresses?.at(0)?.emailAddress}
          </small>
        </div>
      </div>

      <div className="w-full">
        <Button className="px-0 text-muted-foreground hover:bg-accent w-full flex justify-start">
          <Settings className="mr-2 size-5" /> Configuracoes
        </Button>

        <SignOutButton>
          <Button className="px-0 text-muted-foreground hover:bg-accent w-full flex justify-start">
            <LogOut className="mr-2 size-5" /> Sair
          </Button>
        </SignOutButton>
      </div>
    </div>
  );
};
