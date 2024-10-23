"use client";
import BasicData from "@/app/components/dashboard/cards/basicData/basicData";
import BuildingsOverview from "@/app/components/dashboard/cards/buildingsOverview/buildingsOverview";
import RecentFinancialActions from "@/app/components/dashboard/cards/recentFinancialActions/recentFinancialActions";
import Standings from "@/app/components/dashboard/cards/standings/standings";
import useTeam from "@/lib/hooks/useTeam";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import toast from "react-hot-toast";

export default function Page() {
  const authUser = useAuthUser() as { name: string };
  const team = useTeam();
  if (team.isLoading) {
    return <div>Loading...</div>;
  } else if (team.isError) {
    toast.error(
      "Er is iets fout gegaan bij het ophalen. Probeer het later opnieuw.",
      {
        id: "error",
      }
    );
  }

  const head = (
    <>
      <h1 className="text-2xl font-bold">Welkom {authUser.name}</h1>
      <h2 className="pb-2 lg:block hidden text-lg">
        Wat is de stand van zaken?
      </h2>
    </>
  );

  return (
    <div>
      {head}
      <div className="lg:flex hidden justify-evenly items-baseline gap-4 mb-4">
        <BasicData
          title="Balans"
          data={"€ " + (team.data?.balance ? team.data?.balance : 0)}
          icon="money"
        />
        <BasicData
          title="Waarde"
          data={"€ " + (team.data?.worth ? team.data?.worth : 0)}
          icon="money"
        />
        <BasicData
          title="Huidige positie"
          data={team.data?.position ? team.data?.position + "e" : "0"}
          icon="people"
          className="w-32"
        />
        <BasicData
          title="Gebouwen"
          data={`${team.data?.numberOfBuildings ?? 0} Gebouwen`}
          footer="2 zonder belasting"
          icon="building"
        />
        <BasicData title="Kanskaarten" data="0 kanskaarten" icon="chance" />
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <Standings />
        <RecentFinancialActions />
        <BuildingsOverview />
      </div>
    </div>
  );
}
