"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SpotThumbnail from "@/components/SpotThumbnail";
import { CheckCircle2, Heart, MapPin, Star, Train } from "lucide-react";
import { getScoreBadgeColor } from "@/lib/home-utils";
import { getVisitedIds, toggleVisited } from "@/lib/visited";
import { getLocalFavoriteIds, toggleLocalFavorite } from "@/lib/local-favorites";

export type FavoriteSpot = {
  id: string;
  location_name: string;
  anime_title: string;
  lat: number;
  lng: number;
  thumbnail_url: string | null;
  thumbnail_fallback_url: string | null;
  city: string | null;
  train_minutes: number | null;
};

export type MyReview = {
  id: string;
  spot_id: string;
  spot_name: string;
  anime_title: string;
  score_overall: number | null;
  score_reenactment: number | null;
  score_accessibility: number | null;
  score_photo: number | null;
  score_crowding: number | null;
  comment: string | null;
  created_at: string;
};

type Tab = "favorites" | "reviews" | "visited";

// ── お気に入りカード ──
function FavCard({ spot }: { spot: FavoriteSpot }) {
  return (
    <Link
      href={`/spots/${spot.id}`}
      className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm active:opacity-75"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <SpotThumbnail lat={spot.lat} lng={spot.lng} alt={spot.location_name} fallbackUrl={spot.thumbnail_url} className="object-cover" sizes="(max-width: 640px) 50vw, 200px" />
      </div>
      <div className="p-2.5">
        <p className="truncate text-[10px] font-semibold text-[#E53935]">{spot.anime_title}</p>
        <p className="mt-0.5 line-clamp-2 text-xs font-bold leading-snug text-gray-900">{spot.location_name}</p>
        <div className="mt-1 flex items-center gap-2 text-[10px] text-gray-400">
          {spot.city && <span className="flex items-center gap-0.5 truncate"><MapPin className="size-2.5 shrink-0" />{spot.city}</span>}
          {spot.train_minutes != null && <span className="flex shrink-0 items-center gap-0.5"><Train className="size-2.5" />{spot.train_minutes}分</span>}
        </div>
      </div>
    </Link>
  );
}

// ── レビューカード ──
function ReviewCard({ review }: { review: MyReview }) {
  const color = getScoreBadgeColor(review.score_overall);
  const date = new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "short", day: "numeric" }).format(new Date(review.created_at));

  function Pill({ label, value }: { label: string; value: number | null }) {
    const c = getScoreBadgeColor(value);
    return (
      <div className="flex flex-col items-center rounded-lg bg-gray-50 px-1.5 py-1">
        <span className="text-[9px] font-semibold text-gray-500">{label}</span>
        <span className="text-xs font-bold tabular-nums" style={{ color: c }}>
          {value != null ? value.toFixed(1) : "—"}
        </span>
      </div>
    );
  }

  return (
    <Link
      href={`/spots/${review.spot_id}`}
      className="block overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm active:bg-gray-50"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[10px] font-semibold text-[#E53935]">{review.anime_title}</p>
          <p className="truncate text-sm font-bold text-gray-900">{review.spot_name}</p>
          <p className="mt-0.5 text-[10px] text-gray-400">{date}</p>
        </div>
        {review.score_overall != null && (
          <div className="flex shrink-0 flex-col items-center rounded-xl bg-red-50 px-2.5 py-1.5">
            <span className="text-lg font-extrabold leading-none tabular-nums" style={{ color }}>
              {review.score_overall.toFixed(1)}
            </span>
            <span className="text-[9px] text-gray-400">/10</span>
          </div>
        )}
      </div>
      {review.comment && (
        <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-gray-600">{review.comment}</p>
      )}
      <div className="mt-2.5 grid grid-cols-4 gap-1">
        <Pill label="再現度" value={review.score_reenactment} />
        <Pill label="アクセス" value={review.score_accessibility} />
        <Pill label="写真映え" value={review.score_photo} />
        <Pill label="混雑度" value={review.score_crowding} />
      </div>
    </Link>
  );
}

