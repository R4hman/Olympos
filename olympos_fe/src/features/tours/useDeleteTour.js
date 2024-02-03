import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTourApi } from "../../services/apiTours";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useDeleteTour = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { isLoading: tourDeleteLoading, mutate: deleteTour } = useMutation({
    mutationFn: (id) => deleteTourApi(id),
    onSuccess: () => {
      toast.success("Tur silindi");
      navigate(0);
      //   queryClient.invalidateQueries(["hotels"]);
      queryClient.invalidateQueries({
        queryKey: ["tours"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    tourDeleteLoading,
    deleteTour,
  };
};

export default useDeleteTour;
