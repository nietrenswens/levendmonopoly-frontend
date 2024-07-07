"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useAdminBuildings from "@/lib/hooks/admin/useAdminBuildings";
import useTeams, { teamsQueryKey } from "@/lib/hooks/useTeams";
import { BASE_URL } from "@/lib/utils";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import toast from "react-hot-toast";

export default function Page() {
  const teams = useTeams();
  const buildings = useAdminBuildings();
  const router = useRouter();
  const authHeader = useAuthHeader();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationKey: teamsQueryKey,
    mutationFn: (id: string) =>
      axios
        .delete(BASE_URL + `/team/${id}`, {
          headers: {
            Authorization: authHeader,
          },
        })
        .then((res) => res.data),
    onSuccess: () => {
      toast.success(`Team is verwijderd`);
      queryClient.invalidateQueries({
        queryKey: teamsQueryKey,
      });
    },
    onError: (err: AxiosError) => {
      console.log(err);
      toast.error(
        `Er is iets fout gegaan tijdens het verwijderen van het team`
      );
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold">Teams</h1>
      <div className="flex my-2">
        <Button
          onClick={() => router.push("/admin/teams/create")}
          className="bg-green-400"
        >
          <Building2 /> &nbsp;Toevoegen
        </Button>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 mt-4">
        {teams.data?.map((team) => (
          <div key={team.id} className="bg-white p-4 rounded-lg">
            <h2 className="text-lg font-bold">{team.name}</h2>
            <p>Balance: &euro;{team.balance}</p>
            <p>Worth: &euro;{team.worth}</p>
            <hr className="my-2" />
            <p>
              Gebouwen (&euro;
              {buildings.data
                ?.filter((b) => b.ownerId == team.id)
                .reduce((sum, building) => sum + building.price, 0)}
              ):
            </p>
            <ul>
              {buildings.data
                ?.filter((b) => b.ownerId == team.id)
                .map((building) => (
                  <li key={building.id}>
                    - {building.name} (&euro;{building.price})
                    {!building.tax ? (
                      <span className="text-red-400">(geen belasting)</span>
                    ) : (
                      ""
                    )}
                  </li>
                ))}
            </ul>
            <div className="mt-2">
              <h2 className="font-semibold text-center">Acties</h2>
              <div className="flex justify-center space-x-2 mt-2">
                <Button className="bg-orange-400" disabled>
                  Bewerken
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button className="bg-red-400">Verwijderen</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>Team verwijderen</AlertDialogTitle>
                    <AlertDialogDescription>
                      Weet je zeker dat je {team.name} wilt verwijderen?
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuleren</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(team.id)}>
                        Verwijderen
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
