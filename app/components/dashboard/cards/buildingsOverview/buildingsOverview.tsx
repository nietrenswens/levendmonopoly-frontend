import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useBuildings from "@/lib/hooks/useBuildings";
import toast from "react-hot-toast";

export default function BuildingsOverview() {
  const buildings = useBuildings();

  if (buildings.isError) {
    toast.error(
      "Er is iets fout gegaan bij het ophalen van de gebouwen. Probeer het later opnieuw.",
      {
        id: "error",
      }
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col space-y-1">
          <CardTitle className="text-2xl font-bold">Jouw eigendommen</CardTitle>
          <CardDescription>Welke gebouwen bezit jij?</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Naam</TableHead>
              <TableHead className="w-[100px]">Prijs</TableHead>
              <TableHead>Belasting</TableHead>
            </TableRow>
          </TableHeader>
          {buildings.data && buildings.data.length > 0 && (
            <TableCaption>Ga naar compleet overzicht</TableCaption>
          )}
          <TableBody>
            {buildings.isLoading ? (
              <TableRow>
                <TableCell colSpan={3}>Loading...</TableCell>
              </TableRow>
            ) : buildings.data == null || buildings.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>
                  {buildings.isError
                    ? "Kon geen gebouwen laden"
                    : "Je hebt nog geen gebouwen"}
                </TableCell>
              </TableRow>
            ) : (
              buildings.data.map((building, index) => (
                <TableRow key={index}>
                  <TableCell>{building.name}</TableCell>
                  <TableCell>{building.price}</TableCell>
                  <TableCell>{building.tax ? "Ja" : "Nee"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
