import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserApi } from "../../services/apiUsers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCreateUser() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { isLoading: isUserCreating, mutate: createUser } = useMutation({
    mutationFn: createUserApi,
    onSuccess: () => {
      toast.success("Yeni  user yaradıldı");
      navigate(0);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUserCreating, createUser };
}

export default useCreateUser;
