import { useDeletePayment } from "@/features/payments/api/use-delete-payment";
import { cn, getCardType } from "@/lib/utils";
import { Loader2, Trash2, X } from "lucide-react";
import Image from "next/image";

type Props = {
  payment:
    | {
        id: string;
        authorId: string;
        cardNumber: string;
        cardHolderName: string;
        expirationDate: string;
        cvv: string;
        cardType: string;
        cardColor: string | null;
        notes: string | null;
        createdAt: string | null;
      }
    | undefined;
  className?: string;
  onOpenChange: (prevState: boolean) => void;
};

export const CreditCardDetails = ({
  payment,
  className,
  onOpenChange,
}: Props) => {
  const deletePayment = useDeletePayment(payment?.id!);
  const brand = getCardType(payment?.cardNumber ?? "");

  const handleDelete = () => {
    deletePayment.mutate(undefined, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  if (deletePayment.isPending) {
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="size-6 animate-spin" />
    </div>;
  }

  return (
    <div
      className={cn(
        "w-full min-h-52 lg:min-h-56 m-auto relative flex items-center justify-center",
        className
      )}
    >
      <div className="w-full px-2 absolute space-y-3">
        <div className="flex justify-between">
          <div className="">
            <p className="font-light">Nome</p>
            <p className="font-medium tracking-widest">
              {payment?.cardHolderName}
            </p>
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
          <p className="font-medium tracking-more-wider">
            {payment?.cardNumber}
          </p>
        </div>
        <div className="pt-6 pr-6">
          <div className="flex items-center gap-x-5">
            <div className="">
              <p className="font-light text-xs">Valid</p>
              <p className="font-medium tracking-wider text-sm">
                {payment?.expirationDate}
              </p>
            </div>

            <div className="">
              <p className="font-light text-xs">CVV</p>
              <p className="font-bold tracking-more-wider text-sm">
                {payment?.cvv}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 right-2">
        <Trash2
          className="size-5 text-muted-foreground cursor-pointer"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};
