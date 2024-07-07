"use client";
import useAuthCheck from "@/lib/hooks/useAuthCheck";
import NextAuth from "@auth-kit/next/NextAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { Toaster } from "react-hot-toast";
import Sidebar from "../components/boilerplate/admin-sidebar/admin-sidebar";
import Header from "../components/boilerplate/header/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useAuthUser() as { type: string } | null;
  const router = useRouter();
  const isAuth = useAuthCheck();
  const signOut = useSignOut();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    } else if (user.type !== "user") {
      router.replace("/");
    }
  }, [user, router]);

  useEffect(() => {
    if (!isAuth.isLoading && !isAuth.data) {
      signOut();
      router.replace("/");
    }
  }, [isAuth, router, signOut]);

  return (
    <NextAuth fallbackPath={"/"}>
      <Header isAdmin />
      <div>
        <Toaster />
      </div>
      <div className="flex">
        <Sidebar />
        <div className="bg-gray-50 w-full p-8">{children}</div>
      </div>
    </NextAuth>
  );
}
