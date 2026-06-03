"use client";

import Link from "next/link";
import { MapPin, Train } from "lucide-react";
import ScoreBadge from "@/components/ScoreBadge";
import SpotThumbnail from "@/components/SpotThumbnail";
import type { SpotWithStats } from "@/types/supabase";

type HomeSpotListItemProps = {
  spot: SpotWithStats;
};

export default function HomeSpotListItem({ spot }: HomeSpotListItemProps) {
  return (
    <Link
      href={`/spots/${spot.id}`}
      className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 transition-colors active:bg-gray-50"
    >
      {/* Thumbnail */}
      <div className="relative size-[4.75rem] shrink-0 overflow-hidden rounded-xl bg-gray-100">
        {spot.thumbnail_url || spot.thumbnail_fallback_url ? (
          <SpotThumbnail
            lat={spot.lat}
            lng={spot.lng}
            alt={spot.location_name}
            fallbackUrl={spot.thumbnail_fallback_url ?? spot.thumbnail_url}
            className="object-cover"
            sizes="76px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-300">
            <MapPin className="size-6" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-[15px] leading-snug font-bold text-gray-900">
          {spot.location_name}
        </h2>
        <p className="mt-0.5 truncate text-xs text-[#E53935]">
          <span
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/anime/${encodeURIComponent(spot.anime_title)}`;
            }}
          >
            {spot.anime_title}
          </span>
        </p>
        <div className="mt-1.5 flex items-center gap-2.5 text-[11px] text-gray-400">
          {spot.city && (
            <span className="flex items-center gap-0.5">
              <MapPin className="size-3 shrink-0" />
              <span className="truncate max-w-[6rem]">{spot.city}</span>
            </span>
          )}
          {spot.train_minutes != null && (
            <span className="flex items-center gap-0.5 shrink-0">
              <Train className="size-3 shrink-0" />
              {spot.train_minutes}分
            </span>
          )}
        </div>
      </div>

      {/* Score */}
      <ScoreBadge score={spot.overall_score} reviewCount={spot.review_count} size="md" />
    </Link>
  );
}
