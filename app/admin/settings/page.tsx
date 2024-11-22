"use client";
import ResetButton from "@/app/components/admin/resetButton";
import UserSettingsForm from "@/app/components/admin/userSettingsForm";
import Container from "@/app/components/boilerplate/container/container";
import ErrorText from "@/app/components/form/errorText";
import RequiredIcon from "@/app/components/form/requiredIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGameSettings, {
  gameSettingsQueryKey,
} from "@/lib/hooks/useGameSettings";
import { BASE_URL } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import toast from "react-hot-toast";

export default function Page() {
  const authHeader = useAuthHeader();
  const gameSettings = useGameSettings();

  const mutation = useMutation({
    mutationKey: gameSettingsQueryKey,
    mutationFn: (values: { taxRate: number }) => {
      return axios
        .put(
          BASE_URL + `/gamesettings`,
          {
            id: 1,
            taxRate: values.taxRate,
          },
          {
            headers: {
              Authorization: authHeader,
            },
          }
        )
        .then((res) => res.data);
    },
    onSuccess: () => {
      toast.success("Instellingen opgeslagen!");
    },
    onError: () => {
      toast.error("Er is iets misgegaan!");
    },
  });

  const formik = useFormik({
    initialValues: {
      taxRate: gameSettings.data?.taxRate || 0,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <Container>
      <div className="md:w-2/3 w-full md:m-auto">
        <h1 className="text-2xl font-bold">Settings</h1>
        <form onSubmit={formik.handleSubmit} className="mt-4">
          <div className="grid gap-4 mb-2">
            <div className="grid gap-2">
              <Label htmlFor="taxRate">
                Belastingspercentage
                <RequiredIcon />
              </Label>
              <Input
                id="taxRate"
                name="taxRate"
                value={formik.values.taxRate}
                onChange={formik.handleChange}
                type="number"
              />
              {formik.touched.taxRate && formik.errors.taxRate ? (
                <ErrorText>{formik.errors.taxRate}</ErrorText>
              ) : null}
            </div>
          </div>
          <Button type="submit" className="bg-green-400">
            Opslaan
          </Button>
        </form>
        <UserSettingsForm className="my-8 mb-2" />
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Bigboy acties</h2>
          <ResetButton />
        </div>
      </div>
    </Container>
  );
}
