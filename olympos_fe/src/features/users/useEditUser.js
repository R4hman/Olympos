import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUserApi } from "../../services/apiUsers";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useEditUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: editUser, isLoading: isUserEditing } = useMutation({
    mutationFn: (prop) => {
      editUserApi(prop.newObj, prop.newObj.id);
    },
    onSuccess: () => {
      toast.success("User successfully edited");
      navigate(0);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUserEditing, editUser };
}

export default useEditUser;
