"use client";

import { useEffect, useState, useRef } from "react";
import { Star, Clock, MapPin, Utensils, Landmark, Coffee } from "lucide-react";
import type { NearbyPlace } from "@/app/api/nearby/route";

// ── 距離計算（m） ──
function calcDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// ── 価格レベル → ¥表示 ──
function PriceLevel({ level }: { level: number | null }) {
  if (level == null) return null;
  return (
    <span className="text-[10px] text-green-600 font-semibold">
      {"¥".repeat(level)}
      <span className="text-gray-300">{"¥".repeat(Math.max(0, 4 - level))}</span>
    </span>
  );
}

// ── 星評価 ──
function RatingStars({ rating, count }: { rating: number | null; count: number }) {
  if (rating == null) return <span className="text-[10px] text-gray-400">評価なし</span>;
  return (
    <span className="flex items-center gap-0.5">
      <Star className="size-2.5 fill-amber-400 text-amber-400" />
      <span className="text-[10px] font-bold text-gray-700">{rating.toFixed(1)}</span>
      {count > 0 && <span className="text-[10px] text-gray-400">({count.toLocaleString()})</span>}
    </span>
  );
}

// ── プレイス写真URL（自前プロキシ経由）──
function photoUrl(ref: string): string {
  return `/api/place-photo?ref=${encodeURIComponent(ref)}`;
}

// ── カテゴリ定義 ──
type Category = { key: string; label: string; icon: React.ReactNode; color: string };
const CATEGORIES: Category[] = [
  { key: "food",        label: "飲食店",   icon: <Utensils className="size-3.5" />, color: "text-orange-500" },
  { key: "cafe",        label: "カフェ",   icon: <Coffee   className="size-3.5" />, color: "text-amber-600" },
  { key: "sightseeing", label: "観光スポット", icon: <Landmark className="size-3.5" />, color: "text-blue-500" },
];

// ── プレイスカード ──
function PlaceCard({ place, spotLat, spotLng }: { place: NearbyPlace; spotLat: number; spotLng: number }) {
  const dist = calcDistance(spotLat, spotLng, place.lat, place.lng);
  const mapsUrl = `https://www.google.com/maps/place/?q=place_id:${place.place_id}`;

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-40 shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      {/* 画像 */}
      <div className="relative h-24 w-full bg-gray-100">
        {place.photo_ref ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoUrl(place.photo_ref)}
            alt={place.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <MapPin className="size-6 text-gray-300" />
          </div>
        )}

        {/* 営業中バッジ */}
        {place.open_now != null && (
          <span className={`absolute right-1.5 top-1.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
            place.open_now
              ? "bg-green-500 text-white"
              : "bg-gray-500 text-white"
          }`}>
            {place.open_now ? "営業中" : "営業時間外"}
          </span>
        )}
      </div>

      {/* 情報 */}
      <div className="flex flex-1 flex-col gap-1 p-2">
        <p className="line-clamp-2 text-[11px] font-bold leading-tight text-gray-900">{place.name}</p>
        <RatingStars rating={place.rating} count={place.user_ratings_total} />
        <div className="flex items-center justify-between mt-auto pt-1">
          <PriceLevel level={place.price_level} />
          <span className="flex items-center gap-0.5 text-[9px] text-gray-400">
            <Clock className="size-2.5" />
            {dist < 1000 ? `${dist}m` : `${(dist / 1000).toFixed(1)}km`}
          </span>
        </div>
      </div>
    </a>
  );
}

// ── スケルトン ──
function Skeleton() {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="w-40 shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="h-24 animate-pulse bg-gray-200" />
          <div className="p-2 space-y-1.5">
            <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-2.5 w-1/2 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── メイン ──
export default function NearbyPlaces({ lat, lng }: { lat: number; lng: number }) {
  const [activeCategory, setActiveCategory] = useState("food");
  const [cache, setCache]     = useState<Record<string, NearbyPlace[]>>({});
  const [loading, setLoading] = useState(false);
  const scrollRef             = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cache[activeCategory] !== undefined) return;

    setLoading(true);
    fetch(`/api/nearby?lat=${lat}&lng=${lng}&category=${activeCategory}`)
      .then((r) => r.json())
      .then((data: unknown) => {
        const list = Array.isArray(data) ? (data as NearbyPlace[]) : [];
        setCache((prev) => ({ ...prev, [activeCategory]: list }));
      })
      .catch(() => {
        setCache((prev) => ({ ...prev, [activeCategory]: [] }));
      })
      .finally(() => setLoading(false));
  }, [activeCategory, lat, lng, cache]);

  // カテゴリ切替時にスクロールをリセット
  useEffect(() => {
    scrollRef.current?.scrollTo({ left: 0 });
  }, [activeCategory]);

  const places = cache[activeCategory] ?? [];

  return (
    <section className="mt-8 px-4">
      {/* ヘッダー */}
      <h3 className="mb-3 text-base font-bold text-gray-900">周辺スポット</h3>

      {/* カテゴリタブ */}
      <div className="mb-3 flex gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeCategory === cat.key
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            <span className={activeCategory === cat.key ? "text-white" : cat.color}>
              {cat.icon}
            </span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* コンテンツ */}
      {loading ? (
        <Skeleton />
      ) : places.length === 0 ? (
        <div className="flex h-28 items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white">
          <p className="text-sm text-gray-400">周辺に該当する施設が見つかりません</p>
        </div>
      ) : (
        <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-none pb-2">
          {places.map((place) => (
            <PlaceCard key={place.place_id} place={place} spotLat={lat} spotLng={lng} />
          ))}
        </div>
      )}

      <p className="mt-2 text-right text-[10px] text-gray-300">Powered by Google Places</p>
    </section>
  );
}
