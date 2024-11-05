import React from "react";
import { Button } from "../ui/button";
import { useNewPasswords } from "@/features/passwords/hooks/use-new-password";
import { useNewPayment } from "@/features/payments/hooks/use-new-payment";

type Props = {
  sheetType: string;
  children: React.ReactNode;
  className?: string;
};

export const OpenAllSheet = ({ sheetType, children, className }: Props) => {
  const { onOpen: openPassword } = useNewPasswords();
  const { onOpen: openPayment } = useNewPayment();

  const handleSwitch = () => {
    switch (sheetType) {
      case "/dashboard":
        openPassword();
        break;
      case "/dashboard/logins":
        openPassword();
        break;
      case "/dashboard/payments":
        openPayment();
        break;
      default:
        break;
    }
  };

  return (
    <Button className={className} onClick={handleSwitch}>
      {children}
    </Button>
  );
};
