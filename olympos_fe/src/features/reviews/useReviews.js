import { useQuery } from "@tanstack/react-query";
import { fetchReviewsApi } from "../../services/apiReviews";

const useReviews = () => {
  const {
    isLoading: isReviewsLoading,
    data: reviews,
    error,
    refetch,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviewsApi,

    // {
    //   refetchOnWindowFocus: false,
    //   refetchOnMount: true,
    //   staleTime: 0,
    //   cacheTime: 0,

    //   // refetchInterval: 0,
    //   // retry: 3,
    // }
  });

  return {
    isReviewsLoading,
    reviews,
    error,
    refetch,
  };
};

export default useReviews;
