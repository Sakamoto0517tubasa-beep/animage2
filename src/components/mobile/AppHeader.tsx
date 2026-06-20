"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import LogoWordmark from "@/components/LogoWordmark";

type HeaderConfig = {
  title: string;
  backHref?: string;
};

function getHeaderConfig(pathname: string): HeaderConfig | null {
  if (pathname === "/" || pathname === "/spots") return null;

  if (pathname === "/spots/map") {
    return { title: "Map", backHref: "/spots" };
  }

  const reviewMatch = pathname.match(/^\/spots\/([^/]+)\/review\/new$/);
  if (reviewMatch) {
    return { title: "レビューを書く", backHref: `/spots/${reviewMatch[1]}` };
  }

  const spotMatch = pathname.match(/^\/spots\/([^/]+)$/);
  if (spotMatch && spotMatch[1] !== "map") {
    return { title: "スポット詳細", backHref: "/spots" };
  }

  if (pathname === "/auth/login") {
    return { title: "ログイン", backHref: "/" };
  }

  if (pathname === "/auth/register") {
    return { title: "新規登録", backHref: "/" };
  }

  if (pathname === "/profile") {
    return { title: "マイページ", backHref: "/" };
  }

  if (pathname === "/notifications") {
    return { title: "通知", backHref: "/" };
  }

  if (pathname === "/compare") {
    return { title: "スポット比較", backHref: "/" };
  }

  if (pathname === "/ranking") {
    return { title: "ランキング", backHref: "/" };
  }

  return { title: "Anigri", backHref: "/" };
}

export default function AppHeader() {
  const pathname = usePathname();
  const config = getHeaderConfig(pathname);

  if (!config) return null;

  return (
    <header className="sticky top-0 z-40 bg-[#E53935] px-4 py-3.5">
      <div className="relative mx-auto flex max-w-lg items-center justify-center">
        {config.backHref && (
          <Link
            href={config.backHref}
            className="absolute left-0 flex size-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15"
            aria-label="Go back"
          >
            <ChevronLeft className="size-5" />
          </Link>
        )}

        {config.title === "Anigri" || pathname.startsWith("/auth") ? (
          <LogoWordmark href="/" className="text-white" />
        ) : (
          <h1 className="text-base font-semibold text-white">{config.title}</h1>
        )}
      </div>
    </header>
  );
}
