"use client";
import Loading from "@/app/components/boilerplate/loading/loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAdminBuildings, {
  buildingsQueryKey,
} from "@/lib/hooks/admin/useAdminBuildings";
import useTeams from "@/lib/hooks/useTeams";
import { BASE_URL, handleDownload, TransferState } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Building2,
  Download,
  DownloadCloud,
  Pencil,
  Trash,
  UploadCloud,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import toast from "react-hot-toast";

export default function Page() {
  const buildings = useAdminBuildings();
  const router = useRouter();
  const authHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const teams = useTeams();

  const [downloadPDFState, setDownloadPDFState] =
    useState<TransferState>("idle");
  const [downloadJSONState, setDownloadJSONState] =
    useState<TransferState>("idle");

  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      return axios
        .delete(`${BASE_URL}/admin/building`, {
          headers: {
            Authorization: authHeader,
          },
          data: {
            id: id,
          },
        })
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: buildingsQueryKey,
      });
      toast.success("Gebouw verwijderd!");
    },
  });

  const getTeamName = (id?: string) => {
    if (!id) return "Onbekend";
    const team = teams.data?.find((team) => team.id === id);
    return team?.name || "Onbekend";
  };

  const handleDelete = (id: string) => async () => {
    deleteMutation.mutate(id);
  };

  const handleJSONDownload = async () => {
    handleDownload(
      "/admin/building/exportjson",
      authHeader!,
      "application/json",
      "buildings.json",
      setDownloadJSONState
    );
  };

  const handlePDFDownload = async () => {
    handleDownload(
      "/admin/building/export",
      authHeader!,
      "application/pdf",
      "buildings.pdf",
      setDownloadPDFState
    );
  };

  return (
    <div className="bg-white p-4">
      <h1 className="text-2xl font-bold">Gebouwen</h1>
      <div className="md:flex space-x-2 my-2">
        <Button
          onClick={() => router.push("/admin/buildings/create")}
          variant={"default"}
          className="bg-green-400"
        >
          <Building2 />
          &nbsp; Nieuw gebouw
        </Button>
        <Button
          onClick={handlePDFDownload}
          variant={"default"}
          className="bg-orange-400"
          disabled={downloadPDFState === "pending"}
        >
          {downloadPDFState === "pending" ? (
            <Loading />
          ) : (
            <>
              <Download />
              &nbsp; PDF downloaden
            </>
          )}
        </Button>
        <Button
          onClick={handleJSONDownload}
          variant={"default"}
          className="bg-orange-400"
          disabled={downloadJSONState === "pending"}
        >
          {downloadJSONState === "pending" ? (
            <Loading />
          ) : (
            <>
              <DownloadCloud />
              &nbsp; Data downloaden
            </>
          )}
        </Button>
        <Button
          onClick={() => router.push("/admin/buildings/import")}
          variant={"default"}
          className="bg-blue-400"
        >
          <UploadCloud />
          &nbsp; Gebouwen inladen
        </Button>
      </div>
      <Table className="">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              Id ({buildings.data?.length ?? 0} gebouwen totaal)
            </TableHead>
            <TableHead>Naam</TableHead>
            <TableHead>Prijs</TableHead>
            <TableHead>Eigenaar</TableHead>
            <TableHead className="w-[100px]">Belasting</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {buildings.isLoading && (
            <TableCell colSpan={6} className="text-center mt-2">
              <Loading />
            </TableCell>
          )}
          {!buildings.isLoading && buildings.data!.length < 1 && (
            <TableCell colSpan={6} className="text-center mt-2">
              Er zijn geen gebouwen... Maak er een!
            </TableCell>
          )}
          {buildings.data &&
            buildings.data?.map((building) => (
              <TableRow key={building.id}>
                <TableCell className="font-medium">{building.id}</TableCell>
                <TableCell className="font-medium">{building.name}</TableCell>
                <TableCell>{building.price}</TableCell>
                <TableCell>{getTeamName(building.ownerId)}</TableCell>
                <TableCell>{building.tax ? "Ja" : "Nee"}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() =>
                        router.push("/admin/buildings/" + building.id + "/edit")
                      }
                      variant={"secondary"}
                      size={"sm"}
                    >
                      <Pencil />
                    </Button>
                    <Dialog>
                      <DialogTrigger>
                        <Button variant={"destructive"} size={"sm"}>
                          <Trash />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Weet je het zeker?</DialogTitle>
                        <DialogDescription>
                          Weet je zeker dat je <b>{building.name}</b> wilt
                          verwijderen?
                        </DialogDescription>
                        <DialogFooter>
                          <Button
                            variant={"destructive"}
                            onClick={handleDelete(building.id)}
                          >
                            Verwijderen
                          </Button>
                          <DialogClose asChild>
                            <Button variant={"default"}>Annuleren</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
