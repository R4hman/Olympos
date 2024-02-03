import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fetchHomeReview } from "../../services/apiHome";

const useHomeReviews = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["homeReviews"] });
  const { isLoading: isReviewLoading, data: homeReviews } = useQuery({
    queryKey: ["homeReviews"],
    queryFn: fetchHomeReview,
  });

  return {
    isReviewLoading,
    homeReviews,
  };
};
export default useHomeReviews;
