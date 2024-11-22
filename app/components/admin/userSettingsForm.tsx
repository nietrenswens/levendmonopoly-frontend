import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUser from "@/lib/hooks/admin/useUser";
import { BASE_URL } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { HTMLAttributes } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import toast from "react-hot-toast";
import * as Yup from "yup";
import ErrorText from "../form/errorText";
import RequiredIcon from "../form/requiredIcon";

export default function UserSettingsForm(
  props: HTMLAttributes<HTMLDivElement>
) {
  const authHeader = useAuthHeader();
  const authUser = useAuthUser() as { id: string; name: string };
  const user = useUser(authUser.id);

  const mutation = useMutation({
    mutationKey: ["changeUserSettings"],
    mutationFn: (values: {
      username: string;
      oldPassword: string;
      newPassword: string;
    }) => {
      return axios
        .put(BASE_URL + `/user/${authUser.id}`, values, {
          headers: {
            Authorization: authHeader,
          },
        })
        .then((res) => res.data);
    },
    onSuccess: () => {
      toast.success("Gebruikersinstellingen opgeslagen");
      authUser.name = formik.values.username;
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 403) {
        toast.error("Oud wachtwoord is onjuist");
      } else {
        toast.error("Er is een fout opgetreden bij het opslaan");
      }
    },
  });

  const validationSchema = Yup.object({
    username: Yup.string().required("Gebruikersnaam is verplicht"),
    oldPassword: Yup.string().required("Oud wachtwoord is verplicht"),
    newPassword: Yup.string(),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), ""],
      "Wachtwoorden moeten overeenkomen"
    ),
  });

  const formik = useFormik({
    initialValues: {
      username: user.data?.name || "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <div {...props}>
      <h1 className="text-2xl font-bold">Gebruikers instellingen</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="username">
              Gebruikersnaam
              <RequiredIcon />
            </Label>
            <Input
              id="username"
              name="username"
              type="string"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            <ErrorText>{formik.errors.username}</ErrorText>
          </div>
          <div>
            <Label htmlFor="oldPassword">
              Huidig wachtwoord
              <RequiredIcon />
            </Label>
            <Input
              id="oldPassword"
              name="oldPassword"
              type="password"
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
            />
            <ErrorText>{formik.errors.oldPassword}</ErrorText>
          </div>
          <div>
            <Label htmlFor="newPassword">Nieuw wachtwoord</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
            />
            <ErrorText>{formik.errors.newPassword}</ErrorText>
          </div>
          <div>
            <Label htmlFor="confirmPassword">Bevestig wachtwoord</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
            <ErrorText>{formik.errors.confirmPassword}</ErrorText>
          </div>
          <Button type="submit">Opslaan</Button>
        </div>
      </form>
    </div>
  );
}
