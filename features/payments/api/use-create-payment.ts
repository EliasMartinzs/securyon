import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.creditCards.$post>;
type RequestType = InferRequestType<
  typeof client.api.creditCards.$post
>["json"];

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.creditCards.$post({ json });

      return response.json();
    },
    onSuccess: () => {
      toast.success(`Cartao criado com sucesso`, {
        id: "create-credit-card",
      });

      queryClient.invalidateQueries({ queryKey: ["payment"] });
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });

  return mutation;
};
