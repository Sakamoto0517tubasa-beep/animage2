"use client";

import { usePathname } from "next/navigation";
import AppHeader from "@/components/mobile/AppHeader";
import BottomNav from "@/components/home/BottomNav";

export default function NavShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAuth = pathname.startsWith("/auth");

  return (
    <>
      {!isHome && <AppHeader />}
      {children}
      {!isAuth && <BottomNav />}
    </>
  );
}
