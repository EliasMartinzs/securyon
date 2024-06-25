import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.passwords)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.passwords)[":id"]["$patch"]
>["json"];

export const useUpdatePassword = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.passwords[":id"]["$patch"]({
        param: { id },
        json,
      });

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Senha editada com sucesso!", {
        id: "update-password",
      });

      queryClient.invalidateQueries({ queryKey: ["password", { id }] });
      queryClient.invalidateQueries({ queryKey: ["passwords"] });
    },
    onError: () => {
      toast.error("Houve um erro. Tente novamente!");
    },
  });

  return mutation;
};
