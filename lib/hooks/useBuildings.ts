import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { TeamBuilding } from "../types/teambuilding";
import { BASE_URL } from "../utils";

export const buildingsQueryKey = ["buildings"];

const useBuildings = (): UseQueryResult<TeamBuilding[]> => {
  const authHeader = useAuthHeader();
  return useQuery<TeamBuilding[]>({
    queryKey: buildingsQueryKey,
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/building`, {
        headers: {
          Authorization: authHeader,
        },
      });
      return response.data;
    },
  });
};

export default useBuildings;
