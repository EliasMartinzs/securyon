import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.creditCards)[":id"]["$delete"]
>;

export const useDeletePayment = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      const response = await client.api.creditCards[":id"]["$delete"]({
        param: { id },
      });

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Cartao deletado com sucesso", {
        id: "card-deleted",
      });

      queryClient.invalidateQueries({ queryKey: ["payment"] });
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
    onError: () => {
      toast.error("Erro ao deletar cartao");
    },
  });

  return mutation;
};
