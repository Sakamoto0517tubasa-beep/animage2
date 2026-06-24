/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase";
import { SEED_SPOTS } from "@/data/seed-spots";
import ANITABI_DATA from "@/data/anitabi-images.json";

// ── Anitabi 画像ルックアップ ──
const { points: RAW_POINTS, byTitle: ANITABI_BY_TITLE } = ANITABI_DATA as any;
const SORTED_POINTS: [number, number, string][] = [...(RAW_POINTS as [number, number, string][])].sort((a, b) => a[0] - b[0]);
const ANITABI_BASE = "https://image.anitabi.cn/points/";
const LAT_THR = 0.002;
const DIST_THR = 0.0000032;

function toFullUrl(path: string) {
  return path.startsWith("http") ? path : `${ANITABI_BASE}${path}?plan=h160`;
}

export function findImageByCoord(lat: number, lng: number): string | null {
  let lo = 0, hi = SORTED_POINTS.length;
  while (lo < hi) { const mid = (lo + hi) >> 1; if (SORTED_POINTS[mid][0] < lat - LAT_THR) lo = mid + 1; else hi = mid; }
  const cos = Math.cos(lat * Math.PI / 180);
  let best = DIST_THR, path: string | null = null;
  for (let i = lo; i < SORTED_POINTS.length; i++) {
    const [plat, plng, p] = SORTED_POINTS[i];
    if (plat > lat + LAT_THR) break;
    const d = (plat - lat) ** 2 + ((plng - lng) * cos) ** 2;
    if (d < best) { best = d; path = p; }
  }
  return path ? toFullUrl(path) : null;
}

export function findImageByTitle(title: string): string | null {
  const byTitle = ANITABI_BY_TITLE as Record<string, string[]>;
  let imgs = byTitle[title];
  if (!imgs) {
    for (const [k, v] of Object.entries(byTitle)) {
      if (title.includes(k) || k.includes(title)) { imgs = v as string[]; break; }
    }
  }
  return imgs?.length ? toFullUrl(imgs[0]) : null;
}

// ── 都道府県推定 ──
export function inferPrefecture(lat: number, lng: number): string {
  if (lat < 24 || lat > 46 || lng < 122 || lng > 154) return "東京";
  if (lat < 28) return "沖縄";
  if (lat >= 41.4 && lng >= 139.4) return "北海道";
  if (lat >= 38.2 && lat < 39.0 && lng >= 140.5 && lng < 141.5) return "宮城";
  if (lat >= 36.8 && lat < 37.9 && lng >= 139.2 && lng < 141.1) return "福島";
  if (lat >= 35.7 && lat < 36.8 && lng >= 139.7 && lng < 140.9) return "茨城";
  if (lat >= 36.1 && lat < 37.1 && lng >= 138.4 && lng < 139.7) return "群馬";
  if (lat >= 35.7 && lat < 36.3 && lng >= 138.7 && lng < 139.9) return "埼玉";
  if (lat >= 34.9 && lat < 36.1 && lng >= 139.7 && lng < 141.0) return "千葉";
  if (lat >= 35.5 && lat < 35.9 && lng >= 138.9 && lng < 139.9) return "東京";
  if (lat >= 35.1 && lat < 35.7 && lng >= 138.9 && lng < 139.8) return "神奈川";
  if (lat >= 35.1 && lat < 36.0 && lng >= 138.2 && lng < 139.2) return "山梨";
  if (lat >= 35.2 && lat < 37.0 && lng >= 137.3 && lng < 138.6) return "長野";
  if (lat >= 36.4 && lat < 37.1 && lng >= 136.7 && lng < 137.8) return "富山";
  if (lat >= 36.1 && lat < 37.9 && lng >= 136.1 && lng < 137.4) return "石川";
  if (lat >= 35.4 && lat < 36.3 && lng >= 135.5 && lng < 136.8) return "福井";
  if (lat >= 34.6 && lat < 35.6 && lng >= 137.3 && lng < 139.2) return "静岡";
  if (lat >= 34.5 && lat < 35.4 && lng >= 136.5 && lng < 137.9) return "愛知";
  if (lat >= 33.7 && lat < 35.2 && lng >= 135.8 && lng < 136.9) return "三重";
  if (lat >= 34.7 && lat < 35.9 && lng >= 134.9 && lng < 135.9) return "京都";
  if (lat >= 34.3 && lat < 34.9 && lng >= 135.1 && lng < 135.8) return "大阪";
  if (lat >= 34.3 && lat < 35.7 && lng >= 134.2 && lng < 135.5) return "兵庫";
  if (lat >= 34.5 && lat < 35.5 && lng >= 133.2 && lng < 134.6) return "岡山";
  if (lat >= 33.8 && lat < 35.2 && lng >= 132.0 && lng < 133.5) return "広島";
  if (lat >= 33.8 && lat < 34.4 && lng >= 133.4 && lng < 134.6) return "香川";
  if (lat >= 33.0 && lat < 34.3 && lng >= 132.0 && lng < 133.7) return "愛媛";
  if (lat >= 33.1 && lat < 34.3 && lng >= 130.1 && lng < 131.3) return "福岡";
  if (lat >= 32.0 && lat < 33.2 && lng >= 130.0 && lng < 131.5) return "熊本";
  if (lat >= 32.7 && lat < 33.9 && lng >= 130.9 && lng < 132.2) return "大分";
  if (lat >= 31.3 && lat < 32.8 && lng >= 130.6 && lng < 132.0) return "宮崎";
  if (lat >= 31.3 && lat < 32.2 && lng >= 129.3 && lng < 130.6) return "鹿児島";
  return "東京";
}

