"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, MapPin, Train, ArrowLeftRight } from "lucide-react";
import { getScoreBadgeColor } from "@/lib/home-utils";
import type { SpotCard } from "@/app/api/spots/route";

type SelectedSpot = SpotCard | null;

const SCORE_KEYS: { key: keyof Pick<SpotCard, "score_reenactment" | "score_accessibility" | "score_photo" | "overall_score">; label: string }[] = [
  { key: "overall_score",       label: "総合" },
  { key: "score_reenactment",   label: "再現度" },
  { key: "score_accessibility", label: "アクセス" },
  { key: "score_photo",         label: "写真映え" },
];

// ── スポット選択ピッカー ──
function SpotPicker({
  spots,
  selected,
  onSelect,
  placeholder,
}: {
  spots: SpotCard[];
  selected: SelectedSpot;
  onSelect: (spot: SpotCard | null) => void;
  placeholder: string;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return spots.slice(0, 30);
    return spots
      .filter(
        (s) =>
          s.location_name.toLowerCase().includes(q) ||
          s.anime_title.toLowerCase().includes(q),
      )
      .slice(0, 30);
  }, [spots, query]);

  if (selected) {
    const image = selected.thumbnail_fallback_url ?? selected.thumbnail_url;
    return (
      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {image && (
          <Image src={image} alt={selected.location_name} width={400} height={112} className="h-28 w-full object-cover" />
        )}
        <div className="p-3">
          <p className="text-[10px] font-semibold text-[#E53935]">{selected.anime_title}</p>
          <p className="mt-0.5 text-sm font-bold leading-snug text-gray-900">{selected.location_name}</p>
          <div className="mt-1 flex items-center gap-2 text-[10px] text-gray-400">
            {selected.city && <span className="flex items-center gap-0.5"><MapPin className="size-2.5" />{selected.city}</span>}
            {selected.train_minutes != null && <span className="flex items-center gap-0.5"><Train className="size-2.5" />{selected.train_minutes}分</span>}
          </div>
        </div>
        <button
          onClick={() => onSelect(null)}
          className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
        >
          <X className="size-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="flex h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 text-gray-400 hover:border-[#E53935]/40 hover:bg-red-50/30"
        onClick={() => setOpen(true)}
      >
        <Search className="size-5" />
        <span className="text-xs font-medium">{placeholder}</span>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
          <div className="flex items-center gap-2 border-b border-gray-100 px-3 py-2">
            <Search className="size-4 shrink-0 text-gray-400" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="スポット名・アニメ名で検索"
              className="flex-1 text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />
            <button onClick={() => setOpen(false)}><X className="size-4 text-gray-400" /></button>
          </div>
          <ul className="max-h-56 overflow-y-auto">
            {filtered.map((spot) => (
              <li key={spot.id}>
                <button
                  className="flex w-full items-start gap-2.5 px-3 py-2.5 text-left hover:bg-gray-50"
                  onClick={() => { onSelect(spot); setOpen(false); setQuery(""); }}
                >
                  <div className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    {(spot.thumbnail_fallback_url ?? spot.thumbnail_url) && (
                      <Image src={spot.thumbnail_fallback_url ?? spot.thumbnail_url!} alt="" fill className="object-cover" sizes="36px" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-gray-900">{spot.location_name}</p>
                    <p className="truncate text-[10px] text-[#E53935]">{spot.anime_title}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── スコア比較バー ──
function CompareBar({
  labelA, scoreA,
  labelB, scoreB,
  label,
}: {
  labelA: string; scoreA: number | null;
  labelB: string; scoreB: number | null;
  label: string;
}) {
  const a = scoreA ?? 0;
  const b = scoreB ?? 0;
  const colorA = getScoreBadgeColor(scoreA);
  const colorB = getScoreBadgeColor(scoreB);
  const aWins = a > b;
  const bWins = b > a;

  return (
    <div>
      <p className="mb-1.5 text-center text-[10px] font-semibold uppercase tracking-wider text-gray-400">{label}</p>
      <div className="flex items-center gap-2">
        <div className="flex flex-1 flex-col items-end gap-1">
          <span className={`text-sm font-bold tabular-nums ${aWins ? "text-gray-900" : "text-gray-400"}`}>
            {scoreA != null ? scoreA.toFixed(1) : "—"}
          </span>
          <div className="flex h-2 w-full justify-end overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(a / 10) * 100}%`, backgroundColor: colorA }} />
          </div>
        </div>
        <div className="w-6 shrink-0" />
        <div className="flex flex-1 flex-col items-start gap-1">
          <span className={`text-sm font-bold tabular-nums ${bWins ? "text-gray-900" : "text-gray-400"}`}>
            {scoreB != null ? scoreB.toFixed(1) : "—"}
          </span>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(b / 10) * 100}%`, backgroundColor: colorB }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── メイン ──
export default function CompareClient() {
  const [spots, setSpots] = useState<SpotCard[]>([]);
  const [spotA, setSpotA] = useState<SelectedSpot>(null);
  const [spotB, setSpotB] = useState<SelectedSpot>(null);

  // 検索用に全件を名前順で取得（1ページ目を超える場合は追加ロード）
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const all: SpotCard[] = [];
      let offset = 0;
      for (;;) {
        const res = await fetch(`/api/spots?sort=name&offset=${offset}`);
        if (!res.ok) break;
        const data = await res.json() as { spots: SpotCard[]; hasMore: boolean };
        all.push(...data.spots);
        if (!data.hasMore) break;
        offset += data.spots.length;
        if (all.length > 5000) break; // 上限ガード
      }
      if (!cancelled) setSpots(all);
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const canCompare = spotA && spotB;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="border-b border-gray-100 bg-white px-4 py-4">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="size-5 text-[#E53935]" />
          <div>
            <h1 className="text-lg font-bold text-gray-900">スポット比較</h1>
            <p className="text-xs text-gray-400">2つの聖地を並べてスコアを比較しよう</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="mb-1.5 text-xs font-semibold text-gray-500">スポット A</p>
            <SpotPicker spots={spots} selected={spotA} onSelect={setSpotA} placeholder="Aを選択" />
          </div>
          <div>
            <p className="mb-1.5 text-xs font-semibold text-gray-500">スポット B</p>
            <SpotPicker spots={spots} selected={spotB} onSelect={setSpotB} placeholder="Bを選択" />
          </div>
        </div>

        {canCompare ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm space-y-5">
            <div className="grid grid-cols-[1fr_24px_1fr] items-center gap-2 text-center text-[10px] font-bold text-gray-400">
              <span className="truncate text-gray-700">{spotA.location_name}</span>
              <span className="text-gray-300">VS</span>
              <span className="truncate text-gray-700">{spotB.location_name}</span>
            </div>
            <div className="space-y-4">
              {SCORE_KEYS.map(({ key, label }) => (
                <CompareBar
                  key={key}
                  label={label}
                  labelA={spotA.location_name}
                  scoreA={spotA[key] as number | null}
                  labelB={spotB.location_name}
                  scoreB={spotB[key] as number | null}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-4">
              <Link href={`/spots/${spotA.id}`} className="flex items-center justify-center rounded-xl bg-[#E53935] py-2.5 text-xs font-bold text-white">
                Aの詳細を見る
              </Link>
              <Link href={`/spots/${spotB.id}`} className="flex items-center justify-center rounded-xl border border-[#E53935] py-2.5 text-xs font-bold text-[#E53935]">
                Bの詳細を見る
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-14 text-center">
            <ArrowLeftRight className="size-10 text-gray-200" />
            <p className="mt-3 text-sm font-medium text-gray-400">
              {!spotA && !spotB ? "2つのスポットを選択してください" :
               !spotA ? "スポット A を選択してください" :
               "スポット B を選択してください"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
