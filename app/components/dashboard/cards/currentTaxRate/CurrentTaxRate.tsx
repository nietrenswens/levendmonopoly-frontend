"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useGameSettings from "@/lib/hooks/useGameSettings";

function CurrentTaxRate() {
  const settings = useGameSettings();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Huidig Belastingspercentage</CardTitle>
      </CardHeader>
      <CardContent>{(settings.data?.taxRate ?? 0) * 100}%</CardContent>
    </Card>
  );
}

export default CurrentTaxRate;
