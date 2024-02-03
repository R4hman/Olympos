import { useQuery } from "@tanstack/react-query";
import { fetchUserWishlist } from "../../services/apiWishlist";

const useUserWishlist = () => {
  const {
    data: wishlist,
    isLoading: isWishlistLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchUserWishlist,
    refetchInterval: 0,
    cacheTime: 0,
  });

  return {
    wishlist,
    isWishlistLoading,
    isError,
    error,
  };
};

export default useUserWishlist;
