"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Building2, Home, Menu, Settings, Users } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Home" },
    { icon: Building2, label: "Buildings" },
    { icon: Users, label: "People" },
    { icon: Settings, label: "Settings" },
  ];

  const SidebarContent = (
    <div className="h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Menu
          </h2>
          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
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
