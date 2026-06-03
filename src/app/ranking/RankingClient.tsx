"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Train } from "lucide-react";
import { getScoreBadgeColor } from "@/lib/home-utils";
import type { SpotCard } from "@/app/api/spots/route";

type Tab = "score" | "reenactment" | "accessibility" | "photo" | "crowding" | "reviews" | "prefecture";

// ── 都道府県集計 ──
type PrefStats = {
  city: string;
  count: number;
  avgScore: number | null;
  topSpot: SpotCard | null;
};

function buildPrefStats(spots: SpotCard[]): PrefStats[] {
  const map = new Map<string, { spots: SpotCard[]; scoreSum: number; scoreCount: number }>();
  for (const s of spots) {
    const city = s.city || "その他";
    const cur = map.get(city) ?? { spots: [], scoreSum: 0, scoreCount: 0 };
    cur.spots.push(s);
    if (s.overall_score != null) { cur.scoreSum += s.overall_score; cur.scoreCount++; }
    map.set(city, cur);
  }
  return Array.from(map.entries())
    .map(([city, { spots, scoreSum, scoreCount }]) => ({
      city,
      count: spots.length,
      avgScore: scoreCount > 0 ? Math.round((scoreSum / scoreCount) * 10) / 10 : null,
      topSpot: spots.find(s => s.overall_score != null) ?? spots[0] ?? null,
    }))
    .sort((a, b) => b.count - a.count);
}

// ── 順位バッジ ──
function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-2xl">🥇</span>;
  if (rank === 2) return <span className="text-2xl">🥈</span>;
  if (rank === 3) return <span className="text-2xl">🥉</span>;
  return (
    <div className="flex size-8 items-center justify-center">
      <span className="text-sm font-bold tabular-nums text-gray-400">{rank}</span>
    </div>
  );
}

// ── スコアバッジ ──
function ScoreBadge({ score, label, count }: { score: number | null; label?: string; count?: number }) {
  const color = score != null ? getScoreBadgeColor(score) : "#9CA3AF";
  return (
    <div className="flex flex-col items-center min-w-[2.75rem]">
      {score != null ? (
        <span className="text-base font-extrabold tabular-nums" style={{ color }}>
          {score.toFixed(1)}
        </span>
      ) : (
        <span className="text-sm text-gray-300">—</span>
      )}
      {count != null ? (
        <span className="flex items-center gap-0.5 text-[9px] text-gray-400">
          <Star className="size-2.5" />
          {count}件
        </span>
      ) : label ? (
        <span className="text-[9px] text-gray-400">{label}</span>
      ) : null}
    </div>
  );
}

