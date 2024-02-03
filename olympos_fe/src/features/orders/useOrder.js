import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchOrdersApi } from "../../services/apiOrders";

const useOrders = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["orders"] });
  const { isLoading: isOrdersLoading, data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrdersApi,
  });

  return {
    isOrdersLoading,
    orders,
  };
};

export default useOrders;
