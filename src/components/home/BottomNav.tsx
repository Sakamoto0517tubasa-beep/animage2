"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, MessageSquare, Search, Trophy, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/components/i18n/LanguageProvider";

const NAV_ITEMS = [
  {
    href: "/reviews",
    labelKey: "nav.ranking",
    icon: Trophy,
    match: (path: string) => path.startsWith("/reviews") || path.startsWith("/ranking"),
  },
  {
    href: "/spots/map",
    labelKey: "nav.map",
    icon: Map,
    match: (path: string) => path === "/spots/map",
  },
  {
    href: "/spots",
    labelKey: "nav.search",
    icon: Search,
    match: (path: string) => path.startsWith("/spots") && !path.includes("/map"),
  },
  {
    href: "/community",
    labelKey: "nav.community",
    icon: MessageSquare,
    match: (path: string) => path.startsWith("/community"),
  },
  {
    href: "/profile",
    labelKey: "nav.profile",
    icon: UserCircle,
    match: (path: string) => path.startsWith("/profile") || path.startsWith("/auth"),
  },
] as const;

export default function BottomNav() {
  const pathname = usePathname();
  const t = useT();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-lg items-stretch justify-around">
        {NAV_ITEMS.map(({ href, labelKey, icon: Icon, match }) => {
          const active = match(pathname);
          return (
            <Link
              key={labelKey}
              href={href}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors",
                active ? "text-[#E53935]" : "text-gray-400",
              )}
            >
              <Icon className={cn("size-5", active && "stroke-[2.5px]")} aria-hidden />
              <span>{t(labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
