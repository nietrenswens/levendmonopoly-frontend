"use client";
import Loading from "@/app/components/boilerplate/loading/loading";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAdminBuildings from "@/lib/hooks/admin/useAdminBuildings";
import { Building2, Pencil, Trash } from "lucide-react";

export default function Page() {
  const buildings = useAdminBuildings();

  return (
    <div className="bg-white p-4">
      <Button variant={"default"} className="bg-green-400">
        <Building2 />
        &nbsp; Nieuw gebouw
      </Button>
      <Table className="">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Naam</TableHead>
            <TableHead>Prijs</TableHead>
            <TableHead>Eigenaar</TableHead>
            <TableHead className="w-[100px]">Belasting</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {buildings.isLoading && (
            <TableCell colSpan={5} className="text-center mt-2">
              <Loading />
            </TableCell>
          )}
          {!buildings.isLoading && buildings.data!.length < 1 && (
            <TableCell colSpan={5} className="text-center mt-2">
              Er zijn geen gebouwen... Maak er een!
            </TableCell>
          )}
          {buildings.data?.map((building) => (
            <TableRow key={building.id}>
              <TableCell className="font-medium">{building.name}</TableCell>
              <TableCell>{building.price}</TableCell>
              <TableCell>Ben</TableCell>
              <TableCell>{building.tax ? "Ja" : "Nee"}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant={"secondary"} size={"sm"}>
                    <Pencil />
                  </Button>
                  <Button variant={"destructive"} size={"sm"}>
                    <Trash />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
