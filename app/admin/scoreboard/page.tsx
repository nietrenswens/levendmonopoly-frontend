"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useTeams from "@/lib/hooks/useTeams";

export default function Page() {
  const teams = useTeams();
  return (
    <div className="bg-white p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Positie</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Waarde</TableHead>
            <TableHead>Balans</TableHead>
            <TableHead>Gebouwen</TableHead>
            <TableHead>Gebouwen zonder belasting</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.data?.map((team, index) => (
            <TableRow key={team.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{team.name}</TableCell>
              <TableCell>€ {team.worth}</TableCell>
              <TableCell>€ {team.balance}</TableCell>
              <TableCell>{team.buildings!.length}</TableCell>
              <TableCell>
                {team.buildings!.filter((b) => !b.tax).length}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
