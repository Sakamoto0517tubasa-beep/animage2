/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextRequest, NextResponse } from "next/server";
import { SpotCard, findImageByCoord, findImageByTitle, inferPrefecture } from "@/lib/spot-cards";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase";
import { SEED_SPOTS } from "@/data/seed-spots";

export type { SpotCard };

type RawSpot = { id: string; anime_title: string; location_name: string; lat: number; lng: number; train_minutes: number | null };
type RawReview = { spot_id: string; score_overall: number | null; score_reenactment: number | null; score_accessibility: number | null; score_photo: number | null; score_crowding: number | null };

let spotsCache: { data: RawSpot[]; at: number } | null = null;
const SPOTS_TTL = 3600_000;

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

let reviewsCache: { data: RawReview[]; at: number } | null = null;
const REVIEWS_TTL = 300_000;

async function getCachedReviewAggregates(): Promise<RawReview[]> {
  if (!isSupabaseConfigured()) return [];
  const now = Date.now();
  if (reviewsCache && now - reviewsCache.at < REVIEWS_TTL) return reviewsCache.data;
  const supabase = createAdminSupabaseClient();
  const allReviews: RawReview[] = [];
  const BATCH = 1000;
  for (let offset = 0; ; offset += BATCH) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from("reviews")
      .select("spot_id,score_overall,score_reenactment,score_accessibility,score_photo,score_crowding")
      .range(offset, offset + BATCH - 1);
    if (error || !data?.length) break;
    allReviews.push(...(data as RawReview[]));
    if (data.length < BATCH) break;
  }
  reviewsCache = { data: allReviews, at: now };
  return allReviews;
}

const PAGE_SIZE = 50;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q      = (searchParams.get("q") ?? "").trim().toLowerCase();
  const city   = searchParams.get("city") ?? "すべて";
  const sort   = searchParams.get("sort") ?? "score";
  const offset = Math.max(0, parseInt(searchParams.get("offset") ?? "0", 10));
  const idsParam = searchParams.get("ids");
  const filterIds = idsParam ? new Set(idsParam.split(",").map((s) => s.trim()).filter(Boolean)) : null;

  const [rawSpots, rawReviews] = await Promise.all([
    getCachedRawSpots(),
    getCachedReviewAggregates(),
  ]);

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

  const cards: SpotCard[] = baseSpots.map((s) => {
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

  const filtered = cards.filter((s) => {
    if (filterIds && !filterIds.has(s.id)) return false;
    if (city !== "すべて" && s.city !== city) return false;
    if (!q) return true;
    return s.location_name.toLowerCase().includes(q) || s.anime_title.toLowerCase().includes(q);
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "score")   return (b.overall_score ?? -1) - (a.overall_score ?? -1);
    if (sort === "reviews") return b.review_count - a.review_count;
    return a.location_name.localeCompare(b.location_name, "ja");
  });

  const limitParam = parseInt(searchParams.get("limit") ?? String(PAGE_SIZE), 10);
  const pageSize = Math.min(limitParam, 200);
  const page = sorted.slice(offset, offset + pageSize);

  return NextResponse.json(
    { spots: page, total: filtered.length, hasMore: offset + pageSize < sorted.length },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } },
  );
}
