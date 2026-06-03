"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Map, MapPin, Search, Star, Train, TrendingUp } from "lucide-react";
import LogoWordmark from "@/components/LogoWordmark";
import NotificationBell from "@/components/home/NotificationBell";
import HomeSpotCard from "@/components/home/HomeSpotCard";
import type { SpotCard } from "@/app/api/spots/route";
import type { AnimeEntry } from "@/lib/anime";

// ── セクションヘッダー ──
function SectionHeader({
  title,
  icon,
  href,
}: {
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <div className="mb-2.5 flex items-center justify-between px-4">
      <h2 className="flex items-center gap-1.5 text-sm font-bold text-gray-900">
        {icon}
        {title}
      </h2>
      <Link href={href} className="flex items-center gap-0.5 text-[11px] font-semibold text-[#E53935]">
        もっと見る <ChevronRight className="size-3" />
      </Link>
    </div>
  );
}

// ── 横スクロールスポットカルーセル ──
function SpotCarousel({ spots, loading }: { spots: SpotCard[]; loading: boolean }) {
  return (
    <div className="flex gap-2.5 overflow-x-auto px-4 pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {loading
        ? Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-36 shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="aspect-[4/3] animate-pulse bg-gray-200" />
              <div className="space-y-1.5 p-2.5">
                <div className="h-2 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ))
        : spots.map((spot) => (
            <div key={spot.id} className="w-36 shrink-0">
              <HomeSpotCard spot={spot as never} />
            </div>
          ))}
    </div>
  );
}

// ── アニメカルーセル ──
function AnimeCarousel({ animeList }: { animeList: AnimeEntry[] }) {
  const top = animeList.slice(0, 12);
  return (
    <div className="flex gap-2.5 overflow-x-auto px-4 pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {top.map((anime) => (
        <Link
          key={anime.title}
          href={`/anime/${encodeURIComponent(anime.title)}`}
          className="group relative flex w-28 shrink-0 flex-col overflow-hidden rounded-2xl shadow-sm"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-200">
            {anime.thumbnail ? (
              <Image
                src={anime.thumbnail}
                alt={anime.title}
                fill
                className="object-cover transition-transform group-active:scale-105"
                sizes="112px"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <Star className="size-6 text-gray-300" />
              </div>
            )}
            {/* グラデーションオーバーレイ */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            {/* タイトル */}
            <div className="absolute bottom-0 left-0 right-0 p-2">
              <p className="line-clamp-2 text-[10px] font-bold leading-tight text-white">{anime.title}</p>
              <p className="mt-0.5 text-[9px] text-white/70">{anime.spotCount}スポット</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

// ── バナー（コンパクト） ──
function HomeBanner({ onSearchFocus }: { onSearchFocus: () => void }) {
  return (
    <div className="bg-[#E53935] px-4 pb-4 pt-4">
      {/* ロゴ行 */}
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
      {/* 検索バー（タップで /spots へ） */}
      <button
        type="button"
        onClick={onSearchFocus}
        className="relative mt-3 flex h-11 w-full items-center rounded-full bg-white px-4 text-left"
      >
        <Search className="mr-2.5 size-4 shrink-0 text-gray-400" />
        <span className="text-sm text-gray-400">聖地・アニメ名で検索</span>
      </button>
    </div>
  );
}

// ── メイン ──
export default function HomeDiscover({ animeList, spotCount = 0 }: { animeList: AnimeEntry[]; spotCount?: number }) {
  const [topSpots, setTopSpots] = useState<SpotCard[]>([]);
  const [hotSpots, setHotSpots] = useState<SpotCard[]>([]);
  const [loadingTop, setLoadingTop] = useState(true);
  const [loadingHot, setLoadingHot] = useState(true);
  useEffect(() => {
    // 人気スポット（スコア順）
    fetch("/api/spots?sort=score&limit=12")
      .then((r) => r.json())
      .then((d) => setTopSpots(d.spots ?? []))
      .catch(() => {})
      .finally(() => setLoadingTop(false));

    // 注目スポット（レビュー数順）
    fetch("/api/spots?sort=reviews&limit=12")
      .then((r) => r.json())
      .then((d) => setHotSpots(d.spots ?? []))
      .catch(() => {})
      .finally(() => setLoadingHot(false));
  }, []);

  function handleSearchFocus() {
    window.location.href = "/spots";
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* ヘッダー */}
      <HomeBanner onSearchFocus={handleSearchFocus} />

      {/* 人気スポット */}
      <section className="mt-5">
        <SectionHeader
          title="人気スポット"
          icon={<TrendingUp className="size-4 text-[#E53935]" />}
          href="/spots?sort=score"
        />
        <SpotCarousel spots={topSpots} loading={loadingTop} />
      </section>

      {/* レビュー注目スポット */}
      <section className="mt-6">
        <SectionHeader
          title="注目スポット"
          icon={<Star className="size-4 text-amber-500" />}
          href="/spots?sort=reviews"
        />
        <SpotCarousel spots={hotSpots} loading={loadingHot} />
      </section>

      {/* アニメから探す */}
      {animeList.length > 0 && (
        <section className="mt-6">
          <SectionHeader
            title="アニメから探す"
            icon={<MapPin className="size-4 text-purple-500" />}
            href="/anime"
          />
          <AnimeCarousel animeList={animeList} />
        </section>
      )}

      {/* 全スポット CTA */}
      <div className="mx-4 mt-8">
        <Link
          href="/spots"
          className="flex items-center justify-center gap-2 rounded-2xl bg-[#E53935] py-4 text-sm font-bold text-white shadow-sm shadow-red-200"
        >
          <Search className="size-4" />
          すべての聖地を探す
        </Link>
      </div>

      {/* 統計 */}
      <div className="mx-4 mt-3 grid grid-cols-3 gap-2">
        {[
          { icon: <MapPin className="size-4 text-[#E53935]" />, label: "聖地スポット", value: spotCount > 0 ? `${spotCount.toLocaleString()}` : "1000+" },
          { icon: <Star className="size-4 text-amber-500" />, label: "アニメ作品", value: animeList.length > 0 ? `${animeList.length}` : "100+" },
          { icon: <Train className="size-4 text-blue-500" />, label: "都道府県", value: "47" },
        ].map(({ icon, label, value }) => (
          <div key={label} className="rounded-2xl bg-white py-3 text-center shadow-sm border border-gray-100">
            <div className="flex justify-center">{icon}</div>
            <p className="mt-1 text-lg font-extrabold text-gray-900">{value}</p>
            <p className="text-[9px] text-gray-400">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
