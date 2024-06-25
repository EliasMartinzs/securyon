import React from "react";
import { useNewPayment } from "../hooks/use-new-payment";
import { Button } from "@/components/ui/button";

type Props = {
  style?: string;
  children: React.ReactNode;
};

export const OpenSheetPayment = ({ style, children }: Props) => {
  const { onOpen } = useNewPayment();

  return (
    <div className="flex items-center justify-center gap-x-5">
      <Button onClick={onOpen} className={style}>
        {children}
      </Button>
    </div>
  );
};
