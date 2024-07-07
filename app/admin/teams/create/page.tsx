"use client";
import Container from "@/app/components/boilerplate/container/container";
import ErrorText from "@/app/components/form/errorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BASE_URL } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import toast from "react-hot-toast";
import * as Yup from "yup";

interface AddTeamValues {
  name: string;
  password: string;
}

export default function Page() {
  const authHeader = useAuthHeader();
  const router = useRouter();
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Naam is vereist")
      .min(5, "Naam moet uit minimaal 5 karakters bestaan")
      .max(30, "Naam mag maximaal 30 karakters bevatten"),
    password: Yup.string()
      .required("Wachtwoord is vereist")
      .min(8, "Wachtwoord moet minimaal 8 karakters bevatten"),
    cpassword: Yup.string()
      .required("Bevestig wachtwoord is vereist")
      .oneOf([Yup.ref("password"), ""], "Wachtwoorden komen niet overeen"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      cpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  const mutation = useMutation({
    mutationKey: ["addTeam"],
    mutationFn: (values: AddTeamValues) => {
      return axios
        .post(`${BASE_URL}/team`, values, {
          headers: {
            Authorization: authHeader,
          },
        })
        .then((res) => res.data);
    },
    onSuccess: () => {
      router.replace("/admin/teams");
      toast.success("Team is aangemaakt");
    },
    onError: (err: AxiosError) => {
      if (err.message && err.code && err.status == 400) {
        toast.error(err.response?.data as string);
      } else
        toast.error("Er is iets fout gegaan tijdens het aanmaken van het team");
      mutation.reset();
    },
  });

  return (
    <Container>
      <h1 className="text-2xl font-bold">Team maken</h1>
      <div className="mt-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Naam</Label>
              <Input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <ErrorText>{formik.errors.name}</ErrorText>
              ) : null}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Wachtwoord</Label>
              <Input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <ErrorText>{formik.errors.password}</ErrorText>
              ) : null}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cpassword">Bevestig wachtwoord</Label>
              <Input
                id="cpassword"
                name="cpassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cpassword}
              />
              {formik.touched.cpassword && formik.errors.cpassword ? (
                <ErrorText>{formik.errors.cpassword}</ErrorText>
              ) : null}
            </div>

            {mutation.status !== "idle" ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </Button>
            ) : (
              <Button type="submit">Aanmaken</Button>
            )}
          </div>
        </form>
      </div>
    </Container>
  );
}
