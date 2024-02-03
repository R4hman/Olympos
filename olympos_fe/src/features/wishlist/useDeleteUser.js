import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { deleteWishlist } from "../../services/apiWishlist";
import { useNavigate } from "react-router-dom";

const useDeleteWishlist = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: wishlistDeleteLoading, mutate: deleteUserWishlist } =
    useMutation({
      mutationFn: deleteWishlist,
      onSuccess: () => {
        // navigate(0);
        //   queryClient.invalidateQueries(["hotels"]);
        queryClient.invalidateQueries({
          queryKey: ["wishlist"],
        });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return {
    wishlistDeleteLoading,
    deleteUserWishlist,
  };
};

export default useDeleteWishlist;
