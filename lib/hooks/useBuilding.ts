import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import Building from "../types/building";
import { BASE_URL } from "../utils";

export const getBuildingsQueryKey = (id: string) => ["buildings", id];

const useBuilding = (id: string): UseQueryResult<Building | undefined> => {
  const authHeader = useAuthHeader();
  return useQuery<Building | undefined>({
    queryKey: getBuildingsQueryKey(id),
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/building/${id}`, {
        headers: {
          Authorization: authHeader,
        },
      });
      return response.data;
    },
  });
};

export default useBuilding;
