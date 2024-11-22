"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BASE_URL } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import * as Yup from "yup";
import Loading from "../boilerplate/loading/loading";
import ErrorText from "../form/errorText";

export default function LoginForm() {
  const SignIn = useSignIn();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authenticateTeam = async (name: string, password: string) => {
    setLoading(true);
    await axios
      .post(BASE_URL + "/auth", {
        name: name,
        password: password,
      })
      .then((res) => {
        if (
          SignIn({
            auth: {
              token: res.data.token,
              type: "Bearer",
            },
            userState: {
              type: res.data.type,
              name: res.data.name,
              id: res.data.id,
            },
            refresh: null,
          })
        ) {
          // Redirect or perform other actions after successful sign-in
          if (res.data.type === "user") router.replace("/admin/dashboard");
          else router.replace("/player/dashboard");
        }
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 401) {
          setError("Wachtwoord en/of gebruikersnaam is onjuist");
        } else {
          setError("Er is een fout opgetreden bij het inloggen");
        }
      });
    setLoading(false);
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Naam is vereist")
      .min(3, "Naam moet uit minimaal 3 karakters bestaan")
      .max(20, "Naam mag maximaal 20 karakters bevatten"),
    password: Yup.string()
      .required("Wachtwoord is vereist")
      .min(8, "Wachtwoord moet uit minimaal 8 karakters bestaan")
      .max(40, "Wachtwoord mag maximaal 40 karakters bevatten"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      authenticateTeam(values.name, values.password);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {error ? <ErrorText>{error}</ErrorText> : null}
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
        {loading ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : (
          <Button type="submit" disabled={loading}>
            Inloggen
          </Button>
        )}
      </div>
    </form>
  );
}
