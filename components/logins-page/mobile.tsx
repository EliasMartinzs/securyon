import { companies, scoreWords } from "@/constants";
import { PasswordProps } from "@/lib/types";

import PasswordStrengthBar from "react-password-strength-bar";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Copy, Eye, EyeOff, Loader2, Star, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { insertPasswordsSchema } from "@/db/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { PasswordGenerator } from "../global/password-generator";
import { useUpdatePassword } from "@/features/passwords/api/use-update-password";
import { useDeletePassword } from "@/features/passwords/api/use-delete-password";
import { Drawer, DrawerContent } from "../ui/drawer";
import { Textarea } from "../ui/textarea";
import { useCopyToClipboard } from "usehooks-ts";
import { toast } from "sonner";

const formValues = insertPasswordsSchema.pick({
  accountEmail: true,
  accountName: true,
  accountPassword: true,
  notes: true,
  siteUrl: true,
});

type formEditPassowrd = z.infer<typeof formValues>;

type Props = {
  password: PasswordProps | undefined;
  edit: boolean;
};

export const Mobile = ({ password, edit }: Props) => {
  const {
    accountEmail,
    accountName,
    accountPassword,
    authorId,
    companyName,
    id,
    notes,
    siteUrl,
  } = password || {};

  const [copiedText, copy] = useCopyToClipboard();

  const handleCopy = (text: string) => {
    copy(text)
      .then((res) => {
        toast.success("Copiado para a área de transferência");
      })
      .catch((res) => {
        toast.error("Erro ao copiar para a área de transferência");
      });
  };

  const form = useForm<formEditPassowrd>({
    mode: "onChange",
    resolver: zodResolver(formValues),
    defaultValues: {
      accountEmail: accountEmail ?? "",
      accountName: accountName ?? "",
      accountPassword: accountPassword ?? "",
      notes: notes ?? "",
      siteUrl: siteUrl ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      accountEmail: accountEmail ?? "",
      accountName: accountName ?? "",
      accountPassword: accountPassword ?? "",
      notes: notes ?? "",
      siteUrl: siteUrl ?? "",
    });
  }, [
    accountEmail,
    accountName,
    accountPassword,
    notes,
    siteUrl,
    form,
    form.reset,
  ]);

  const [showPassword, setShowPassword] = useState<"password" | "text">(
    "password"
  );
  const [showGeneratorPassword, setShowGeneratorPassword] = useState(false);

  const updatePasswordMutation = useUpdatePassword(id);
  const deletePasswordMutation = useDeletePassword(id ?? "");

  const disabled =
    updatePasswordMutation.isPending ||
    deletePasswordMutation.isPending ||
    !edit;

  const onSubmit = (values: formEditPassowrd) => {
    updatePasswordMutation.mutate(values);
  };

  const removePassword = () => {
    deletePasswordMutation.mutate(undefined, {
      onSuccess: () => {},
    });
  };

  const companyMatchers = companies.find(
    (company) => company.name === companyName
  );

  return (
    <>
      {password !== undefined ? (
        <Card className="overflow-y-auto hidden-scrollbar border-none py-6">
          <CardContent>
            <Form {...form}>
              <form
                className="flex flex-col gap-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="siteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">
                        Website
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            value={field.value!}
                            onChange={field.onChange}
                            className="outline-none"
                            disabled={disabled}
                          />
                          <Copy
                            className="absolute top-2 right-2 size-5 cursor-pointer text-muted-foreground"
                            onClick={() => handleCopy(field.value!)}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">
                        Usuario
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            value={field.value!}
                            onChange={field.onChange}
                            className="outline-none"
                            disabled={disabled}
                          />
                          <Copy
                            className="absolute top-2 right-2 size-5 cursor-pointer text-muted-foreground"
                            onClick={() => handleCopy(field.value!)}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">
                        E-Mail
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            value={field.value!}
                            onChange={field.onChange}
                            className="outline-none"
                            disabled={disabled}
                          />
                          <Copy
                            className="absolute top-2 right-2 size-5 cursor-pointer text-muted-foreground"
                            onClick={() => handleCopy(field.value!)}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">
                        Senha
                      </FormLabel>
                      <FormControl>
                        <div className="relative flex flex-col items-center justify-center w-full">
                          <Input
                            value={field.value!}
                            onChange={field.onChange}
                            className="outline-none"
                            type={showPassword}
                            disabled={disabled}
                          />
                          <div className="flex gap-x-2 absolute top-2 right-2 z-50">
                            <Copy
                              className="size-5 cursor-pointer text-muted-foreground"
                              onClick={() => handleCopy(field.value)}
                            />
                            {showPassword === "password" ? (
                              <Eye
                                className=" size-5 cursor-pointer text-muted-foreground"
                                onClick={() => setShowPassword("text")}
                              />
                            ) : (
                              <EyeOff
                                className=" size-5 cursor-pointer text-muted-foreground"
                                onClick={() => setShowPassword("password")}
                              />
                            )}
                          </div>

                          <div className="w-full">
                            <PasswordStrengthBar
                              password={field.value!}
                              shortScoreWord="muito curta"
                              scoreWords={scoreWords}
                            />

                            {showGeneratorPassword && (
                              <PasswordGenerator
                                onChangePassword={field.onChange}
                                setPassword={() => {}}
                              />
                            )}

                            <Button
                              className="mt-6 bg-accent text-accent-foreground hover:bg-accent/25 transition-colors"
                              disabled={disabled}
                              onClick={() =>
                                setShowGeneratorPassword(
                                  (prevState) => !prevState
                                )
                              }
                            >
                              {!showGeneratorPassword
                                ? "Mostrar Gerador de senhas"
                                : "Fechar Gerador de senhas"}
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notas</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            value={field.value!}
                            onChange={field.onChange}
                            className="outline-none"
                            disabled={disabled}
                            rows={5}
                          />
                          <Copy
                            className="absolute top-2 right-2 size-5 cursor-pointer text-muted-foreground"
                            onClick={() => handleCopy(field.value!)}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button variant="secondary" disabled={disabled} type="submit">
                  {!updatePasswordMutation.isPending ||
                  !deletePasswordMutation.isPending ? (
                    "Salvar"
                  ) : (
                    <Loader2 className="size-4 animate-spin" />
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <small className="text-muted-foreground">
              {/* TODO: date last modifier */}
              Last modified 16/06/2024
            </small>
          </CardFooter>
        </Card>
      ) : (
        <div className="flex items-center justify-center w-full">
          <Loader2 className="size-6 animate-spin" />
        </div>
      )}
    </>
  );
};
