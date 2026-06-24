"use client";

import Link from "next/link";
import { Map, Search } from "lucide-react";
import LogoWordmark from "@/components/LogoWordmark";
import NotificationBell from "@/components/home/NotificationBell";

export default function HomeBannerClient() {
  return (
    <div className="bg-[#E53935] px-4 pb-4 pt-4">
      <div className="flex items-center justify-between">
        <LogoWordmark as="span" className="text-white" />
        <div className="flex items-center gap-1">
          <NotificationBell />
          <Link
            href="/spots/map"
            className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold text-white"
          >
            <Map className="size-3.5" />
            マップ
          </Link>
        </div>
      </div>
      <button
        type="button"
        onClick={() => { window.location.href = "/spots"; }}
        className="relative mt-3 flex h-11 w-full items-center rounded-full bg-white px-4 text-left"
      >
        <Search className="mr-2.5 size-4 shrink-0 text-gray-400" />
        <span className="text-sm text-gray-400">聖地・アニメ名で検索</span>
      </button>
    </div>
  );
}
