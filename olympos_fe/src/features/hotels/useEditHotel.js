import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editHotelApi } from "../../services/apiHotels";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useEditHotel() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: editHotel, isLoading: isHotelEditing } = useMutation({
    mutationFn: (prop) => {
      editHotelApi(prop.formData, prop.formData.get("id"));
    },
    onSuccess: () => {
      // navigate(0);
      // toast.success("Hotel successfully edited");
      queryClient.invalidateQueries({ queryKey: ["hotels"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isHotelEditing, editHotel };
}