export type SpotCard = {
  id: string;
  anime_title: string;
  location_name: string;
  city: string;
  lat: number;
  lng: number;
  train_minutes: number | null;
  thumbnail_url: string | null;
  thumbnail_fallback_url: string | null;
  overall_score: number | null;
  review_count: number;
  score_reenactment: number | null;
  score_accessibility: number | null;
  score_photo: number | null;
  score_crowding: number | null;
};

type RawSpot = { id: string; anime_title: string; location_name: string; lat: number; lng: number; train_minutes: number | null };
type RawReview = { spot_id: string; score_overall: number | null; score_reenactment: number | null; score_accessibility: number | null; score_photo: number | null; score_crowding: number | null };

// ── モジュールレベルキャッシュ ──
let spotsCache: { data: RawSpot[]; at: number } | null = null;
const SPOTS_TTL = 3600_000;
let reviewsCache: { data: RawReview[]; at: number } | null = null;
const REVIEWS_TTL = 300_000;

async function getCachedRawSpots(): Promise<RawSpot[]> {
  if (!isSupabaseConfigured()) return [];
  const now = Date.now();
  if (spotsCache && now - spotsCache.at < SPOTS_TTL) return spotsCache.data;
  const supabase = createAdminSupabaseClient();
  const BATCH = 1000;
  const rows: RawSpot[] = [];
  for (let offset = 0; ; offset += BATCH) {
    const { data, error } = await (supabase as any)
      .from("spots")
      .select("id,anime_title,location_name,lat,lng,train_minutes")
      .order("id")
      .range(offset, offset + BATCH - 1);
    if (error || !data?.length) break;
    rows.push(...(data as RawSpot[]));
    if ((data as any[]).length < BATCH) break;
  }
  spotsCache = { data: rows, at: now };
  return rows;
}

async function getCachedReviews(): Promise<RawReview[]> {
  if (!isSupabaseConfigured()) return [];
  const now = Date.now();
  if (reviewsCache && now - reviewsCache.at < REVIEWS_TTL) return reviewsCache.data;
  const supabase = createAdminSupabaseClient();
  const { data } = await supabase
    .from("reviews")
    .select("spot_id,score_overall,score_reenactment,score_accessibility,score_photo,score_crowding");
  const result = (data ?? []) as unknown as RawReview[];
  reviewsCache = { data: result, at: now };
  return result;
}

async function buildAllSpotCards(): Promise<SpotCard[]> {
  const [rawSpots, rawReviews] = await Promise.all([getCachedRawSpots(), getCachedReviews()]);

  const baseSpots: RawSpot[] = rawSpots.length > 0
    ? rawSpots
    : SEED_SPOTS.map((s) => ({ id: s.id, anime_title: s.anime_title, location_name: s.location_name, lat: s.lat, lng: s.lng, train_minutes: (s as any).train_minutes ?? null }));

  const revMap = new Map<string, { count: number; overall: number; reenact: number; access: number; photo: number; crowding: number }>();
  for (const r of rawReviews) {
    const cur = revMap.get(r.spot_id) ?? { count: 0, overall: 0, reenact: 0, access: 0, photo: 0, crowding: 0 };
    cur.count++;
    cur.overall  += r.score_overall       ?? 0;
    cur.reenact  += r.score_reenactment   ?? 0;
    cur.access   += r.score_accessibility ?? 0;
    cur.photo    += r.score_photo         ?? 0;
    cur.crowding += r.score_crowding      ?? 0;
    revMap.set(r.spot_id, cur);
  }

  return baseSpots.map((s) => {
    const rev = revMap.get(s.id);
    const n = rev?.count ?? 0;
    const img = findImageByCoord(s.lat, s.lng) ?? findImageByTitle(s.anime_title);
    return {
      id: s.id,
      anime_title: s.anime_title,
      location_name: s.location_name,
      city: inferPrefecture(s.lat, s.lng),
      lat: s.lat,
      lng: s.lng,
      train_minutes: s.train_minutes,
      thumbnail_fallback_url: img,
      thumbnail_url: img,
      overall_score:       n ? Math.round((rev!.overall  / n) * 10) / 10 : null,
      review_count:        n,
      score_reenactment:   n ? Math.round((rev!.reenact  / n) * 10) / 10 : null,
      score_accessibility: n ? Math.round((rev!.access   / n) * 10) / 10 : null,
      score_photo:         n ? Math.round((rev!.photo    / n) * 10) / 10 : null,
      score_crowding:      n ? Math.round((rev!.crowding / n) * 10) / 10 : null,
    };
  });
}

// ── ホームページ用：サーバーサイドで直接呼び出し可能 ──
export async function getTopSpotCards(sort: "score" | "reviews", limit: number): Promise<SpotCard[]> {
  const cards = await buildAllSpotCards();
  return cards
    .sort((a, b) => sort === "score"
      ? (b.overall_score ?? -1) - (a.overall_score ?? -1)
      : b.review_count - a.review_count)
    .slice(0, limit);
}
