"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Search, SortAsc, BarChart2, X } from "lucide-react";

type AnimeItem = {
  title: string;
  spotCount: number;
  topScore: number | null;
  thumbnail: string | null;
};

type SortMode = "popular" | "kana";

// ── 五十音グループ ──
const KANA_GROUPS = ["あ", "か", "さ", "た", "な", "は", "ま", "や", "ら", "わ", "英", "他"] as const;
type KanaGroup = (typeof KANA_GROUPS)[number];

function getKanaGroup(title: string): KanaGroup {
  const c = title[0];
  if (!c) return "他";
  const code = c.charCodeAt(0);

  // 半角英数
  if ((code >= 0x41 && code <= 0x5a) || (code >= 0x61 && code <= 0x7a)) return "英";
  if (code >= 0x30 && code <= 0x39) return "英";
  // 全角英数
  if ((code >= 0xff21 && code <= 0xff3a) || (code >= 0xff41 && code <= 0xff5a)) return "英";

  // カタカナ → ひらがなに変換
  let hCode = code;
  if (code >= 0x30a1 && code <= 0x30f6) hCode = code - 0x60;

  if (hCode >= 0x3041 && hCode <= 0x304a) return "あ";
  if (hCode >= 0x304b && hCode <= 0x3054) return "か";
  if (hCode >= 0x3055 && hCode <= 0x305e) return "さ";
  if (hCode >= 0x305f && hCode <= 0x3069) return "た";
  if (hCode >= 0x306a && hCode <= 0x306e) return "な";
  if (hCode >= 0x306f && hCode <= 0x307d) return "は";
  if (hCode >= 0x307e && hCode <= 0x3082) return "ま";
  if (hCode >= 0x3084 && hCode <= 0x3088) return "や";
  if (hCode >= 0x3089 && hCode <= 0x308d) return "ら";
  if (hCode >= 0x308f && hCode <= 0x3093) return "わ";

  return "他";
}

// ── 検索ハイライト ──
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-yellow-200 text-gray-900 rounded px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

