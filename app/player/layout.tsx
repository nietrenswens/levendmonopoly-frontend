"use client";
import useAuthCheck from "@/lib/hooks/useAuthCheck";
import useGameSettings from "@/lib/hooks/useGameSettings";
import NextAuth from "@auth-kit/next/NextAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { Toaster } from "react-hot-toast";
import Header from "../components/boilerplate/header/header";
import Sidebar from "../components/boilerplate/sidebar/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useAuthUser() as { type: string } | null;
  const router = useRouter();
  const isAuth = useAuthCheck();
  const signOut = useSignOut();
  const gameSettings = useGameSettings();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    } else if (user.type !== "team") {
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
      {gameSettings.data?.paused && (
        <div className="w-full bg-blue-400 p-6 font-bold">
          <p>Het spel is gepauzeerd</p>
        </div>
      )}
      <Header />
      <div>
        <Toaster />
      </div>
      <div className="flex w-full">
        <Sidebar />
        <div className="bg-gray-50 flex-1 p-8">{children}</div>
      </div>
    </NextAuth>
  );
}
