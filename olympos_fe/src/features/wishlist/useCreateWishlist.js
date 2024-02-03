import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createWishlist } from "../../services/apiWishlist";
import { useNavigate } from "react-router-dom";

function useCreateWishlist() {
  const queryClient = useQueryClient();

  const { isLoading: isWishlistCreating, mutate: createUserWishlist } =
    useMutation({
      mutationFn: createWishlist,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        // navigate(0);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { isWishlistCreating, createUserWishlist };
}

export default useCreateWishlist;
