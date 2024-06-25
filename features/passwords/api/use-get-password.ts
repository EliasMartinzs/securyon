import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetPassword = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["password", { id }],
    queryFn: async () => {
      const response = await client.api.passwords[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch account");
      }

      const { data } = await response.json();

      return data[0];
    },
  });

  return query;
};
