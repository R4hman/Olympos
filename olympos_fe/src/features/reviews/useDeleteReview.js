import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteReviewApi } from "../../services/apiReviews";
import { useNavigate } from "react-router-dom";

const useDeleteReview = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: reviewDeleteLoading, mutate: deleteReview } = useMutation({
    mutationFn: deleteReviewApi,
    onSuccess: () => {
      toast.success("Review silindi");
      navigate(0);
      queryClient.invalidateQueries("reviews");
      // queryClient.invalidateQueries({
      //   queryKey: ["reviews"],
      // });
      // queryClient.refetchQueries({
      //   queryKey: ["reviews"],
      // });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    reviewDeleteLoading,
    deleteReview,
  };
};

export default useDeleteReview;
