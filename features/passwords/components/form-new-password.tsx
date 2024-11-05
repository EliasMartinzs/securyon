import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, Mail, User } from "lucide-react";
import { PasswordGenerator } from "@/components/global/password-generator";
import { useState } from "react";
import { CompanyNameCombobox } from "./company-name-combobox";
import PasswordStrengthBar from "react-password-strength-bar";
import { scoreWords } from "../../../constants/index";

const formSchema = z.object({
  accountEmail: z.string().email({
    message: "Por favor insira um e-mail",
  }),
  accountName: z.string().min(4, {
    message: "Por favor insira um nome.",
  }),
  accountPassword: z.string().min(4, {
    message: "Por favor insira uma senha",
  }),
  companyName: z.string().min(1, {
    message: "Por favor crie ou selecione uma companhia",
  }),
  notes: z.string().optional(),
  siteUrl: z.string().optional(),
});

type formValues = z.infer<typeof formSchema>;

type Props = {
  disabled?: boolean;
  onSubmit: (values: formValues) => void;
};

export const FormNewPassword: React.FC<Props> = ({ disabled, onSubmit }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<"password" | "text">(
    "password"
  );
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);

  const form = useForm<formValues>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountEmail: "",
      accountName: "",
      accountPassword: password || "",
      notes: "",
      siteUrl: "",
    },
  });

  const handleSubmit = (values: formValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full p-4 lg:p-10 overflow-y-auto hidden-scrollbar"
      >
        <FormField
          control={form.control}
          name="accountEmail"
          render={({ field }) => (
            <FormItem>
              <small>E-Mail</small>
              <FormControl>
                <div className="relative flex items-center justify-center">
                  <Input
                    {...field}
                    placeholder="E-Mail"
                    className="bg-accent outline-none rounded-xl"
                    disabled={disabled}
                  />
                  <Mail className="size-4 absolute top-2 right-2" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Separator />

        <FormField
          control={form.control}
          name="accountName"
          render={({ field }) => (
            <FormItem>
              <small>Usuario</small>
              <FormControl>
                <div className="relative items-center justify-center flex">
                  <Input
                    {...field}
                    placeholder="Usuario"
                    className="bg-accent outline-none rounded-xl"
                    disabled={disabled}
                  />
                  <User className="size-4 absolute right-2" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />

        <FormField
          control={form.control}
          name="accountPassword"
          render={({ field }) => (
            <FormItem>
              <small>Senha</small>
              <FormControl>
                <div className="space-y-2 flex flex-col">
                  <div className="relative flex items-center">
                    <Input
                      value={password || field.value}
                      onChange={field.onChange}
                      placeholder="***********"
                      className="bg-accent outline-none rounded-xl"
                      type={showPassword}
                      disabled={disabled}
                    />
                    {showPassword === "password" ? (
                      <Eye
                        className="size-4 absolute right-2 top-2.5"
                        onClick={() => setShowPassword("text")}
                      />
                    ) : (
                      <EyeOff
                        className="size-4 absolute right-2 top-2.5"
                        onClick={() => setShowPassword("password")}
                      />
                    )}
                  </div>
                  <FormMessage />

                  <PasswordStrengthBar
                    password={password || field.value}
                    shortScoreWord="muito curta"
                    scoreWords={scoreWords}
                  />

                  <Button
                    variant="outline"
                    onClick={() => setShowPasswordGenerator((prev) => !prev)}
                  >
                    {!showPasswordGenerator
                      ? "Mostrar gerador de senha"
                      : "Ocultar gerador de senha"}
                  </Button>

                  {showPasswordGenerator && (
                    <PasswordGenerator
                      onChangePassword={field.onChange}
                      setPassword={setPassword}
                    />
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Separator />

        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <small>Empresa</small>
              <FormControl>
                <CompanyNameCombobox
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />

        <FormField
          control={form.control}
          name="siteUrl"
          render={({ field }) => (
            <FormItem className="mt-4">
              <small>URL do website</small>
              <FormControl>
                <Input
                  {...field}
                  placeholder="www.google.com"
                  className="bg-accent outline-none rounded-xl"
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Separator />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem className="py-6">
              <small>Notas</small>
              <FormControl>
                <Textarea
                  value={field.value || ""}
                  onChange={field.onChange}
                  className="bg-accent outline-none rounded-xl"
                  disabled={disabled}
                  rows={6}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Separator />

        <Button disabled={disabled} variant="outline" className="w-full py-5">
          {!disabled ? "Salvar" : <Loader2 className="size-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};

const Separator = () => {
  return <div className="w-full h-4"></div>;
};
