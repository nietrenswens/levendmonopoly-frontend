import { clsx, type ClassValue } from "clsx";
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const handleDownload = async (
  endpoint: string,
  authHeader: string,
  contentType: ContentType,
  fileName: string,
  setState: Dispatch<SetStateAction<TransferState>>
) => {
  setState("pending");
  await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: authHeader!,
      "Content-Type": contentType,
    },
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      setState("idle");
    });
};

export type TransferState = "idle" | "pending";

type ContentType = "application/json" | "application/pdf";
