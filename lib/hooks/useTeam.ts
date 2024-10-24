import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { BASE_URL } from "../utils";

export const teamQueryKey = ["team"];

export interface Team {
  name: string;
  balance: number;
  worth: number;
  numberOfBuildings: boolean;
  position: number;
}

const useBuildings = (): UseQueryResult<Team> => {
  const authHeader = useAuthHeader();
  return useQuery<Team>({
    queryKey: teamQueryKey,
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/me`, {
        headers: {
          Authorization: authHeader,
        },
      });
      return response.data;
    },
  });
};

export default useBuildings;
