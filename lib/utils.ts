import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
