import Container from "@/app/components/boilerplate/container/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import toast from "react-hot-toast";

export default function Page() {
  const authHeader = useAuthHeader();
  const [startcode, setStartcode] = useState("");

  const mutation = useMutation({
    mutationFn: () => {
      return axios
        .post(
          "/api/team/startcode",
          { code: startcode },
          {
            headers: {
              Authorization: authHeader,
            },
          }
        )
        .then((res) => res.data);
    },
    onSuccess: () => {
      toast.success("Startcode geaccepteerd! Je ontvangt 400 euro");
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 400) {
        toast.error("Startcode is ongeldig");
      } else {
        toast.error("Er is een fout opgetreden");
      }
    },
  });

  function handleStartcode() {
    mutation.mutate();
  }

  return (
    <Container>
      <Label>Startcode</Label>
      <Input
        type="text"
        placeholder="startcode"
        onChange={(e) => setStartcode(e.currentTarget.value)}
      />
      <Button onClick={handleStartcode}>Inleveren</Button>
    </Container>
  );
}
