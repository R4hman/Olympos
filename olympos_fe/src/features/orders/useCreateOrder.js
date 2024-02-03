import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createTourOrderApi } from "../../services/apiOrders";
import { useNavigate } from "react-router-dom";

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isOrderCreating, mutate: createOrder } = useMutation({
    mutationFn: createTourOrderApi,
    onSuccess: () => {
      toast.success("Yeni  order yaradıldı");
      navigate(0);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isOrderCreating, createOrder };
}
