import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import GameSettings from "../types/gamesettings";
import { BASE_URL } from "../utils";

export const gameSettingsQueryKey = ["gameSettings"];

const useGameSettings = (): UseQueryResult<GameSettings> => {
  const authHeader = useAuthHeader();
  return useQuery<GameSettings>({
    queryKey: gameSettingsQueryKey,
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/gamesettings`, {
        headers: {
          Authorization: authHeader,
        },
      });
      return response.data;
    },
  });
};

export default useGameSettings;