// ── 訪問済みカード ──
function VisitedCard({ spot }: { spot: FavoriteSpot }) {

  function handleUnvisit(e: React.MouseEvent) {
    e.preventDefault();
    toggleVisited(spot.id);
    window.dispatchEvent(new CustomEvent("visited-changed", { detail: { spotId: spot.id, visited: false } }));
  }

  return (
    <Link
      href={`/spots/${spot.id}`}
      className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm active:opacity-75"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <SpotThumbnail lat={spot.lat} lng={spot.lng} alt={spot.location_name} fallbackUrl={spot.thumbnail_url} className="object-cover" sizes="(max-width: 640px) 50vw, 200px" />
        {/* 訪問済みバッジ */}
        <div className="absolute left-1.5 top-1.5 flex items-center gap-0.5 rounded-full bg-green-500 px-1.5 py-0.5 text-[9px] font-bold text-white shadow">
          <CheckCircle2 className="size-2.5" />
          訪問済み
        </div>
        {/* 削除ボタン */}
        <button
          onClick={handleUnvisit}
          className="absolute right-1.5 top-1.5 flex size-5 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm"
          aria-label="訪問済みを取り消す"
        >
          <span className="text-[10px] font-bold leading-none">✕</span>
        </button>
      </div>
      <div className="p-2.5">
        <p className="truncate text-[10px] font-semibold text-[#E53935]">{spot.anime_title}</p>
        <p className="mt-0.5 line-clamp-2 text-xs font-bold leading-snug text-gray-900">{spot.location_name}</p>
        <div className="mt-1 flex items-center gap-2 text-[10px] text-gray-400">
          {spot.city && <span className="flex items-center gap-0.5 truncate"><MapPin className="size-2.5 shrink-0" />{spot.city}</span>}
          {spot.train_minutes != null && <span className="flex shrink-0 items-center gap-0.5"><Train className="size-2.5" />{spot.train_minutes}分</span>}
        </div>
      </div>
    </Link>
  );
}

