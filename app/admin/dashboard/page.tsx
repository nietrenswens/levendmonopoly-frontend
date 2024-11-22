"use client";
import PauseButton from "@/app/components/admin/pauseButton";
import Standings from "@/app/components/dashboard/cards/standings/standings";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useGameSettings, {
  gameSettingsQueryKey,
} from "@/lib/hooks/useGameSettings";
import { BASE_URL } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import toast from "react-hot-toast";

export default function Page() {
  const gameSettings = useGameSettings();
  const authHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const [paused, setPaused] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    async function fetchPausedState() {
      const pausedState = await gameSettings.data?.paused;
      setPaused(pausedState);
    }
    fetchPausedState();
  }, [gameSettings.data]);

  const mutation = useMutation({
    mutationFn: (paused: boolean) => {
      return axios.put(
        `${BASE_URL}/gamesettings`,
        {
          ...gameSettings.data,
          paused,
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
    },
    onError: () => {
      toast.error("Er is iets fout gegaan bij het pauzeren van het spel");
      setPaused(!paused);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: gameSettingsQueryKey,
      });
      setTimeout(() => {
        toast.success(`Spel ${paused ? "gepauzeerd" : "hervat"}`);
      }, 20);
    },
  });

  function togglePause() {
    const result = !paused;
    setPaused(result);
    mutation.mutate(result);
  }

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <Standings />
      <Card>
        <CardHeader>
          <CardTitle>Controle</CardTitle>
          <CardDescription>Bepaal het spel!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 grid-rows-1 gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PauseButton
                    isPaused={paused || false}
                    handleClick={() => togglePause()}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to library</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
