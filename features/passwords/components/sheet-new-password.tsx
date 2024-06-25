"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

import { useNewPasswords } from "../hooks/use-new-password";
import { insertPasswordsSchema } from "@/db/schema";
import { z } from "zod";
import { useCreatePassword } from "../api/use-create-password";
import { FormNewPassword } from "./form-new-password";

const formSchema = insertPasswordsSchema.pick({
  accountEmail: true,
  accountName: true,
  accountPassword: true,
  notes: true,
  siteUrl: true,
  companyName: true,
});

type formValues = z.input<typeof formSchema>;

export const SheetNewPassowrd = () => {
  const { isOpen, onClose } = useNewPasswords();

  const mutation = useCreatePassword();

  const isPending = mutation.isPending;

  const onSubmit = (values: formValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex max-lg:max-h-lvh flex-col ">
        <SheetTitle className="text-center text-lg">
          Criar uma nova senha!
        </SheetTitle>
        <FormNewPassword disabled={isPending} onSubmit={onSubmit} />
      </SheetContent>
    </Sheet>
  );
};
