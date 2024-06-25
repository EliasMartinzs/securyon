"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNewPasswords } from "../hooks/use-new-password";

type Props = {
  style?: string;
  children: React.ReactNode;
};

export const OpenSheetPassword = ({ style, children }: Props) => {
  const { onOpen } = useNewPasswords();
  return (
    <div className="flex items-center justify-center gap-x-5">
      <Button onClick={onOpen} className={style}>
        {children}
      </Button>
    </div>
  );
};
