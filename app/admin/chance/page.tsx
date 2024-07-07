"use client";
import Container from "@/app/components/boilerplate/container/container";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useTeams from "@/lib/hooks/useTeams";
import ChanceCard from "@/lib/types/chancecard";
import { BASE_URL } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import toast from "react-hot-toast";

export default function Page() {
  const teams = useTeams();
  const [teamId, setTeamId] = useState("");
  const router = useRouter();
  const authHeader = useAuthHeader();

  const handleButtonPress = () => {
    if (!teamId || teamId.trim() == "") return;
    mutation.mutate();
  };

  const mutation = useMutation({
    mutationFn: () =>
      axios
        .post(
          `${BASE_URL}/team/${teamId}/chance`,
          {},
          {
            headers: {
              Authorization: authHeader,
            },
          }
        )
        .then((res) => res.data),
    onSuccess: (data: ChanceCard) => {
      router.push(
        `/admin/chance/result?prompt=${data.prompt}&result=${data.result}`
      );
    },
    onError: (error: AxiosError) => {
      if (error.response?.status !== 400) {
        toast.error("Er is iets misgegaan");
        return;
      }
      toast.error(error.response.data as string);
    },
  });

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Kanskaart trekken</h1>
      <Label htmlFor="team">Team</Label>
      <Select name="team" onValueChange={(val) => setTeamId(val)}>
        <SelectTrigger className="">
          <SelectValue placeholder="Selecteer een team" />
        </SelectTrigger>
        <SelectContent>
          {teams.data?.map((team) => (
            <SelectItem value={team.id} key={team.id}>
              {team.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button className="mt-2" onClick={handleButtonPress}>
        Kanskaart trekken
      </Button>
    </Container>
  );
}
