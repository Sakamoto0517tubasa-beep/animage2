"use client";

import { useEffect, useRef, useState } from "react";
import HomeSpotCard from "@/components/home/HomeSpotCard";
import type { SpotWithStats } from "@/types/supabase";

// 初期40件＋スクロールで追加（人気アニメは聖地が多く重いため）
export default function AnimeSpotGrid({ spots }: { spots: SpotWithStats[] }) {
  const [visibleCount, setVisibleCount] = useState(40);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setVisibleCount((c) => c + 40); },
      { rootMargin: "400px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [spots.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {spots.slice(0, visibleCount).map((spot) => (
          <HomeSpotCard key={spot.id} spot={spot} />
        ))}
      </div>
      {visibleCount < spots.length && (
        <div ref={sentinelRef} className="py-6 text-center text-xs text-gray-400">
          読み込み中…（残り{spots.length - visibleCount}件）
        </div>
      )}
    </>
  );
}
