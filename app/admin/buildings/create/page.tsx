"use client";
import ErrorText from "@/app/components/form/errorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildingsQueryKey } from "@/lib/hooks/admin/useAdminBuildings";
import { BASE_URL, convertToBase64 } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FormikErrors, useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import * as Yup from "yup";

export default function Page() {
  const authHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const router = useRouter();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Naam is verplicht")
      .min(3, "Minimaal 3 karakters")
      .max(30, "Maximaal 30 karakters"),
    price: Yup.number().required("Prijs is verplicht"),
    image: Yup.string().required("Foto is verplicht"),
  });

  const mutation = useMutation({
    mutationFn: async (values: {
      name: string;
      price: number;
      image: string;
    }) => {
      await axios.post(`${BASE_URL}/admin/building`, values, {
        headers: {
          Authorization: authHeader,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: buildingsQueryKey,
      });
      router.push("/admin/buildings");
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      image: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: unknown,
      shouldValidate?: boolean
    ) =>
      | Promise<void>
      | Promise<FormikErrors<{ name: string; price: number; image: string }>>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.size / 1024 / 1024 < 2) {
      const base64 = await convertToBase64(file);
      setFieldValue("image", base64);
    }
  };

  const handleSubmit = async (values: {
    name: string;
    price: number;
    image: string;
  }) => {
    await mutation.mutate(values);
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white p-4 w-full lg:w-[800px]">
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
              <Label htmlFor="price">Prijs</Label>
              <Input
                id="price"
                name="price"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
              {formik.touched.price && formik.errors.price ? (
                <ErrorText>{formik.errors.price}</ErrorText>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Foto</Label>
              <Input
                id="image"
                name="image"
                onChange={(e) => handleImage(e, formik.setFieldValue)}
                type="file"
                onBlur={formik.handleBlur}
              />
              {formik.touched.image && formik.errors.image ? (
                <ErrorText>{formik.errors.image}</ErrorText>
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
    </div>
  );
}
