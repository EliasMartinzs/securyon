import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.passwords)["buld-delete"]["$post"]
>;
type ResquestType = InferRequestType<
  (typeof client.api.passwords)["buld-delete"]["$post"]
>["json"];

export const useBulkDeletePassword = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, ResquestType>({
    mutationFn: async (json) => {
      const response = await client.api.passwords["buld-delete"]["$post"]({
        json,
      });

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Senhas deletadas com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["passwords"] });
    },
    onError: () => {
      toast.error("Houve um erro, Tente novamente!");
    },
  });

  return mutation;
};
