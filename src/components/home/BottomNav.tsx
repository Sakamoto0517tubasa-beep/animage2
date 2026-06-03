"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, MessageSquare, Search, Trophy, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    href: "/reviews",
    label: "ランキング",
    icon: Trophy,
    match: (path: string) => path.startsWith("/reviews") || path.startsWith("/ranking"),
  },
  {
    href: "/spots/map",
    label: "Map",
    icon: Map,
    match: (path: string) => path === "/spots/map",
  },
  {
    href: "/spots",
    label: "検索",
    icon: Search,
    match: (path: string) => path.startsWith("/spots") && !path.includes("/map"),
  },
  {
    href: "/community",
    label: "掲示板",
    icon: MessageSquare,
    match: (path: string) => path.startsWith("/community"),
  },
  {
    href: "/profile",
    label: "マイページ",
    icon: UserCircle,
    match: (path: string) => path.startsWith("/profile") || path.startsWith("/auth"),
  },
] as const;

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-lg items-stretch justify-around">
        {NAV_ITEMS.map(({ href, label, icon: Icon, match }) => {
          const active = match(pathname);
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors",
                active ? "text-[#E53935]" : "text-gray-400",
              )}
            >
              <Icon className={cn("size-5", active && "stroke-[2.5px]")} aria-hidden />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
