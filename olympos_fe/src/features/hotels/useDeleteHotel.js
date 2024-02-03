import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteHotelApi } from "../../services/apiHotels";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useDeleteHotel = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { isLoading: hotelDeleteLoading, mutate: deleteHotel } = useMutation({
    mutationFn: deleteHotelApi,
    onSuccess: () => {
      toast.success("Hotel silindi");
      // navigate(0);
      //   queryClient.invalidateQueries(["hotels"]);
      queryClient.invalidateQueries({
        queryKey: ["hotels"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    hotelDeleteLoading,
    deleteHotel,
  };
};

export default useDeleteHotel;
