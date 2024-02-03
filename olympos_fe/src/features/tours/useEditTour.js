import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTourApi } from "../../services/apiTours";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useEditTour() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: editTour, isLoading: isTourEditing } = useMutation({
    mutationFn: (prop) => {
      editTourApi(prop.formData, prop.formData.get("id"));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tours"] });

      // navigate(0);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isTourEditing, editTour };
}

export default useEditTour;
