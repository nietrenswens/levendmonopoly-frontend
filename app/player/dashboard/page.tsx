"use client";
import BasicData from "@/app/components/dashboard/cards/basicData/basicData";
import RecentFinancialActions from "@/app/components/dashboard/cards/recentFinancialActions/recentFinancialActions";
import Standings from "@/app/components/dashboard/cards/standings/standings";

export default function Page() {
  return (
    <div>
      <div className="lg:flex hidden justify-evenly items-baseline gap-4 mb-4">
        <BasicData title="Balans" data="Team 1" icon="money" />
        <BasicData
          title="Huidige positie"
          data="1e"
          icon="people"
          className="w-32"
        />
        <BasicData
          title="Gebouwen"
          data="5 Gebouwen"
          footer="2 zonder belasting"
          icon="building"
        />
        <BasicData title="Kanskaarten" data="Team 1" icon="chance" />
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <Standings />
        <RecentFinancialActions />
        <RecentFinancialActions />
      </div>
    </div>
  );
}
