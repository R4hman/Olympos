import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTourApi } from "../../services/apiTours";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCreateTour() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isTourCreating, mutate: createTour } = useMutation({
    mutationFn: (data) => createTourApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tours"] });

      // navigate(0);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isTourCreating, createTour };
}

export default useCreateTour;
