import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editOrderApi } from "../../services/apiOrders";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useEditOrder() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate: editOrder, isLoading: isOrderEditing } = useMutation({
    mutationFn: (prop) => {
      editOrderApi(prop.newObj, prop.newObj._id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["orders"]);
    },
    // onSuccess: (data) => console.log("succesful data", data),
    onError: (err) => {
      toast.error(err.message);
      // navigate(0);
    },
    // // return err;
    // cacheTime: 0,
    // retry: 2,
  });

  return { isOrderEditing, editOrder };
}
