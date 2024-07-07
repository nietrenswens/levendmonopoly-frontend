import Building from "@/lib/types/building";
import { BASE_URL } from "@/lib/utils";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export const buildingsQueryKey = ["buildings"];

const useAdminBuildings = (): UseQueryResult<Building[]> => {
  const authHeader = useAuthHeader();
  return useQuery<Building[]>({
    queryKey: buildingsQueryKey,
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/admin/building`, {
        headers: {
          Authorization: authHeader,
        },
      });
      return response.data;
    },
  });
};

export default useAdminBuildings;
