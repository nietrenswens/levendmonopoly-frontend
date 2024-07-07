"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Building2,
  ClipboardX,
  Dices,
  DoorOpen,
  Home,
  List,
  Menu,
  PersonStandingIcon,
  Settings,
  User,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import useSignOut from "react-auth-kit/hooks/useSignOut";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const signOut = useSignOut();
  const router = useRouter();
  const pathName = usePathname();

  const handleSignOut = () => {
    signOut();
    router.replace("/");
  };

  const isActive = (routeName: string) => {
    return pathName.includes(routeName);
  };

  const SidebarContent = (
    <div className="h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Menu
          </h2>
          <div className="space-y-1">
            <Button
              variant="ghost"
              className={
                "w-full justify-start" +
                (isActive("dashboard") ? " text-orange-400" : "")
              }
              onClick={() => router.push("/admin/dashboard")}
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button
              variant="ghost"
              className={
                "w-full justify-start" +
                (isActive("buildings") ? " text-orange-400" : "")
              }
              onClick={() => router.push("/admin/buildings")}
            >
              <Building2 className="mr-2 h-4 w-4" />
              Gebouwen
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push("/admin/scoreboard")}
              className={
                "w-full justify-start" +
                (isActive("scoreboard") ? " text-orange-400" : "")
              }
            >
              <List className="mr-2 h-4 w-4" />
              Score
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push("/admin/chance")}
              className={
                "w-full justify-start" +
                (isActive("chance") ? " text-orange-400" : "")
              }
            >
              <Dices className="mr-2 h-4 w-4" />
              Kans
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push("/admin/tax")}
              className={
                "w-full justify-start" +
                (isActive("tax") ? " text-orange-400" : "")
              }
            >
              <ClipboardX className="mr-2 h-4 w-4" />
              Belasting
            </Button>
            <Button
              variant="ghost"
              className={
                "w-full justify-start" +
                (isActive("teams") ? " text-orange-400" : "")
              }
              onClick={() => router.push("/admin/teams")}
            >
              <PersonStandingIcon className="mr-2 h-4 w-4" />
              Teams
            </Button>
            <Button
              variant="ghost"
              className={
                "w-full justify-start" +
                (isActive("users") ? " text-orange-400" : "")
              }
              onClick={() => router.push("/admin/users")}
            >
              <User className="mr-2 h-4 w-4" />
              Gebruikers
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push("/admin/settings")}
              className={
                "w-full justify-start" +
                (isActive("settings") ? " text-orange-400" : "")
              }
            >
              <Settings className="mr-2 h-4 w-4" />
              Instellingen
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleSignOut}
            >
              <DoorOpen className="mr-2 h-4 w-4" />
              Uitloggen
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <ScrollArea className="h-full">{SidebarContent}</ScrollArea>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-[240px] flex-col md:flex">
        <ScrollArea className="flex-1">{SidebarContent}</ScrollArea>
      </aside>
    </>
  );
}
