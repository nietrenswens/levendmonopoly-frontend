"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useUsers, { usersQueryKey } from "@/lib/hooks/admin/useUsers";
import User from "@/lib/types/user";
import { BASE_URL } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import toast from "react-hot-toast";

export default function Page() {
  const users = useUsers();
  const router = useRouter();
  const authHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const authUser = useAuthUser() as { name: string };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const isDeleteButtonDisabled = (name: string) => {
    return users.data?.length == 1 || authUser.name == name;
  };

  const deleteMutation = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: (id: string) =>
      axios
        .delete(BASE_URL + `/user/${id}`, {
          headers: {
            Authorization: authHeader,
          },
        })
        .then((res) => res.data),
    onSuccess: () => {
      toast.success(`Gebruiker is verwijderd`);
      queryClient.invalidateQueries({
        queryKey: usersQueryKey,
      });
    },
    onError: () => {
      toast.error(
        `Er is iets fout gegaan tijdens het verwijderen van de gebruiker`
      );
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Gebruikers</h1>
      <div className="flex my-2">
        <Button
          onClick={() => router.push("/admin/users/create")}
          className="bg-green-400"
        >
          <User2 /> &nbsp;Toevoegen
        </Button>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 mt-4">
        {users.data?.map((user: User) => (
          <div key={user.id} className="bg-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p>{user.role.name}</p>
            <AlertDialog>
              <AlertDialogTrigger disabled={isDeleteButtonDisabled(user.name)}>
                <Button
                  className="mt-2 bg-red-400"
                  disabled={isDeleteButtonDisabled(user.name)}
                >
                  Verwijder
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>Gebruiker verwijderen</AlertDialogTitle>
                <AlertDialogDescription>
                  Weet je zeker dat je {user.name} wilt verwijderen?
                </AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuleren</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(user.id)}>
                    Verwijderen
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>
    </div>
  );
}
