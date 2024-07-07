"use client";
import Container from "@/app/components/boilerplate/container/container";
import ErrorText from "@/app/components/form/errorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRoles from "@/lib/hooks/admin/useRoles";
import { BASE_URL } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import toast from "react-hot-toast";
import * as Yup from "yup";

interface AddUserValues {
  name: string;
  password: string;
  roleId: string;
}

export default function Page() {
  const authHeader = useAuthHeader();
  const router = useRouter();
  const roles = useRoles();

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
    role: Yup.string().required("Role is vereist"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      cpassword: "",
      role: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      mutation.mutate({ ...values, roleId: values.role });
    },
  });

  const mutation = useMutation({
    mutationKey: ["addUser"],
    mutationFn: (values: AddUserValues) => {
      return axios
        .post(`${BASE_URL}/user`, values, {
          headers: {
            Authorization: authHeader,
          },
        })
        .then((res) => res.data);
    },
    onSuccess: () => {
      router.replace("/admin/users");
      toast.success("Gebruiker is aangemaakt");
    },
    onError: (err: AxiosError) => {
      console.log(err.response?.data);
      if (err.response?.data && typeof err.response.data === "string") {
        toast.error(err.response.data);
      } else {
        toast.error(
          "Er is iets fout gegaan tijdens het aanmaken van de gebruiker"
        );
      }
      mutation.reset();
    },
  });

  return (
    <Container>
      <h1 className="text-2xl font-bold">Gebruiker maken</h1>
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

            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                name="role"
                onValueChange={(val) => formik.setFieldValue("role", val)}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Selecteer een rol" />
                </SelectTrigger>
                <SelectContent>
                  {roles.data?.map((role) => (
                    <SelectItem
                      value={role.id}
                      key={role.id}
                      onSelect={() => console.log(role.id)}
                    >
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.role && formik.errors.role ? (
                <ErrorText>{formik.errors.role}</ErrorText>
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
