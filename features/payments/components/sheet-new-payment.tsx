import { useNewPayment } from "../hooks/use-new-payment";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { FormNewPayment } from "./form-new-payment";
import { insertCreditCards } from "@/db/schema";
import { z } from "zod";
import { useCreatePayment } from "../api/use-create-payment";
import { toast } from "sonner";

const insertForm = insertCreditCards.pick({
  cardNumber: true,
  cardHolderName: true,
  expirationDate: true,
  cvv: true,
  cardType: true,
  cardColor: true,
  notes: true,
});

type formValues = z.infer<typeof insertForm>;

export const SheetNewPayment = () => {
  const { isOpen, onClose } = useNewPayment();
  const mutation = useCreatePayment();

  const isPending = mutation.isPending;

  const onSubmit = (values: formValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success(
          `Cartao de ${
            values.cardType === "credit" ? "Credito" : "Debito"
          } com sucesso!`,
          {
            id: "create-credit-card",
          }
        );
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex max-lg:max-h-lvh flex-col ">
        <SheetTitle className="text-center text-lg">
          Criar novo cartao!
        </SheetTitle>
        <FormNewPayment disabled={isPending} onSubmit={onSubmit} />
      </SheetContent>
    </Sheet>
  );
};
