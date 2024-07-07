"use client";
import Container from "@/app/components/boilerplate/container/container";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const prompt = searchParams.get("prompt");
  const result = searchParams.get("result");
  if (!prompt || !result || isNaN(Number(result))) {
    return (
      <Container>
        <h1 className="text-2xl font-bold mb-4">Kanskaart</h1>
        <p>Er is iets misgegaan</p>
      </Container>
    );
  }

  return (
    <div className="h-full">
      <h1 className="font-bold text-2xl">Kanskaart</h1>
      <div className="flex justify-center items-center mt-20">
        <div
          className={
            "p-16 " + (Number(result) > 0 ? "bg-green-400" : "bg-red-400")
          }
        >
          <p className="text-white font-bold text-xl">{prompt}</p>
        </div>
      </div>
    </div>
  );
}