// ── スポットランキング行 ──
function SpotRow({ spot, rank, scoreKey, scoreLabel }: {
  spot: SpotCard;
  rank: number;
  scoreKey: keyof Pick<SpotCard, "overall_score" | "score_reenactment" | "score_accessibility" | "score_photo" | "score_crowding">;
  scoreLabel?: string;
}) {
  const img = spot.thumbnail_fallback_url ?? spot.thumbnail_url;
  const score = spot[scoreKey] as number | null;
  return (
    <Link
      href={`/spots/${spot.id}`}
      className="flex items-center gap-3 px-4 py-3 active:bg-gray-50"
    >
      <RankBadge rank={rank} />
      <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-gray-100">
        {img && <Image src={img} alt={spot.location_name} fill className="object-cover" sizes="48px" />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[10px] font-semibold text-[#E53935]">{spot.anime_title}</p>
        <p className="truncate text-sm font-bold text-gray-900">{spot.location_name}</p>
        <div className="mt-0.5 flex items-center gap-2 text-[10px] text-gray-400">
          {spot.city && <span className="flex items-center gap-0.5"><MapPin className="size-2.5" />{spot.city}</span>}
          {spot.train_minutes != null && <span className="flex items-center gap-0.5"><Train className="size-2.5" />{spot.train_minutes}分</span>}
        </div>
      </div>
      <ScoreBadge score={score} label={scoreLabel} count={scoreKey === "overall_score" ? spot.review_count : undefined} />
    </Link>
  );
}

// ── 都道府県ランキング行 ──
function PrefRow({ pref, rank }: { pref: PrefStats; rank: number }) {
  const img = pref.topSpot?.thumbnail_fallback_url ?? pref.topSpot?.thumbnail_url;
  const color = pref.avgScore != null ? getScoreBadgeColor(pref.avgScore) : "#9CA3AF";
  return (
    <Link
      href={`/spots?city=${encodeURIComponent(pref.city)}`}
      className="flex items-center gap-3 px-4 py-3 active:bg-gray-50"
    >
      <RankBadge rank={rank} />
      <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-gray-100">
        {img && <Image src={img} alt={pref.city} fill className="object-cover" sizes="48px" />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-gray-900">{pref.city}</p>
        <p className="text-[11px] text-gray-400">{pref.count.toLocaleString()}スポット</p>
      </div>
      <div className="flex flex-col items-center">
        {pref.avgScore != null ? (
          <span className="text-base font-extrabold tabular-nums" style={{ color }}>
            {pref.avgScore.toFixed(1)}
          </span>
        ) : (
          <span className="text-sm text-gray-300">—</span>
        )}
        <span className="text-[9px] text-gray-400">平均</span>
      </div>
    </Link>
  );
}

// ── タブ定義 ──
type TabDef = {
  key: Tab;
  label: string;
  scoreKey?: keyof Pick<SpotCard, "overall_score" | "score_reenactment" | "score_accessibility" | "score_photo" | "score_crowding">;
  scoreLabel?: string;
};

const TABS: TabDef[] = [
  { key: "score",         label: "総合",    scoreKey: "overall_score",       scoreLabel: "総合" },
  { key: "reenactment",   label: "再現度",  scoreKey: "score_reenactment",   scoreLabel: "再現度" },
  { key: "accessibility", label: "アクセス", scoreKey: "score_accessibility", scoreLabel: "アクセス" },
  { key: "photo",         label: "写真映え", scoreKey: "score_photo",         scoreLabel: "写真映え" },
  { key: "crowding",      label: "混雑度",  scoreKey: "score_crowding",      scoreLabel: "混雑度" },
  { key: "reviews",       label: "レビュー多" },
  { key: "prefecture",    label: "都道府県" },
];

// ── メイン ──
export default function RankingClient({ embedded = false }: { embedded?: boolean }) {
  const [tab, setTab]       = useState<Tab>("score");
  const [spots, setSpots]   = useState<SpotCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [scoreRes, reviewRes] = await Promise.all([
          fetch("/api/spots?sort=score&offset=0"),
          fetch("/api/spots?sort=reviews&offset=0"),
        ]);
        const scoreData  = await scoreRes.json()  as { spots: SpotCard[] };
        const reviewData = await reviewRes.json() as { spots: SpotCard[] };

        const merged = new Map<string, SpotCard>();
        for (const s of [...scoreData.spots, ...reviewData.spots]) merged.set(s.id, s);
        setSpots(Array.from(merged.values()));
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // ランキング生成
  const scoreRanking        = [...spots].filter(s => s.overall_score != null).sort((a, b) => (b.overall_score ?? 0) - (a.overall_score ?? 0)).slice(0, 50);
  const reenactmentRanking  = [...spots].filter(s => s.score_reenactment != null).sort((a, b) => (b.score_reenactment ?? 0) - (a.score_reenactment ?? 0)).slice(0, 50);
  const accessRanking       = [...spots].filter(s => s.score_accessibility != null).sort((a, b) => (b.score_accessibility ?? 0) - (a.score_accessibility ?? 0)).slice(0, 50);
  const photoRanking        = [...spots].filter(s => s.score_photo != null).sort((a, b) => (b.score_photo ?? 0) - (a.score_photo ?? 0)).slice(0, 50);
  const crowdingRanking     = [...spots].filter(s => s.score_crowding != null).sort((a, b) => (b.score_crowding ?? 0) - (a.score_crowding ?? 0)).slice(0, 50);
  const reviewRanking       = [...spots].sort((a, b) => b.review_count - a.review_count).filter(s => s.review_count > 0).slice(0, 50);
  const prefStats           = buildPrefStats(spots);

  const currentTab = TABS.find(t => t.key === tab)!;

  const getRanking = () => {
    switch (tab) {
      case "score":         return { list: scoreRanking,       scoreKey: "overall_score" as const };
      case "reenactment":   return { list: reenactmentRanking, scoreKey: "score_reenactment" as const };
      case "accessibility": return { list: accessRanking,      scoreKey: "score_accessibility" as const };
      case "photo":         return { list: photoRanking,       scoreKey: "score_photo" as const };
      case "crowding":      return { list: crowdingRanking,    scoreKey: "score_crowding" as const };
      case "reviews":       return { list: reviewRanking,      scoreKey: "overall_score" as const };
      default:              return null;
    }
  };

  const ranking = getRanking();

  return (
    <div className={embedded ? "bg-gray-50" : "min-h-screen bg-gray-50 pb-24"}>
      {/* ヘッダー（単独ページ時のみ） */}
      {!embedded && (
        <div className="sticky top-0 z-10 border-b border-gray-100 bg-white px-4 py-3">
          <h1 className="text-lg font-bold text-gray-900">ランキング</h1>
          <p className="text-[11px] text-gray-400">人気の聖地スポットをチェック</p>
        </div>
      )}

      {/* スクロール可能タブ */}
      <div className={`border-b border-gray-100 bg-white ${embedded ? "" : "sticky top-[3.75rem] z-10"}`}>
        <div className="flex overflow-x-auto scrollbar-none">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`shrink-0 px-4 py-2.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                tab === key
                  ? "border-b-2 border-[#E53935] text-[#E53935]"
                  : "text-gray-400"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* コンテンツ */}
      {loading ? (
        <div className="divide-y divide-gray-100 bg-white mt-2 rounded-2xl mx-3 shadow-sm overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <div className="size-8 animate-pulse rounded-full bg-gray-200" />
              <div className="size-12 animate-pulse rounded-xl bg-gray-200" />
              <div className="flex-1 space-y-1.5">
                <div className="h-2.5 w-1/3 animate-pulse rounded bg-gray-200" />
                <div className="h-3.5 w-2/3 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-2 mx-3 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="divide-y divide-gray-100">
            {tab === "prefecture" ? (
              prefStats.map((pref, i) => <PrefRow key={pref.city} pref={pref} rank={i + 1} />)
            ) : ranking && ranking.list.length === 0 ? (
              <p className="py-12 text-center text-sm text-gray-400">まだレビューがありません</p>
            ) : ranking ? (
              ranking.list.map((spot, i) => (
                <SpotRow
                  key={spot.id}
                  spot={spot}
                  rank={i + 1}
                  scoreKey={ranking.scoreKey}
                  scoreLabel={currentTab.scoreLabel}
                />
              ))
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
