import { type NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { findImageByCoord, findImageByTitle, inferPrefecture } from "@/lib/spot-cards";

export const dynamic = "force-dynamic";

type RawSpot = {
  id: string;
  lat: number;
  lng: number;
  location_name: string;
  anime_title: string;
  city: string | null;
  train_minutes: number | null;
};

let _cache: RawSpot[] | null = null;
let _cacheTime = 0;
const CACHE_TTL = 3600_000;

async function getAllSpots(): Promise<RawSpot[]> {
  if (_cache && Date.now() - _cacheTime < CACHE_TTL) return _cache;

  const supabase = createAdminSupabaseClient();
  const BATCH = 1000;
  const rows: RawSpot[] = [];

  for (let offset = 0; ; offset += BATCH) {
    const { data, error } = await supabase
      .from("spots")
      .select("id,lat,lng,location_name,anime_title,city,train_minutes")
      .order("id")
      .range(offset, offset + BATCH - 1);
    if (error || !data?.length) break;
    rows.push(...(data as RawSpot[]));
    if (data.length < BATCH) break;
  }

  _cache = rows;
  _cacheTime = Date.now();
  return rows;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "0", 10) || 0, 500);

  const spots = await getAllSpots();

  let result = spots;
  if (q) {
    result = spots.filter(
      (m) =>
        m.location_name.toLowerCase().includes(q) ||
        m.anime_title.toLowerCase().includes(q),
    );
  }
  if (limit > 0) result = result.slice(0, limit);

  const slim = result.map((m) => ({
    id: m.id,
    lat: m.lat,
    lng: m.lng,
    location_name: m.location_name,
    anime_title: m.anime_title,
    city: m.city ?? inferPrefecture(m.lat, m.lng),
    train_minutes: m.train_minutes,
    thumbnail_url: findImageByCoord(m.lat, m.lng) ?? findImageByTitle(m.anime_title) ?? null,
    thumbnail_fallback_url: findImageByCoord(m.lat, m.lng) ?? findImageByTitle(m.anime_title) ?? null,
    overall_score: null,
    review_count: 0,
  }));

  return NextResponse.json(slim, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
  });
}
