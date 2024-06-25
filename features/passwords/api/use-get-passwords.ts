import { useQuery } from "@tanstack/react-query";
import { client } from "../../../lib/hono";

export const useGetPasswords = () => {
  const query = useQuery({
    queryKey: ["passwords"],
    queryFn: async () => {
      const response = await client.api.passwords.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch passwords");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
