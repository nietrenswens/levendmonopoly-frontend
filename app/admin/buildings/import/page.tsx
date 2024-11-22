"use client";
import Container from "@/app/components/boilerplate/container/container";
import Loading from "@/app/components/boilerplate/loading/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BASE_URL, TransferState } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import toast from "react-hot-toast";

export default function Page() {
  const authHeader = useAuthHeader();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [uploadState, setUploadState] = useState<TransferState>("idle");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setFile(event.target.files[0]);
    } else {
      setFile(undefined);
    }
  }

  async function handleUpload() {
    if (!file) {
      toast.error("Selecteer een bestand");
      return;
    }

    setUploadState("pending");
    const data = btoa(await file.text());
    await axios
      .post(
        `${BASE_URL}/admin/building/importjson`,
        {
          data: data,
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      )
      .then(() => {
        setUploadState("idle");
        toast.success("Gebouwen succesvol geïmporteerd");
      })
      .catch((error: AxiosError) => {
        console.log(error);
        setUploadState("idle");
        toast.error(
          "Er is iets fout gegaan bij het importeren van de gebouwen"
        );
      });
  }

  return (
    <Container>
      <h1 className="text-2xl font-bold">Gebouwen inladen</h1>
      <Label htmlFor="file">Selecteer een bestand</Label>
      <Input
        id="file"
        type="file"
        onChange={handleChange}
        accept="application/json"
      />
      <Button
        variant={"default"}
        className="bg-blue-400 mt-2"
        onClick={handleUpload}
        disabled={uploadState === "pending"}
      >
        {uploadState === "pending" ? <Loading /> : "Inladen"}
      </Button>
    </Container>
  );
}
