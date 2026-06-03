"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, Sparkles } from "lucide-react";
import HomeHeader from "@/components/home/HomeHeader";
import HomeSpotCard from "@/components/home/HomeSpotCard";
import { type CityFilter } from "@/lib/home-utils";

const RecommendClient = dynamic(() => import("@/components/home/RecommendClient"), {
  loading: () => <div className="flex items-center justify-center py-20 text-sm text-gray-400">読み込み中…</div>,
  ssr: false,
});
import { cn } from "@/lib/utils";
import type { SpotCard } from "@/app/api/spots/route";

type SortKey = "score" | "reviews" | "name";
type PageMode = "search" | "recommend";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "score",   label: "スコア順" },
  { key: "reviews", label: "レビュー多い順" },
  { key: "name",    label: "名前順" },
];

export default function HomePageClient() {
  const [mode, setMode]       = useState<PageMode>("search");
  const [spots, setSpots]     = useState<SpotCard[]>([]);
  const [total, setTotal]     = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [query, setQuery]     = useState("");
  const [city, setCity]       = useState<CityFilter>("すべて");
  const [sort, setSort]       = useState<SortKey>("score");

  const offsetRef    = useRef(0);
  const sentinelRef  = useRef<HTMLDivElement>(null);
  const abortRef     = useRef<AbortController | null>(null);

  // ── フェッチ ──
  const fetchSpots = useCallback(async (reset: boolean) => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    if (reset) setLoading(true);

    const offset = reset ? 0 : offsetRef.current;
    const params = new URLSearchParams({
      q: query, city, sort, offset: String(offset),
    });

    try {
      const res = await fetch(`/api/spots?${params}`, { signal: ac.signal });
      if (!res.ok) return;
      const data = await res.json() as { spots: SpotCard[]; total: number; hasMore: boolean };

      if (reset) {
        setSpots(data.spots);
        offsetRef.current = data.spots.length;
      } else {
        setSpots((prev) => [...prev, ...data.spots]);
        offsetRef.current += data.spots.length;
      }
      setTotal(data.total);
      setHasMore(data.hasMore);
    } catch {
      // aborted or network error — ignore
    } finally {
      setLoading(false);
    }
  }, [query, city, sort]);

  // フィルタ・ソート変更時にリセット
  useEffect(() => {
    if (mode === "search") fetchSpots(true);
  }, [fetchSpots, mode]);

  // 無限スクロール
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting && !loading) fetchSpots(false); },
      { rootMargin: "300px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [fetchSpots, loading]);

  return (
    <>
      {/* ヘッダー（検索モードのみ） */}
      {mode === "search" && (
        <HomeHeader
          query={query}
          city={city}
          onQueryChange={setQuery}
          onCityChange={setCity}
        />
      )}

      {/* AI推薦モードのヘッダー */}
      {mode === "recommend" && (
        <header className="bg-[#E53935] px-4 pb-3 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-white/70">AnimAge</p>
              <h1 className="text-lg font-black text-white">AI聖地レコメンド</h1>
            </div>
          </div>
        </header>
      )}

      {/* モード切り替えタブ */}
      <div className="flex border-b border-gray-100 bg-white sticky top-0 z-10">
        <button
          onClick={() => setMode("search")}
          className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition-colors ${
            mode === "search"
              ? "border-b-2 border-[#E53935] text-[#E53935]"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <MapPin className="size-3.5" />
          スポット検索
        </button>
        <button
          onClick={() => setMode("recommend")}
          className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition-colors ${
            mode === "recommend"
              ? "border-b-2 border-violet-500 text-violet-600"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <Sparkles className="size-3.5" />
          AI推薦
        </button>
      </div>

      {/* AI推薦モード */}
      {mode === "recommend" && <RecommendClient />}

      {/* 検索モード */}
      {mode === "search" && (
        <>
          {/* ソート＋件数バー */}
          <div className="flex items-center justify-between gap-2 border-b border-gray-100 bg-white px-4 py-2">
            <p className="shrink-0 text-xs text-gray-400">
              {loading && spots.length === 0 ? "…" : total.toLocaleString() + "件"}
            </p>
            <div className="flex gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {SORTS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setSort(key)}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold transition-colors",
                    sort === key
                      ? "bg-[#E53935] text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* カードグリッド */}
          <section className="bg-gray-50 px-3 pt-3 pb-24" aria-label="アニメ聖地スポット">
            {loading && spots.length === 0 && (
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="aspect-[4/3] animate-pulse bg-gray-200" />
                    <div className="p-2.5 space-y-1.5">
                      <div className="h-2.5 w-3/4 animate-pulse rounded bg-gray-200" />
                      <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && spots.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-3 flex size-14 items-center justify-center rounded-full bg-gray-100">
                  <MapPin className="size-6 text-gray-300" />
                </div>
                <p className="text-sm font-medium text-gray-500">該当するスポットが見つかりません</p>
                <p className="mt-1 text-xs text-gray-400">検索ワードや都道府県を変えてみてください</p>
              </div>
            )}

            {spots.length > 0 && (
              <>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {spots.map((spot) => (
                    <HomeSpotCard key={spot.id} spot={spot as never} />
                  ))}
                </div>

                {hasMore && (
                  <div ref={sentinelRef} className="py-6 text-center text-sm text-gray-400">
                    {loading ? "読み込み中…" : ""}
                  </div>
                )}
                {!hasMore && spots.length > 0 && (
                  <p className="py-6 text-center text-xs text-gray-400">
                    全 {total.toLocaleString()} 件を表示しました
                  </p>
                )}
              </>
            )}
          </section>
        </>
      )}
    </>
  );
}