// ── アニメカード ──
function AnimeCard({ anime, query }: { anime: AnimeItem; query: string }) {
  return (
    <Link
      href={`/anime/${encodeURIComponent(anime.title)}`}
      className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm active:opacity-75"
    >
      {/* サムネイル */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {anime.thumbnail ? (
          <Image
            src={anime.thumbnail}
            alt={anime.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 200px"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl">🎬</div>
        )}
        {/* 聖地数バッジ */}
        <div className="absolute bottom-2 left-2 flex items-center gap-0.5 rounded-full bg-black/60 px-2 py-0.5 backdrop-blur-sm">
          <MapPin className="size-2.5 text-white/80" />
          <span className="text-[10px] font-bold text-white">{anime.spotCount}</span>
        </div>
        {/* スコアバッジ */}
        {anime.topScore != null && (
          <div className="absolute bottom-2 right-2 rounded-full bg-[#E53935]/90 px-2 py-0.5 backdrop-blur-sm">
            <span className="text-[10px] font-bold text-white">★{anime.topScore.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* タイトル */}
      <div className="p-2.5">
        <p className="line-clamp-2 text-xs font-bold leading-snug text-gray-900">
          <Highlight text={anime.title} query={query} />
        </p>
        <p className="mt-1 text-[10px] text-gray-400">{anime.spotCount}ヶ所の聖地</p>
      </div>
    </Link>
  );
}

// ── メイン ──
export default function AnimeListClient({ animeList }: { animeList: AnimeItem[] }) {
  const [query, setQuery]     = useState("");
  const [sort, setSort]       = useState<SortMode>("popular");
  const [kanaFilter, setKanaFilter] = useState<KanaGroup | null>(null);
  const [visibleCount, setVisibleCount] = useState(40); // 初期表示件数（残りはスクロールで追加）
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const sentinelRef = useRef<HTMLDivElement>(null);

  const isSearching = query.trim().length > 0;

  // フィルタ・ソート
  const processed = useMemo(() => {
    let list = animeList;

    if (isSearching) {
      const q = query.toLowerCase();
      list = list.filter((a) => a.title.toLowerCase().includes(q));
    }

    if (sort === "popular") {
      return [...list].sort((a, b) => b.spotCount - a.spotCount);
    } else {
      return [...list].sort((a, b) => a.title.localeCompare(b.title, "ja"));
    }
  }, [animeList, query, sort, isSearching]);

  // 五十音グループ別に分類
  const grouped = useMemo(() => {
    if (sort !== "kana" || isSearching) return null;
    const map = new Map<KanaGroup, AnimeItem[]>();
    for (const g of KANA_GROUPS) map.set(g, []);
    for (const a of processed) {
      const g = getKanaGroup(a.title);
      map.get(g)!.push(a);
    }
    return map;
  }, [processed, sort, isSearching]);

  // 存在するグループのみ
  const activeGroups = grouped
    ? KANA_GROUPS.filter((g) => (grouped.get(g)?.length ?? 0) > 0)
    : [];

  function scrollToGroup(g: KanaGroup) {
    setKanaFilter(g);
    const el = sectionRefs.current[g];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // 表示リスト（単純リスト or グループフィルタ）
  const displayList = grouped
    ? (kanaFilter ? (grouped.get(kanaFilter) ?? []) : processed)
    : processed;

  // 検索・ソート変更時に表示件数をリセット
  useEffect(() => { setVisibleCount(40); }, [query, sort, kanaFilter]);

  // 無限スクロール（初期40件 → 近づいたら+40）
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setVisibleCount((c) => c + 40); },
      { rootMargin: "400px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [displayList.length]);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* ヘッダー */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="px-4 pb-2 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-900">アニメ一覧</h1>
              <p className="text-xs text-gray-400">
                {isSearching ? `${processed.length}件ヒット` : `${animeList.length.toLocaleString()}作品`}
              </p>
            </div>
            {/* ソート切り替え */}
            <div className="flex overflow-hidden rounded-full border border-gray-200 bg-gray-50 text-xs font-semibold">
              <button
                onClick={() => { setSort("popular"); setKanaFilter(null); }}
                className={`flex items-center gap-1 px-3 py-1.5 transition-colors ${sort === "popular" ? "bg-[#E53935] text-white" : "text-gray-500"}`}
              >
                <BarChart2 className="size-3" />
                人気
              </button>
              <button
                onClick={() => { setSort("kana"); setKanaFilter(null); }}
                className={`flex items-center gap-1 px-3 py-1.5 transition-colors ${sort === "kana" ? "bg-[#E53935] text-white" : "text-gray-500"}`}
              >
                <SortAsc className="size-3" />
                五十音
              </button>
            </div>
          </div>

          {/* 検索バー */}
          <div className="relative mt-3">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="アニメを検索..."
              className="h-11 w-full rounded-full border border-gray-200 bg-gray-50 pl-10 pr-10 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#E53935] focus:bg-white"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* 五十音インデックス（検索中は非表示） */}
        {sort === "kana" && !isSearching && activeGroups.length > 0 && (
          <div className="flex gap-1.5 overflow-x-auto px-4 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <button
              onClick={() => setKanaFilter(null)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${kanaFilter === null ? "bg-[#E53935] text-white" : "bg-gray-100 text-gray-500"}`}
            >
              全て
            </button>
            {activeGroups.map((g) => (
              <button
                key={g}
                onClick={() => scrollToGroup(g)}
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${kanaFilter === g ? "bg-[#E53935] text-white" : "bg-gray-100 text-gray-500"}`}
              >
                {g}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* コンテンツ */}
      <div className="p-3">
        {processed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-3 flex size-16 items-center justify-center rounded-full bg-gray-100">
              <Search className="size-7 text-gray-300" />
            </div>
            <p className="text-sm font-semibold text-gray-700">「{query}」は見つかりませんでした</p>
            <p className="mt-1 text-xs text-gray-400">別のキーワードで検索してみよう</p>
            <button
              onClick={() => setQuery("")}
              className="mt-4 rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-semibold text-gray-600"
            >
              検索をリセット
            </button>
          </div>
        ) : grouped && !isSearching ? (
          // 五十音グループ表示
          <>
            {(kanaFilter ? [kanaFilter] : activeGroups).map((g) => {
              const items = grouped.get(g) ?? [];
              if (items.length === 0) return null;
              return (
                <section
                  key={g}
                  ref={(el) => { sectionRefs.current[g] = el; }}
                  className="mb-6"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex size-7 items-center justify-center rounded-full bg-[#E53935] text-sm font-extrabold text-white">
                      {g}
                    </span>
                    <span className="text-xs text-gray-400">{items.length}作品</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    {items.map((a) => <AnimeCard key={a.title} anime={a} query="" />)}
                  </div>
                </section>
              );
            })}
          </>
        ) : (
          // 人気順 or 検索結果（初期40件＋無限スクロール）
          <>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {displayList.slice(0, visibleCount).map((a) => <AnimeCard key={a.title} anime={a} query={query} />)}
            </div>
            {visibleCount < displayList.length && (
              <div ref={sentinelRef} className="py-6 text-center text-xs text-gray-400">
                読み込み中…（{displayList.length - visibleCount}作品）
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
