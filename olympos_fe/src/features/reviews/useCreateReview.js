import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReviewApi } from "../../services/apiReviews";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCreateReview() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isReviewCreating, mutate: createReview } = useMutation({
    mutationFn: createReviewApi,
    onSuccess: () => {
      toast.success("Şərhiniz qeydə alındı");
      navigate(0);
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isReviewCreating, createReview };
}
