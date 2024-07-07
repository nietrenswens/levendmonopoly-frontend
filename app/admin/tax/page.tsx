"use client";
import Container from "@/app/components/boilerplate/container/container";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAdminBuildings, {
  buildingsQueryKey,
} from "@/lib/hooks/admin/useAdminBuildings";
import useTeams from "@/lib/hooks/useTeams";
import { BASE_URL } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import toast from "react-hot-toast";

const TaxPage: React.FC = () => {
  const teams = useTeams();
  const fetchedBuildings = useAdminBuildings();
  const authHeader = useAuthHeader();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const [buildingId, setBuildingId] = useState<string | null>(null);

  const mutation = useMutation({
    mutationKey: ["tax"],
    mutationFn: (values: { buildingId: string }) => {
      console.log(buildingId);
      return axios
        .post(
          BASE_URL + "/admin/building/confiscate",
          {
            id: values.buildingId,
          },
          {
            headers: {
              Authorization: authHeader,
            },
          }
        )
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: buildingsQueryKey,
      });
      router.replace("/admin/dashboard");
      toast.success("Gebouw in beslag genomen!");
    },
    onError: () => {
      toast.error("Er is iets misgegaan!");
    },
  });

  useEffect(() => {
    setBuildingId("");
  }, [ownerId]);

  const handleSubmit = () => {
    if (!buildingId) {
      toast.error("Selecteer een gebouw");
      return;
    }
    mutation.mutate({ buildingId: buildingId });
  };

  return (
    <Container>
      <h1 className="text-2xl font-bold">Belastingsdienst</h1>
      <form className="mt-2" onSubmit={handleSubmit}>
        <label htmlFor="first-selector">Team</label>
        <Select onValueChange={(value) => setOwnerId(value)}>
          <SelectTrigger className="lg:w-80">
            <SelectValue placeholder="Selecteer een team..." />
          </SelectTrigger>
          <SelectContent>
            {teams.data?.map((team) => (
              <SelectItem key={team.id} value={team.id}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="mt-2">
          <label htmlFor="building selector">Gebouw</label>
          <Select onValueChange={(value) => setBuildingId(value)}>
            <SelectTrigger className="lg:w-80">
              <SelectValue placeholder="Selecteer een gebouw..." />
            </SelectTrigger>
            <SelectContent>
              {fetchedBuildings.data
                ?.filter((b) => b.ownerId == ownerId && !b.tax)
                .map((building) => (
                  <SelectItem key={building.id} value={building.id}>
                    {building.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4">
          <Button
            className="bg-green-400"
            onClick={handleSubmit}
            type="button"
            disabled={!buildingId}
          >
            Gebouw in beslag nemen
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default TaxPage;
