"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useBuildings from "@/lib/hooks/useBuildings";
export default function Buildings() {
  const buildings = useBuildings();
  return (
    <div>
      <h1 className="text-2xl font-bold">Jouw eigendommen</h1>
      <div className="grid grid-cols-3 gap-4 mt-2">
        {buildings.data?.map((building) => (
          <Card key={building.id}>
            <CardHeader>
              <h3 className="text-xl font-semibold">{building.name}</h3>
              <img alt={building.name} src={building.image} />
            </CardHeader>
            <CardContent>
              <p>Prijs: {building.price}</p>
              <p>
                Belasting:{" "}
                {building.tax ? (
                  "Ja"
                ) : (
                  <span className="text-red-400">Nee</span>
                )}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
