import { ReactNode } from "react";

export default function ErrorText({ children }: { children: ReactNode }) {
  return <div className="text-red-500 text-sm">{children}</div>;
}
