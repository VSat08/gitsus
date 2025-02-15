"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./app-sidebar";
import MobileNav from "./MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

function SidebarLayout({ children }: Props) {
  const isMobile = useIsMobile();
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="relative m-0 w-full md:m-2">
        <Header />
        {/* <div className="h-4"></div> */}
        {/* main content */}
        <div
          className={`${
            isMobile ? "h-[calc(100vh-9rem)]" : "h-[calc(100vh-5rem)]"
          } overflow-y-auto p-4 shadow`}

          // className="h-[calc(100vh-6rem)] overflow-y-auto rounded-md border border-sidebar-border bg-sidebar p-4 shadow"
        >
          {children}
        </div>
        {/* mobile nav */}
        <MobileNav />
      </main>
    </SidebarProvider>
  );
}

export default SidebarLayout;
