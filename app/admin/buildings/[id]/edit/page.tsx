"use client";
import Container from "@/app/components/boilerplate/container/container";
import Loading from "@/app/components/boilerplate/loading/loading";
import ErrorText from "@/app/components/form/errorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAdminBuilding, {
  getBuildingQueryKey,
} from "@/lib/hooks/admin/useAdminBuilding";
import { BASE_URL, convertToBase64 } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FormikErrors, useFormik } from "formik";
import { useRouter } from "next/navigation";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import toast from "react-hot-toast";
import * as Yup from "yup";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const building = useAdminBuilding(params.id);
  const authHeader = useAuthHeader();
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: getBuildingQueryKey(params.id),
    mutationFn: (values: { name: string; price: number; image?: string }) => {
      const image: string = values.image || building.data?.image || "";
      return axios
        .put(
          BASE_URL + `/admin/building`,
          {
            name: values.name,
            price: values.price,
            image: image,
            id: building.data?.id,
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
      toast.success("Gebouw gewijzigd!");
      router.replace("/admin/buildings");
      queryClient.invalidateQueries({
        queryKey: getBuildingQueryKey(params.id),
      });
    },
    onError: () => {
      toast.error("Er is een fout opgetreden bij het wijzigen van het gebouw");
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

  const validationScheme = Yup.object({
    name: Yup.string()
      .required("Naam is verplicht")
      .min(5, "Naam moet minimaal 5 karakters bevatten")
      .max(50, "Naam mag maximaal 50 karakters bevatten"),
    price: Yup.number()
      .required("Prijs is verplicht")
      .min(50, "Prijs moet minimaal 50 zijn")
      .max(3000, "Prijs mag maximaal 3000 zijn"),
  });

  const formik = useFormik({
    initialValues: {
      name: building.data?.name || "",
      price: building.data?.price || 0,
      image: "",
    },
    enableReinitialize: true,
    validationSchema: validationScheme,
    onSubmit: async (values) => {
      if (values.name && values.price) {
        mutation.mutate(
          values as { name: string; price: number; image?: string }
        );
      }
    },
  });

  if (building.isLoading) {
    return (
      <div className="bg-white">
        <Loading />
      </div>
    );
  }

  if (building.error || !building.data) {
    return (
      <div className="bg-white">
        <p>Dit gebouw bestaat niet...</p>
      </div>
    );
  }

  return (
    <Container>
      <h1 className="text-2xl font-bold">Gebouw bewerken</h1>
      <p>{building.data.name}</p>
      <form className="mt-2" onSubmit={formik.handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Naam</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder={building.data.name}
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
              placeholder={building.data?.price.toString()}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
            {formik.touched.price && formik.errors.price ? (
              <ErrorText>{formik.errors.price}</ErrorText>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Foto</Label>
            <Input
              id="image"
              name="image"
              type="file"
              onChange={(e) => handleImage(e, formik.setFieldValue)}
            />
            {formik.touched.image && formik.errors.image ? (
              <ErrorText>{formik.errors.image}</ErrorText>
            ) : null}
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <Button type="submit" className="bg-orange-400">
            {mutation.isPending ? <Loading /> : "Wijzigen"}
          </Button>
          <Button
            disabled={mutation.isPending}
            onClick={() => router.back()}
            type="button"
            variant={"outline"}
          >
            Ga terug
          </Button>
        </div>
      </form>
    </Container>
  );
}
