import User from "@/lib/types/user";
import { BASE_URL } from "@/lib/utils";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export const usersQueryKey = ["users"];

const useUsers = (): UseQueryResult<User[]> => {
  const authHeader = useAuthHeader();
  return useQuery<User[]>({
    queryKey: usersQueryKey,
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/user`, {
        headers: {
          Authorization: authHeader,
        },
      });
      return response.data;
    },
  });
};

export default useUsers;
