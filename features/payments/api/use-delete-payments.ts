import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.creditCards)["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.creditCards)["bulk-delete"]["$post"]
>["json"];

export const useDeletePayments = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.creditCards["bulk-delete"]["$post"]({
        json,
      });

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Cartoes deletados com sucesso!", {
        id: "card-deleted-bulk",
      });

      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["payment"] });
    },
    onError: () => {
      toast.error("Erro ao deletar os cartoes", {
        id: "card-deleted-bulk",
      });
    },
  });

  return mutation;
};
