import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteOrderApi } from "../../services/apiOrders";
import { useNavigate } from "react-router-dom";
const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: orderDeleteLoading, mutate: deleteOrder } = useMutation({
    mutationFn: (id) => deleteOrderApi(id),
    onSuccess: () => {
      toast.success("Order silindi");
      navigate(0);
      queryClient.invalidateQueries(["orders"]);
      // queryClient.invalidateQueries("orders");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    orderDeleteLoading,
    deleteOrder,
  };
};

export default useDeleteOrder;
