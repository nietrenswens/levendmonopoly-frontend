/* eslint-disable @next/next/no-img-element */
"use client";
import Loading from "@/app/components/boilerplate/loading/loading";
import { Button } from "@/components/ui/button";
import useBuilding from "@/lib/hooks/useBuilding";
import useTeam from "@/lib/hooks/useTeam";
import { BASE_URL } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const building = useBuilding(params.id!);
  const authHeader = useAuthHeader();
  const router = useRouter();
  const team = useTeam();

  const mutation = useMutation({
    mutationKey: ["buy", params.id],
    mutationFn: async (tax: boolean) =>
      axios
        .post(
          BASE_URL + `/building/buy`,
          {
            buildingId: params.id,
            tax: tax,
          },
          {
            headers: {
              Authorization: authHeader,
            },
          }
        )
        .then((res) => res.data),
    onSuccess: (data) => {
      if (data.success)
        router.replace("/player/dashboard?success=true&message=" + data.reason);
      if (!data.success)
        router.replace("/player/dashboard?error=true&message=" + data.reason);
    },
  });

  const handleBuy = async (tax: boolean) => {
    mutation.mutate(tax);
  };

  if (team.isLoading || team.data === undefined) {
    return <Loading />;
  }

  return (
    <div className="bg-white p-4">
      {!building.data ? (
        <p>Nee</p>
      ) : (
        <div className="text-center">
          <h1 className="font-bold text-2xl">{building.data.name}</h1>
          <div className="text-center mt-4">
            <img
              alt={building.data.name}
              className="lg:w-1/2 w-full inline-block"
              src={building.data.image}
            />
          </div>
          <div className="mt-4">
            <p className="text-xl">Prijs: &euro;{building.data.price}</p>
            <p className="text-xl">
              Belasting: &euro;{building.data.price * 0.6}
            </p>
            <p className="text-xl">
              Prijs met belasting: &euro;
              {building.data.price * 0.6 + building.data.price}
            </p>
            <p className="text-xl mt-2">
              Huidig Saldo: &euro;{team.data?.balance}
            </p>
            <p></p>
          </div>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <Button
              variant={"default"}
              className="bg-green-400"
              onClick={() => handleBuy(false)}
              disabled={
                building.data.ownerId == team.data.id ||
                team.data?.balance < building.data.price
              }
            >
              Kopen
            </Button>
            <Button
              variant={"default"}
              className="bg-orange-400"
              onClick={() => handleBuy(true)}
              disabled={
                building.data.ownerId == team.data.id ||
                team.data?.balance < building.data.price
              }
            >
              Kopen met belasting
            </Button>
            <Button
              variant={"outline"}
              onClick={() => router.replace("/player/dashboard")}
            >
              Annuleren
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
