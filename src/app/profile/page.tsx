import Link from "next/link";
import { LogIn, LogOut, UserCircle } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import ProfileClient, { type FavoriteSpot, type MyReview } from "./ProfileClient";

// ── お気に入り：スポット情報を直接JOINして取得 ──
async function getUserFavorites(userId: string): Promise<FavoriteSpot[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createServerSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase as any)
    .from("favorites")
    .select("spot_id, spots(id, location_name, anime_title, thumbnail_url, lat, lng, train_minutes)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (!data?.length) return [];

  return data
    .filter((row: { spots: unknown }) => row.spots)
    .map((row: { spots: { id: string; location_name: string; anime_title: string; thumbnail_url: string | null; lat: number; lng: number; train_minutes: number | null } }) => {
      const s = row.spots;
      return {
        id: s.id,
        location_name: s.location_name,
        anime_title: s.anime_title,
        thumbnail_url: s.thumbnail_url,
        thumbnail_fallback_url: null,
        city: null,
        train_minutes: s.train_minutes,
      } satisfies FavoriteSpot;
    });
}

// ── レビュー：スポット名も一緒に取得 ──
async function getUserReviews(userId: string): Promise<MyReview[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createServerSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase as any)
    .from("reviews")
    .select("id, spot_id, score_overall, score_reenactment, score_accessibility, score_photo, score_crowding, comment, created_at, spots(location_name, anime_title)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (!data?.length) return [];

  return data.map((r: {
    id: string; spot_id: string;
    score_overall: number | null; score_reenactment: number | null;
    score_accessibility: number | null; score_photo: number | null; score_crowding: number | null;
    comment: string | null; created_at: string;
    spots: { location_name: string; anime_title: string } | null;
  }) => ({
    id: r.id,
    spot_id: r.spot_id,
    spot_name: r.spots?.location_name ?? "不明なスポット",
    anime_title: r.spots?.anime_title ?? "不明",
    score_overall: r.score_overall,
    score_reenactment: r.score_reenactment,
    score_accessibility: r.score_accessibility,
    score_photo: r.score_photo,
    score_crowding: r.score_crowding,
    comment: r.comment,
    created_at: r.created_at,
  } satisfies MyReview));
}

export default async function ProfilePage() {
  const user = await getCurrentUser();

  const [favorites, reviews] = user
    ? await Promise.all([getUserFavorites(user.id), getUserReviews(user.id)])
    : [[], []];

  const initial = user?.username?.[0]?.toUpperCase() ?? "G";

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* ヘッダー */}
      <div className="bg-white px-4 pb-4 pt-6">
        <div className="flex items-center gap-4">
          {/* アバター */}
          <div className={`flex size-16 items-center justify-center rounded-full shadow-sm ${user ? "bg-gradient-to-br from-[#E53935] to-[#FF7043]" : "bg-gray-200"}`}>
            {user ? (
              <span className="text-2xl font-extrabold text-white">{initial}</span>
            ) : (
              <UserCircle className="size-8 text-gray-400" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            {user ? (
              <>
                <p className="truncate text-lg font-bold text-gray-900">{user.username}</p>
                <p className="truncate text-xs text-gray-400">{user.email}</p>
              </>
            ) : (
              <>
                <p className="text-lg font-bold text-gray-900">ゲスト</p>
                <p className="text-xs text-gray-400">ログインすると全機能が使えます</p>
              </>
            )}
          </div>
        </div>

        {/* 統計（ログイン時のみ） */}
        {user && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-gray-50 py-3 text-center">
              <p className="text-2xl font-extrabold text-[#E53935]">{reviews.length}</p>
              <p className="mt-0.5 text-xs text-gray-400">レビュー数</p>
            </div>
            <div className="rounded-2xl bg-gray-50 py-3 text-center">
              <p className="text-2xl font-extrabold text-[#E53935]">{favorites.length}</p>
              <p className="mt-0.5 text-xs text-gray-400">お気に入り</p>
            </div>
          </div>
        )}

        {/* ログイン/登録 CTA（ゲスト） */}
        {!user && (
          <div className="mt-4 flex gap-2.5">
            <Link
              href="/auth/login?redirect=/profile"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-[#E53935] py-2.5 text-sm font-bold text-white"
            >
              <LogIn className="size-4" />
              ログイン
            </Link>
            <Link
              href="/auth/register?redirect=/profile"
              className="flex flex-1 items-center justify-center rounded-2xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-700"
            >
              新規登録
            </Link>
          </div>
        )}

        {/* ログアウト（ログイン時） */}
        {user && (
          <form action="/auth/signout" method="post" className="mt-3">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 py-2.5 text-sm text-gray-500 active:bg-gray-50"
            >
              <LogOut className="size-4" />
              ログアウト
            </button>
          </form>
        )}
      </div>

      {/* タブ＋コンテンツ */}
      <ProfileClient favorites={favorites} reviews={reviews} isLoggedIn={Boolean(user)} />
    </div>
  );
}
