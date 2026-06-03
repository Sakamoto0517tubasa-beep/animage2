"use client";

import Link from "next/link";
import { Map, Search } from "lucide-react";
import LogoWordmark from "@/components/LogoWordmark";
import NotificationBell from "@/components/home/NotificationBell";
import { CITIES, type CityFilter } from "@/lib/home-utils";

type HomeHeaderProps = {
  query: string;
  city: CityFilter;
  onQueryChange: (value: string) => void;
  onCityChange: (city: CityFilter) => void;
};

export default function HomeHeader({
  query,
  city,
  onQueryChange,
  onCityChange,
}: HomeHeaderProps) {
  return (
    <header className="bg-[#E53935] px-4 pb-3 pt-4">
      <div className="flex items-center justify-between">
        <LogoWordmark as="h1" className="text-white" />
        <div className="flex items-center gap-1">
          <NotificationBell />
          <Link
            href="/spots/map"
            className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/30"
          >
            <Map className="size-3.5" />
            マップ
          </Link>
        </div>
      </div>

      {/* 検索バー */}
      <div className="relative mx-auto mt-3 max-w-lg">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="聖地・アニメ名で検索"
          className="h-11 w-full rounded-full bg-white pr-4 pl-10 text-sm text-gray-900 placeholder:text-gray-400 outline-none"
        />
      </div>

      {/* 都道府県ピル（横スクロール） */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {CITIES.map((c) => (
          <button
            key={c}
            onClick={() => onCityChange(c)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              city === c
                ? "bg-white text-[#E53935]"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </header>
  );
}