// ── メイン ──
export default function ProfileClient({
  favorites,
  reviews,
  isLoggedIn,
}: {
  favorites: FavoriteSpot[];
  reviews: MyReview[];
  isLoggedIn: boolean;
}) {
  const [tab, setTab] = useState<Tab>("favorites");

  // 訪問済み
  const [visitedIds, setVisitedIds] = useState<string[]>([]);
  const [visitedSpots, setVisitedSpots] = useState<FavoriteSpot[]>([]);
  const [visitedLoading, setVisitedLoading] = useState(false);

  // ゲストお気に入り
  const [guestFavIds, setGuestFavIds] = useState<string[]>([]);
  const [guestFavSpots, setGuestFavSpots] = useState<FavoriteSpot[]>([]);
  const [guestFavLoading, setGuestFavLoading] = useState(false);

  // ── 訪問済みイベント ──
  useEffect(() => {
    setVisitedIds(getVisitedIds());
    function onChanged() {
      const ids = getVisitedIds();
      setVisitedIds(ids);
      setVisitedSpots((prev) => prev.filter((s) => ids.includes(s.id)));
    }
    window.addEventListener("visited-changed", onChanged);
    return () => window.removeEventListener("visited-changed", onChanged);
  }, []);

  // ── ゲストお気に入りイベント ──
  useEffect(() => {
    if (isLoggedIn) return;
    setGuestFavIds(getLocalFavoriteIds());
    function onChanged(e: Event) {
      const { spotId, favorited } = (e as CustomEvent).detail;
      setGuestFavIds((prev) =>
        favorited ? [...prev, spotId] : prev.filter((id) => id !== spotId)
      );
      if (!favorited) {
        setGuestFavSpots((prev) => prev.filter((s) => s.id !== spotId));
      }
    }
    window.addEventListener("local-favorite-changed", onChanged);
    return () => window.removeEventListener("local-favorite-changed", onChanged);
  }, [isLoggedIn]);

  // ── 訪問済みスポット取得 ──
  useEffect(() => {
    if (tab !== "visited") return;
    if (visitedIds.length === 0) { setVisitedSpots([]); return; }
    const missingIds = visitedIds.filter((id) => !visitedSpots.find((s) => s.id === id));
    if (missingIds.length === 0) return;
    setVisitedLoading(true);
    fetch(`/api/spots?ids=${visitedIds.join(",")}`)
      .then((r) => r.json())
      .then((data: { spots: FavoriteSpot[] }) => {
        const all = data.spots ?? [];
        const matched = visitedIds
          .map((id) => all.find((s: FavoriteSpot) => s.id === id))
          .filter(Boolean) as FavoriteSpot[];
        setVisitedSpots(matched);
      })
      .catch(() => {/* silent */})
      .finally(() => setVisitedLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, visitedIds]);

  // ── ゲストお気に入りスポット取得 ──
  useEffect(() => {
    if (isLoggedIn || tab !== "favorites") return;
    if (guestFavIds.length === 0) { setGuestFavSpots([]); return; }
    const missingIds = guestFavIds.filter((id) => !guestFavSpots.find((s) => s.id === id));
    if (missingIds.length === 0) return;
    setGuestFavLoading(true);
    fetch(`/api/spots?ids=${guestFavIds.join(",")}`)
      .then((r) => r.json())
      .then((data: { spots: FavoriteSpot[] }) => {
        const all = data.spots ?? [];
        const matched = guestFavIds
          .map((id) => all.find((s: FavoriteSpot) => s.id === id))
          .filter(Boolean) as FavoriteSpot[];
        setGuestFavSpots(matched);
      })
      .catch(() => {/* silent */})
      .finally(() => setGuestFavLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, tab, guestFavIds]);

  // 表示用お気に入り：ログイン時はSupabase、ゲスト時はlocalStorage
  const displayFavorites = isLoggedIn ? favorites : guestFavSpots;
  const displayFavCount = isLoggedIn ? favorites.length : guestFavIds.length;
  const favLoading = !isLoggedIn && guestFavLoading;

  return (
    <>
      {/* タブ */}
      <div className="sticky top-0 z-10 flex border-b border-gray-100 bg-white">
        <button
          onClick={() => setTab("favorites")}
          className={`flex flex-1 items-center justify-center gap-1 py-3 text-xs font-semibold transition-colors ${
            tab === "favorites" ? "border-b-2 border-[#E53935] text-[#E53935]" : "text-gray-400"
          }`}
        >
          <Heart className="size-3.5" />
          お気に入り
          {displayFavCount > 0 && (
            <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${tab === "favorites" ? "bg-red-50 text-[#E53935]" : "bg-gray-100 text-gray-400"}`}>
              {displayFavCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setTab("visited")}
          className={`flex flex-1 items-center justify-center gap-1 py-3 text-xs font-semibold transition-colors ${
            tab === "visited" ? "border-b-2 border-green-500 text-green-600" : "text-gray-400"
          }`}
        >
          <CheckCircle2 className="size-3.5" />
          訪問済み
          {visitedIds.length > 0 && (
            <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${tab === "visited" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"}`}>
              {visitedIds.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setTab("reviews")}
          className={`flex flex-1 items-center justify-center gap-1 py-3 text-xs font-semibold transition-colors ${
            tab === "reviews" ? "border-b-2 border-[#E53935] text-[#E53935]" : "text-gray-400"
          }`}
        >
          <Star className="size-3.5" />
          レビュー
          {reviews.length > 0 && (
            <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${tab === "reviews" ? "bg-red-50 text-[#E53935]" : "bg-gray-100 text-gray-400"}`}>
              {reviews.length}
            </span>
          )}
        </button>
      </div>

      {/* コンテンツ */}
      <div className="p-3">
        {tab === "favorites" && (
          favLoading ? (
            <div className="grid grid-cols-2 gap-2.5">
              {guestFavIds.map((id) => (
                <div key={id} className="aspect-[4/3] animate-pulse rounded-2xl bg-gray-100" />
              ))}
            </div>
          ) : displayFavorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-gray-100">
                <Heart className="size-7 text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-500">まだお気に入りがありません</p>
              <p className="text-xs text-gray-400">スポット詳細で♥をタップして保存しよう</p>
              <Link href="/spots" className="mt-1 rounded-full bg-[#E53935] px-5 py-2 text-sm font-semibold text-white">
                聖地を探す
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              {displayFavorites.map((s) => <FavCard key={s.id} spot={s} />)}
            </div>
          )
        )}
        {tab === "visited" && (
          visitedIds.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-gray-100">
                <CheckCircle2 className="size-7 text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-500">まだ訪問済みスポットがありません</p>
              <p className="text-xs text-gray-400">スポット詳細で「訪問した」をタップして記録しよう</p>
              <Link href="/spots" className="mt-1 rounded-full bg-[#E53935] px-5 py-2 text-sm font-semibold text-white">
                聖地を探す
              </Link>
            </div>
          ) : visitedLoading ? (
            <div className="grid grid-cols-2 gap-2.5">
              {visitedIds.map((id) => (
                <div key={id} className="aspect-[4/3] animate-pulse rounded-2xl bg-gray-100" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              {visitedSpots.map((s) => <VisitedCard key={s.id} spot={s} />)}
            </div>
          )
        )}
        {tab === "reviews" && (
          reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-gray-100">
                <Star className="size-7 text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-500">まだレビューを投稿していません</p>
              <p className="text-xs text-gray-400">訪れた聖地にレビューを書いてみよう</p>
              <Link href="/spots" className="mt-1 rounded-full bg-[#E53935] px-5 py-2 text-sm font-semibold text-white">
                聖地を探す
              </Link>
            </div>
          ) : (
            <div className="space-y-2.5">
              {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
            </div>
          )
        )}
      </div>
    </>
  );
}
