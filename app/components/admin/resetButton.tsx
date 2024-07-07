import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RotateCcw } from "lucide-react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import toast from "react-hot-toast";

export default function ResetButton() {
  const authHeader = useAuthHeader();

  const mutation = useMutation({
    mutationKey: ["resetGame"],
    mutationFn: () => {
      return axios
        .post(
          `${BASE_URL}/admin/resetgame`,
          {},
          {
            headers: {
              Authorization: authHeader,
            },
          }
        )
        .then((res) => res.data);
    },
    onSuccess: () => {
      toast.success("De gegevens van het spel zijn gereset!");
    },
    onError: () => {
      toast.error("Er is iets misgegaan tijdens het resetten van het spel!");
    },
  });
  function handleReset() {
    mutation.mutate();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={"default"} className="bg-red-400">
          <RotateCcw />
          &nbsp; Reset spel
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Weet je het zeker?</AlertDialogTitle>
          <AlertDialogDescription>
            Als je het spel reset, worden alle scores van de spelers herstelt
            naar hun standaard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuleren</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleReset()}>
            Reset
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
