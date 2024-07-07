"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import LoginForm from "./components/login/loginForm";

export default function Page() {
  const authUser = useAuthUser() as { type: string };
  const router = useRouter();

  if (authUser && authUser.type === "user") router.replace("/admin/dashboard");
  else if (authUser && authUser.type === "team")
    router.replace("/player/dashboard");

  return (
    <div className="w-full lg:grid lg:grid-cols-2 h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Inloggen</h1>
            <p className="text-balance text-muted-foreground">
              Vul jouw gegevens in om in te loggen
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/bg.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
