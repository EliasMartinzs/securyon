"use client";

import { Breadcrumb } from "@/components/global/breadcrumb";
import { OpenAllSheet } from "@/components/global/open-all-sheet";
import { CreditCard } from "@/components/payments-page/credit-card";
import { CreditCardDetails } from "@/components/payments-page/credit-card-details";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useDeletePayments } from "@/features/payments/api/use-delete-payments";
import { useGetPayments } from "@/features/payments/api/use-get-payments";
import { useConfirm } from "@/hooks/use-confirm";
import { cn } from "@/lib/utils";
import {
  CreditCardIcon,
  GridIcon,
  ListIcon,
  Loader2,
  Plus,
  Trash,
  Trash2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function Payments() {
  const queryPayments = useGetPayments();
  const deletePayments = useDeletePayments();
  const payments = queryPayments.data ?? [];
  const [open, setOpen] = useState<boolean>(false);
  const [paymentId, setPaymentId] = useState("");
  const [value, setValue, removeValue] = useLocalStorage("layout-payments", 0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [multipleDelete, setMultipleDelete] = useState(false);
  const pathname = usePathname();

  const [ConfirmationDialog, confirm] = useConfirm(
    "Tem certeza?",
    "Voce esta deleteando multiplos cartoes"
  );

  const isLoading = queryPayments.isLoading || deletePayments.isPending;

  const handleSelected = (id: string) => {
    setSelectedIds((prevState) =>
      prevState.includes(id)
        ? prevState.filter((selected) => selected !== id)
        : [...prevState, id]
    );
  };

  const handleBulkDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deletePayments.mutate({
        ids: selectedIds,
      });

      setSelectedIds([]);
    }
  };

  const payment = payments.find((p) => p.id === paymentId);

  if (isLoading) {
    return (
      <div className="max-w-sm mx-auto mt-24 flex items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container hidden-scrollbar space-y-10 overflow-hidden">
      <ConfirmationDialog />
      <div className="w-full items-center justify-end lg:justify-between flex mt-10 gap-5">
        <div className="max-lg:hidden">
          <Breadcrumb
            items={[
              {
                href: "/dashboard",
                label: "Dashboard",
              },
              {
                href: "/payments",
                label: "Pagamentos",
              },
            ]}
          />
        </div>

        <div className="flex items-center gap-x-3">
          {selectedIds.length >= 1 && (
            <div
              className="flex gap-x-2 font-light cursor-pointer max-lg:hidden"
              onClick={handleBulkDelete}
            >
              <Trash className="cursor-pointer" /> Items selecionados (
              {selectedIds.length})
            </div>
          )}

          <div className="lg:hidden flex items-center whitespace-nowrap">
            {selectedIds.length >= 1 && (
              <div
                className="flex gap-x-2 font-light cursor-pointer"
                onClick={handleBulkDelete}
              >
                <Trash className="cursor-pointer size-5" /> Items selecionados (
                {selectedIds.length})
              </div>
            )}
          </div>

          <Button onClick={() => setMultipleDelete((prev) => !prev)}>
            {!multipleDelete ? (
              <>
                <Trash className="size-5 text-muted-foreground mr-2" /> Deletar
                multiplos
              </>
            ) : (
              <>
                <Trash2 className="size-5 text-muted-foreground mr-2" />
                Deletando multiplos
              </>
            )}
          </Button>

          <GridIcon
            onClick={() => {
              setValue(0);
            }}
            className={cn(
              "cursor-pointer max-lg:hidden",
              value === 0 && "text-primary"
            )}
          />
          <ListIcon
            onClick={() => {
              setValue(1);
            }}
            className={cn(
              "cursor-pointer max-lg:hidden",
              value === 1 && "text-primary"
            )}
          />
        </div>
      </div>

      <div
        className={cn(
          "relative overflow-y-auto hidden-scrollbar md:max-h-[768px]",
          value === 0 && payments.length >= 1
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
            : "flex flex-col gap-3 md:max-w-96 md:max-h-[768px]"
        )}
      >
        {payments.map((values) => (
          <CreditCard
            values={values}
            className="md:text-xs h-56 hover:scale-95 transition shadow-lg text-background dark:text-foreground backdrop-blur-md cursor-pointer"
            onOpenChange={setOpen}
            setPaymentId={setPaymentId}
            handleSelected={handleSelected}
            multipleDelete={multipleDelete}
            key={values.id}
          />
        ))}
      </div>

      {payments.length === 0 && (
        <div className="w-full h-1/2 flex items-center justify-center">
          <div className="max-w-sm flex items-center justify-center text-center flex-col gap-y-4 text-muted-foreground ">
            <CreditCardIcon className="size-20" />
            <h4 className="text-lg font-medium">
              Você ainda não salvou nenhum cartão.
            </h4>
            <h6>
              Adicione seus cartões de crédito para facilitar suas compras e
              pagamentos de forma rápida e segura. Com nosso gerenciador de
              cartões de crédito.
            </h6>
          </div>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-3xl">
          <CreditCardDetails payment={payment} onOpenChange={setOpen} />
        </DialogContent>
      </Dialog>

      <div className="absolute bottom-2 right-2 lg:hidden">
        <Button className="rounded-full w-10 h-10 bg-primary text-primary-foreground shadow-md flex items-center justify-center">
          <OpenAllSheet sheetType={pathname}>
            <Plus />
          </OpenAllSheet>
        </Button>
      </div>
    </div>
  );
}
