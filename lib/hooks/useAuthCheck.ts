import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { BASE_URL } from "../utils";

export const authCheckQueryKey = ["authCheck"];

const useAuthCheck = () => {
  const authHeader = useAuthHeader();
  return useQuery({
    queryKey: authCheckQueryKey,
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/auth/check`, {
        headers: {
          Authorization: authHeader,
        },
      });
      return response.data;
    },
  });
};

export default useAuthCheck;
