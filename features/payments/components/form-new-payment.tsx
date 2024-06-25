"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatCardDateExpiration, formatCardNumber } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { CreditCard } from "@/components/payments-page/credit-card";
import { cardColors } from "@/constants";

type Props = {
  onSubmit: (values: formValues) => void;
  disabled: boolean;
};

const insertForm = z.object({
  cardNumber: z.string().min(19, {
    message: "Por favor insira o numero.",
  }),
  cardHolderName: z.string().min(4, {
    message: "Por favor insira o nome.",
  }),
  expirationDate: z.string().min(1, {
    message: "Por favor insira a data de validade.",
  }),
  cvv: z.string().min(3, {
    message: "Por favor insira o CVV",
  }),
  cardType: z.string().min(1, {
    message: "Por favor insira o tipo do cartao",
  }),
  cardColor: z.string().optional(),
  notes: z.string().optional(),
});

type formValues = z.infer<typeof insertForm>;

export const FormNewPayment = ({ disabled, onSubmit }: Props) => {
  const form = useForm<formValues>({
    mode: "onChange",
    resolver: zodResolver(insertForm),
    defaultValues: {
      cardNumber: "",
      cardHolderName: "",
      expirationDate: "",
      cvv: "",
      cardType: "credit",
      cardColor: "",
      notes: "",
    },
  });

  const handleSubmit = (values: formValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full p-4 lg:p-5 overflow-y-auto hidden-scrollbar flex flex-col gap-y-4"
      >
        <CreditCard
          values={form.getValues()}
          className="md:max-w-96 text-background dark:text-foreground"
          onOpenChange={() => {}}
          setPaymentId={() => {}}
          handleSelected={() => {}}
          multipleDelete={false}
        />
        <FormField
          control={form.control}
          name="cardHolderName"
          render={({ field }) => (
            <FormItem>
              <small>Nome no cartao</small>
              <FormControl>
                <Input
                  className="bg-accent outline-none rounded-xl"
                  disabled={disabled}
                  placeholder="Jonh doe"
                  maxLength={18}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <small>Numero do cartao</small>
              <FormControl>
                <Input
                  className="bg-accent outline-none rounded-xl input-number"
                  disabled={disabled}
                  placeholder="0000 0000 0000 0000"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(formatCardNumber(e.target.value));
                  }}
                  maxLength={19}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex items-center justify-between gap-2">
          <FormField
            control={form.control}
            name="expirationDate"
            render={({ field }) => (
              <FormItem>
                <small>Vencimento</small>
                <FormControl>
                  <Input
                    className="bg-accent outline-none rounded-xl input-number"
                    disabled={disabled}
                    placeholder="MM/AA"
                    value={field.value}
                    maxLength={5}
                    onChange={(e) => {
                      field.onChange(formatCardDateExpiration(e));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <small>CVV</small>
                <FormControl>
                  <InputOTP maxLength={3} {...field} disabled={disabled}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="cardType"
          render={({ field }) => (
            <FormItem>
              <small>Tipo de cartao</small>
              <FormControl>
                <RadioGroup
                  defaultValue="credit"
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-x-5"
                  disabled={disabled}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit">Credito</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="debit" id="debit" />
                    <Label htmlFor="debit">Debito</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cardColor"
          render={({ field }) => (
            <FormItem>
              <small>Cor do cartao</small>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Cor do cartao" />
                  </SelectTrigger>
                  <SelectContent>
                    {cardColors.map((color) => (
                      <SelectItem
                        value={color.gradient}
                        style={{ background: color.gradient }}
                        className="h-14"
                        key={color.name}
                      >
                        {color.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <small>Notas</small>
              <FormControl>
                <Textarea
                  value={field.value!}
                  onChange={field.onChange}
                  placeholder="Lorem ipsum"
                  rows={6}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="secondary" disabled={disabled}>
          {!disabled ? (
            "Salvar"
          ) : (
            <Loader2 className="animate-spin text-muted-foreground" />
          )}
        </Button>
      </form>
    </Form>
  );
};
