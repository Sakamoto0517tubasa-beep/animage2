"use client";

import { useEffect, useState, useRef } from "react";
import { Star, MapPin, Utensils, Landmark, Coffee, Hotel, Navigation, ExternalLink } from "lucide-react";
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
  { key: "lodging",     label: "宿泊",     icon: <Hotel    className="size-3.5" />, color: "text-rose-500" },
  { key: "sightseeing", label: "観光",     icon: <Landmark className="size-3.5" />, color: "text-blue-500" },
];

// ── 予約・送客リンク（将来ここをアフィリエイトリンクに差し替え）──
function bookingUrl(place: NearbyPlace, category: string): { href: string; label: string } | null {
  if (category === "lodging") {
    // 宿泊 → 楽天トラベルのキーワード検索（※アフィリエイトIDは後で付与）
    return {
      href: `https://search.travel.rakuten.co.jp/ds/yado/list?f_keyword=${encodeURIComponent(place.name)}`,
      label: "宿を予約",
    };
  }
  if (category === "food" || category === "cafe") {
    // 飲食 → 食べログのキーワード検索（※アフィリエイトIDは後で付与）
    return {
      href: `https://tabelog.com/rstLst/?sw=${encodeURIComponent(place.name)}`,
      label: "予約・口コミ",
    };
  }
  return null;
}

// ── プレイスカード ──
function PlaceCard({ place, spotLat, spotLng, category }: { place: NearbyPlace; spotLat: number; spotLng: number; category: string }) {
  const dist = calcDistance(spotLat, spotLng, place.lat, place.lng);
  const distLabel = dist < 1000 ? `${dist}m` : `${(dist / 1000).toFixed(1)}km`;
  const mapsUrl = `https://www.google.com/maps/place/?q=place_id:${place.place_id}`;
  const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}&destination_place_id=${place.place_id}`;
  const booking = bookingUrl(place, category);

  return (
    <div className="flex w-44 shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* 画像（詳細リンク） */}
      <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="relative block h-28 w-full bg-gray-100">
        {place.photo_ref ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoUrl(place.photo_ref)} alt={place.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <MapPin className="size-6 text-gray-300" />
          </div>
        )}

        {/* 距離バッジ（左上） */}
        <span className="absolute left-1.5 top-1.5 rounded-full bg-black/60 px-1.5 py-0.5 text-[9px] font-bold text-white backdrop-blur-sm">
          {distLabel}
        </span>

        {/* 営業中バッジ（右上） */}
        {place.open_now != null && (
          <span className={`absolute right-1.5 top-1.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
            place.open_now ? "bg-green-500 text-white" : "bg-gray-500 text-white"
          }`}>
            {place.open_now ? "営業中" : "営業時間外"}
          </span>
        )}
      </a>

      {/* 情報 */}
      <div className="flex flex-1 flex-col gap-1 p-2">
        <p className="line-clamp-2 text-[11px] font-bold leading-tight text-gray-900">{place.name}</p>
        <RatingStars rating={place.rating} count={place.user_ratings_total} />
        {place.vicinity && (
          <p className="line-clamp-1 text-[9px] text-gray-400">{place.vicinity}</p>
        )}
        <div className="mt-0.5">
          <PriceLevel level={place.price_level} />
        </div>

        {/* アクションボタン */}
        <div className="mt-auto flex gap-1 pt-1.5">
          <a
            href={dirUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-0.5 rounded-lg bg-gray-100 py-1 text-[9px] font-bold text-gray-600 hover:bg-gray-200"
          >
            <Navigation className="size-2.5" />
            ルート
          </a>
          {booking && (
            <a
              href={booking.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-0.5 rounded-lg bg-[#E53935] py-1 text-[9px] font-bold text-white hover:bg-[#D32F2F]"
            >
              <ExternalLink className="size-2.5" />
              {booking.label}
            </a>
          )}
        </div>
      </div>
    </div>
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
      <div className="mb-3">
        <h3 className="text-base font-bold text-gray-900">この聖地のまわりで</h3>
        <p className="text-[11px] text-gray-400">食べる・泊まる・立ち寄るスポット</p>
      </div>

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
            <PlaceCard key={place.place_id} place={place} spotLat={lat} spotLng={lng} category={activeCategory} />
          ))}
        </div>
      )}

      <p className="mt-2 text-right text-[10px] text-gray-300">Powered by Google Places</p>
    </section>
  );
}
