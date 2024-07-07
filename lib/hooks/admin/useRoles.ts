import Role from "@/lib/types/role";
import { BASE_URL } from "@/lib/utils";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export const rolesQueryKey = ["roles"];

const useRoles = (): UseQueryResult<Role[]> => {
  const authHeader = useAuthHeader();
  return useQuery<Role[]>({
    queryKey: rolesQueryKey,
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/admin/role`, {
        headers: {
          Authorization: authHeader,
        },
      });
      return response.data;
    },
  });
};

export default useRoles;
