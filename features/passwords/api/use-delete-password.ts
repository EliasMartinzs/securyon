import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.passwords)[":id"]["$delete"]
>;

export const useDeletePassword = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async json => {
      const response = await client.api.passwords[":id"]["$delete"]({
        param: { id },
      });

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Senha deletada com sucesso!", {
        id: "password-deleted",
      });

      queryClient.invalidateQueries({ queryKey: ["password", { id }] });
      queryClient.invalidateQueries({ queryKey: ["passwords"] });
    },
    onError: () => {
      toast.error("Houve um problema. Tente novamente!");
    },
  });

  return mutation;
};
