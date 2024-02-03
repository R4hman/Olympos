import { useQuery } from "@tanstack/react-query";
import { fetchUsersApi } from "../../services/apiUsers";
import { getUserDetails } from "../../services/apiAuth";

const useUsers = () => {
  const { isLoading: isUsersLoading, data: users } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsersApi,
    retry: 3,
  });

  return {
    isUsersLoading,
    users,
  };
};
export const useClientUsers = () => {
  const { isLoading: isClientUsersLoading, data: clientUsers } = useQuery({
    queryKey: ["clientUsers"],
    queryFn: getUserDetails,
  });

  return {
    isClientUsersLoading,
    clientUsers,
  };
};

export default useUsers;
