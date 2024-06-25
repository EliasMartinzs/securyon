import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetPayments = () => {
  const query = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const response = await client.api.creditCards.$get();

      if (!response.ok) {
        throw new Error("failed to fetch payments");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
