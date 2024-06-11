"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Dashboard() {
  const onCLick = () => {
    toast.success("teste");
  };
  return (
    <div className="w-full mt-40 grid place-items-center overflow-hidden">
      <h1 className="text-4xl overflow-hidden">
        Nao sei o que fazer aqui ainda kkkkkkkkkkkk
      </h1>

      <Button onClick={onCLick}>teste</Button>
    </div>
  );
}
