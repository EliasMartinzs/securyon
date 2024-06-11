import { InferRequestType, InferResponseType } from "hono";
import { client } from "../../../lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.passwords.$post>;
type RequestType = InferRequestType<typeof client.api.passwords.$post>["json"];

export const useCreatePassword = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.passwords.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Senha criada!", {
        id: "create-password",
      });
      queryClient.invalidateQueries({ queryKey: ["passwords"] });
    },
    onError: () => {
      toast.error("Falhou ao criar senha.", {
        id: "create-password",
      });
    },
  });

  return mutation;
};
