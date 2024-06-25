import { cardColors } from "@/constants";
import { cn, getCardType } from "@/lib/utils";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Checkbox } from "../ui/checkbox";

type Props = {
  values: {
    id?: string;
    cardNumber: string;
    cardHolderName: string;
    expirationDate: string;
    cvv: string;
    cardType: string;
    notes?: string | null | undefined;
    cardColor?: string | null | undefined;
  };
  className?: string;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  setPaymentId: (prevState: string) => void;
  handleSelected: (prevState: string) => void;
  multipleDelete: boolean;
};

export const CreditCard = ({
  values,
  className,
  onOpenChange,
  setPaymentId,
  handleSelected,
  multipleDelete,
}: Props) => {
  const { id, cardHolderName, cardNumber, cvv, expirationDate, cardColor } =
    values;

  const brand = getCardType(cardNumber);

  return (
    <div
      className={cn(
        "w-full min-h-52 lg:min-h-56 m-auto rounded-xl relative shadow-2xl flex items-center justify-center",
        className
      )}
    >
      <div
        className="relative object-cover w-full h-full rounded-xl"
        style={{ background: cardColor || cardColors[1]?.gradient }}
      />

      <div
        className="w-full px-8 absolute space-y-1"
        onClick={() => {
          onOpenChange((prev) => !prev), setPaymentId(id ?? "");
        }}
      >
        <div className="flex justify-between">
          <div className="">
            <p className="font-light">Nome</p>
            <p className="font-medium tracking-widest">{cardHolderName}</p>
          </div>
          <Image
            width={64}
            height={64}
            src={brand !== undefined ? `/${brand}.png` : "/Visa.png"}
            alt={""}
            className="object-contain"
          />
        </div>
        <div className="pt-1">
          <p className="font-light">Numero cartao</p>
          <p className="font-medium tracking-more-wider">{cardNumber}</p>
        </div>
        <div className="pt-6 pr-6">
          <div className="flex items-center gap-x-5">
            <div className="">
              <p className="font-light text-xs">Valid</p>
              <p className="font-medium tracking-wider text-sm">
                {expirationDate}
              </p>
            </div>

            <div className="">
              <p className="font-light text-xs">CVV</p>
              <p className="font-bold tracking-more-wider text-sm">{cvv}</p>
            </div>
          </div>
        </div>
      </div>

      {multipleDelete && (
        <div className="fixed top-3 right-3 z-50">
          <Checkbox onCheckedChange={(e) => handleSelected(id!)} />
        </div>
      )}
    </div>
  );
};
