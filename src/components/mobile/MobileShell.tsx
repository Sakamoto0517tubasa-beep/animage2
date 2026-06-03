"use client";

import { usePathname } from "next/navigation";
import AppHeader from "@/components/mobile/AppHeader";
import BottomNav from "@/components/home/BottomNav";
import { cn } from "@/lib/utils";

export default function MobileShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAuth = pathname.startsWith("/auth");
  const showBottomNav = !isAuth;

  return (
    <div
      className={cn(
        "mx-auto min-h-screen max-w-lg bg-white text-gray-900",
        showBottomNav && "pb-[calc(4.5rem+env(safe-area-inset-bottom))]",
      )}
    >
      {!isHome && <AppHeader />}
      {children}
      {showBottomNav && <BottomNav />}
    </div>
  );
}
