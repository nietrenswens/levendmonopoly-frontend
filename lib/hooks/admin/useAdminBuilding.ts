import Building from "@/lib/types/building";
import { BASE_URL } from "@/lib/utils";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export const getBuildingQueryKey = (id: string) => ["building", id];

const useAdminBuilding = (id: string): UseQueryResult<Building> => {
  const authHeader = useAuthHeader();
  return useQuery<Building>({
    queryKey: getBuildingQueryKey(id),
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/admin/building/` + id, {
        headers: {
          Authorization: authHeader,
        },
      });
      return response.data;
    },
  });
};

export default useAdminBuilding;
