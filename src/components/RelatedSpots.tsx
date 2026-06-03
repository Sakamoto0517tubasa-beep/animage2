"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Train } from "lucide-react";
import type { SpotCard } from "@/app/api/spots/route";

export default function RelatedSpots({
  animeTitle,
  currentSpotId,
}: {
  animeTitle: string;
  currentSpotId: string;
}) {
  const [spots, setSpots] = useState<SpotCard[]>([]);

  useEffect(() => {
    fetch(`/api/spots?q=${encodeURIComponent(animeTitle)}&limit=20`)
      .then((r) => r.json())
      .then((d) => {
        const related = (d.spots ?? []).filter(
          (s: SpotCard) => s.id !== currentSpotId && s.anime_title === animeTitle
        );
        setSpots(related.slice(0, 10));
      })
      .catch(() => {});
  }, [animeTitle, currentSpotId]);

  if (spots.length === 0) return null;

  return (
    <section className="px-4 mt-8">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-bold text-gray-900">同じアニメの聖地</h3>
        <Link
          href={`/anime/${encodeURIComponent(animeTitle)}`}
          className="text-xs font-semibold text-[#E53935]"
        >
          すべて見る
        </Link>
      </div>
      <div className="flex gap-2.5 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {spots.map((spot) => {
          const img = spot.thumbnail_fallback_url ?? spot.thumbnail_url;
          return (
            <Link
              key={spot.id}
              href={`/spots/${spot.id}`}
              className="w-36 shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm active:opacity-75"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                {img ? (
                  <Image src={img} alt={spot.location_name} fill className="object-cover" sizes="144px" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <MapPin className="size-6 text-gray-300" />
                  </div>
                )}
              </div>
              <div className="p-2">
                <p className="line-clamp-2 text-[11px] font-bold leading-snug text-gray-900">{spot.location_name}</p>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] text-gray-400">
                  {spot.city && (
                    <span className="flex items-center gap-0.5 truncate">
                      <MapPin className="size-2.5 shrink-0" />{spot.city}
                    </span>
                  )}
                  {spot.train_minutes != null && (
                    <span className="flex shrink-0 items-center gap-0.5">
                      <Train className="size-2.5" />{spot.train_minutes}分
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
