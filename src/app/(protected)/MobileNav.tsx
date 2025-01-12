"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  Bot,
  Brush,
  CreditCard,
  LayoutDashboard,
  Paintbrush,
  Presentation,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MobileNav = () => {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Q&A",
      url: "/qa",
      icon: Bot,
    },
    {
      title: "Meetings",
      url: "/meetings",
      icon: Presentation,
    },
    {
      title: "Billing",
      url: "/billing",
      icon: CreditCard,
    },
  ];
  return (
    isMobile && (
      //   w-[calc(100vw)]
      <div className="fixed bottom-1 left-1/2 mx-auto flex w-full max-w-[calc(100vw-4rem)] -translate-x-1/2 transform items-center justify-center gap-3 rounded-full bg-primary px-16 py-2">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            className={cn(
              {
                "!bg-primary-foreground !text-primary": pathname === item.url,
              },
              "inline-flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-primary-foreground",
            )}
          >
            <item.icon className="size-5" />
            <span className="whitespace-nowrap text-xs font-light">
              {item.title}
            </span>
          </Link>
        ))}
        {/* <div className="flex items-center flex-col">
          <LayoutDashboard className="size-6" />
          <p className="text-xs">Dashboard</p>
        </div>
        <div className="flex items-center flex-col">
          <Paintbrush className="size-6" />
          <p className="text-xs">Create</p>
        </div>
        <div className="flex items-center flex-col">
          <Brush className="size-6" />
          <p className="text-xs">Designes</p>
        </div> */}
      </div>
    )
  );
};

export default MobileNav;
