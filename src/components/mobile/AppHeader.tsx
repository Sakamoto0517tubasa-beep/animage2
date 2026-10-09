"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import LogoWordmark from "@/components/LogoWordmark";
import { useT } from "@/components/i18n/LanguageProvider";

type HeaderConfig = {
  titleKey?: string; // 未指定ならロゴ表示
  backHref?: string;
};

function getHeaderConfig(pathname: string): HeaderConfig | null {
  if (pathname === "/" || pathname === "/spots") return null;

  if (pathname === "/spots/map") {
    return { titleKey: "nav.map", backHref: "/spots" };
  }

  const reviewMatch = pathname.match(/^\/spots\/([^/]+)\/review\/new$/);
  if (reviewMatch) {
    return { titleKey: "header.writeReview", backHref: `/spots/${reviewMatch[1]}` };
  }

  const spotMatch = pathname.match(/^\/spots\/([^/]+)$/);
  if (spotMatch && spotMatch[1] !== "map") {
    return { titleKey: "header.spotDetail", backHref: "/spots" };
  }

  if (pathname === "/auth/login") {
    return { titleKey: "header.login", backHref: "/" };
  }

  if (pathname === "/auth/register") {
    return { titleKey: "header.register", backHref: "/" };
  }

  if (pathname === "/profile") {
    return { titleKey: "nav.profile", backHref: "/" };
  }

  if (pathname === "/notifications") {
    return { titleKey: "header.notifications", backHref: "/" };
  }

  if (pathname === "/compare") {
    return { titleKey: "header.compare", backHref: "/" };
  }

  if (pathname === "/ranking") {
    return { titleKey: "nav.ranking", backHref: "/" };
  }

  return { backHref: "/" }; // ロゴ
}

export default function AppHeader() {
  const pathname = usePathname();
  const t = useT();
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

        {!config.titleKey || pathname.startsWith("/auth") ? (
          <LogoWordmark href="/" className="text-white" />
        ) : (
          <h1 className="text-base font-semibold text-white">{t(config.titleKey)}</h1>
        )}
      </div>
    </header>
  );
}
