"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, MapPin, Train } from "lucide-react";
import ScoreBadge from "@/components/ScoreBadge";
import { isVisited } from "@/lib/visited";
import type { SpotWithStats } from "@/types/supabase";

type HomeSpotCardProps = {
  spot: SpotWithStats;
};

export default function HomeSpotCard({ spot }: HomeSpotCardProps) {
  const [visited, setVisited] = useState(false);
  const imageUrl = spot.thumbnail_fallback_url ?? spot.thumbnail_url ?? null;

  useEffect(() => {
    setVisited(isVisited(spot.id));
    function onVisitedChanged(e: Event) {
      const { spotId, visited: v } = (e as CustomEvent).detail;
      if (spotId === spot.id) setVisited(v);
    }
    window.addEventListener("visited-changed", onVisitedChanged);
    return () => window.removeEventListener("visited-changed", onVisitedChanged);
  }, [spot.id]);

  return (
    <Link
      href={`/spots/${spot.id}`}
      className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm active:opacity-80"
    >
      {/* サムネイル */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={spot.location_name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 200px"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <MapPin className="size-8 text-gray-300" />
          </div>
        )}
        {/* スコアバッジ（右上） */}
        <div className="absolute right-2 top-2">
          <ScoreBadge score={spot.overall_score} reviewCount={spot.review_count} size="sm" />
        </div>
        {/* 訪問済みバッジ（左上） */}
        {visited && (
          <div className="absolute left-2 top-2 flex items-center gap-0.5 rounded-full bg-green-500 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-sm">
            <CheckCircle2 className="size-2.5" />
            訪問済み
          </div>
        )}
      </div>

      {/* 情報 */}
      <div className="flex flex-1 flex-col p-2.5">
        {/* アニメ名 */}
        <p className="line-clamp-1 text-[10px] font-semibold text-[#E53935]">
          {spot.anime_title}
        </p>
        {/* 場所名 */}
        <p className="mt-0.5 line-clamp-2 text-xs font-bold leading-snug text-gray-900">
          {spot.location_name}
        </p>
        {/* 都市・電車 */}
        <div className="mt-1.5 flex items-center gap-2 text-[10px] text-gray-400">
          {spot.city && (
            <span className="flex items-center gap-0.5 truncate">
              <MapPin className="size-2.5 shrink-0" />
              <span className="truncate">{spot.city}</span>
            </span>
          )}
          {spot.train_minutes != null && (
            <span className="flex shrink-0 items-center gap-0.5">
              <Train className="size-2.5" />
              {spot.train_minutes}分
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
