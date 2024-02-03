import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserApi } from "../../services/apiUsers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { isLoading: userDeleteLoading, mutate: deleteUser } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate(0);
      //   queryClient.invalidateQueries(["hotels"]);
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    userDeleteLoading,
    deleteUser,
  };
};

export default useDeleteUser;
