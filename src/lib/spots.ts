import { SEED_SPOTS, SEED_SPOT_BY_ID } from "@/data/seed-spots";
import { getSpotThumbnailUrl } from "@/lib/spot-thumbnails";
import { getReviewAggregatesBySpotIds, type ReviewAggregate } from "@/lib/reviews";
import { isSupabaseConfigured } from "@/lib/supabase";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { SpotWithStats } from "@/types/supabase";
import { findImageByCoord, findImageByTitle } from "@/lib/spot-cards";

export { getSpotSatelliteThumbnailUrl, getSpotStreetViewUrl, getSpotThumbnailUrl } from "@/lib/spot-thumbnails";

function applyThumbnail(spot: SpotWithStats): SpotWithStats {
  const animeImage =
    findImageByCoord(spot.lat, spot.lng) ??
    findImageByTitle(spot.anime_title);

  return {
    ...spot,
    thumbnail_fallback_url: animeImage,
    thumbnail_url: getSpotThumbnailUrl(spot.lat, spot.lng, animeImage),
  };
}

function applyThumbnails(spots: SpotWithStats[]): SpotWithStats[] {
  return spots.map(applyThumbnail);
}

function filterSpots(spots: SpotWithStats[], query?: string): SpotWithStats[] {
  if (!query?.trim()) return spots;

  const normalized = query.trim().toLowerCase();

  return spots.filter(
    (spot) =>
      spot.anime_title.toLowerCase().includes(normalized) ||
      spot.location_name.toLowerCase().includes(normalized) ||
      spot.address.toLowerCase().includes(normalized) ||
      spot.description.toLowerCase().includes(normalized),
  );
}

function emptyReviewStats(): ReviewAggregate {
  return {
    review_count: 0,
    overall_score: null,
    score_reenactment: null,
    score_accessibility: null,
    score_satisfaction: null,
    score_photo: null,
    score_crowding: null,
  };
}

function applyReviewStats(
  spot: SpotWithStats,
  aggregate?: ReviewAggregate,
): SpotWithStats {
  const stats = aggregate ?? emptyReviewStats();

  return {
    ...spot,
    overall_score: stats.overall_score,
    review_count: stats.review_count,
    score_reenactment: stats.score_reenactment,
    score_accessibility: stats.score_accessibility,
    score_satisfaction: stats.score_satisfaction,
    score_photo: stats.score_photo,
  };
}

async function enrichSpotsWithReviews(spots: SpotWithStats[]): Promise<SpotWithStats[]> {
  const aggregates = await getReviewAggregatesBySpotIds(spots.map((spot) => spot.id));

  return spots.map((spot) => applyReviewStats(spot, aggregates.get(spot.id)));
}

async function enrichSpots(spots: SpotWithStats[]): Promise<SpotWithStats[]> {
  return applyThumbnails(spots);
}

async function enrichSpotsWithReviewsAndThumbnails(spots: SpotWithStats[]): Promise<SpotWithStats[]> {
  return applyThumbnails(await enrichSpotsWithReviews(spots));
}

let _spotsCache: SpotWithStats[] | null = null;
let _spotsCacheTime = 0;
const SPOTS_CACHE_TTL = 60 * 60 * 1000;

// ── Lightweight marker cache (for map — all spots, no review enrichment) ──
export type SpotMarker = {
  id: string;
  lat: number;
  lng: number;
  location_name: string;
  anime_title: string;
  city: string;
  train_minutes: number | null;
  thumbnail_url: string | null;
  thumbnail_fallback_url: string | null;
  overall_score: number | null;
  review_count: number;
};

let _markersCache: SpotMarker[] | null = null;
let _markersCacheTime = 0;

export async function getSpotsForMarkers(): Promise<SpotMarker[]> {
  if (_markersCache && Date.now() - _markersCacheTime < SPOTS_CACHE_TTL) {
    return _markersCache;
  }

  const supabase = await createServerSupabaseClient();
  const BATCH_SIZE = 1000;
  const CONCURRENCY = 5; // 5並列で取得
  const TOTAL_ESTIMATE = 20000; // 最大件数の見積もり

  // 全オフセットを先に生成して並列フェッチ
  const offsets = Array.from(
    { length: Math.ceil(TOTAL_ESTIMATE / BATCH_SIZE) },
    (_, i) => i * BATCH_SIZE,
  );

  const rawAll: Array<{ id: string; lat: number; lng: number; location_name: string; anime_title: string; city: string; train_minutes: number | null; thumbnail_url: string | null }> = [];

  // CONCURRENCY件ずつ並列実行
  for (let i = 0; i < offsets.length; i += CONCURRENCY) {
    const wave = offsets.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      wave.map((offset) =>
        supabase
          .from("spots")
          .select("id,lat,lng,location_name,anime_title,city,train_minutes,thumbnail_url")
          .order("id")
          .range(offset, offset + BATCH_SIZE - 1),
      ),
    );

    let gotAny = false;
    for (const { data, error } of results) {
      if (error || !data?.length) continue;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rawAll.push(...(data as any));
      gotAny = true;
    }

    // 全バッチが空 → DBの末尾に到達
    if (!gotAny) break;

    // いずれかのバッチが BATCH_SIZE 未満 → 最後のウェーブ
    const isLastWave = results.some(
      ({ data }) => data && data.length > 0 && data.length < BATCH_SIZE,
    );
    if (isLastWave) break;
  }

  const all: SpotMarker[] = rawAll.map((s) => {
    const seed = SEED_SPOT_BY_ID.get(s.id);
    const lat = seed?.lat ?? s.lat;
    const lng = seed?.lng ?? s.lng;
    const animeImage =
      findImageByCoord(lat, lng) ??
      findImageByTitle(seed?.anime_title ?? s.anime_title);

    return {
      id: s.id,
      lat,
      lng,
      location_name: seed?.location_name ?? s.location_name,
      anime_title: seed?.anime_title ?? s.anime_title,
      city: inferPrefecture(lat, lng),
      train_minutes: seed?.train_minutes ?? s.train_minutes ?? null,
      thumbnail_url: getSpotThumbnailUrl(lat, lng, animeImage),
      thumbnail_fallback_url: animeImage,
      overall_score: null,
      review_count: 0,
    };
  });

  if (!all.length) {
    // Fallback to seed data
    return SEED_SPOTS.map((s) => ({
      id: s.id,
      lat: s.lat,
      lng: s.lng,
      location_name: s.location_name,
      anime_title: s.anime_title,
      city: inferPrefecture(s.lat, s.lng),
      train_minutes: s.train_minutes ?? null,
      thumbnail_url: s.thumbnail_url ?? null,
      thumbnail_fallback_url: s.thumbnail_fallback_url ?? null,
      overall_score: null,
      review_count: 0,
    }));
  }

  _markersCache = all;
  _markersCacheTime = Date.now();
  return all;
}

export function invalidateSpotsCache() {
  _spotsCache = null;
  _spotsCacheTime = 0;
}

async function fetchSpotsFromSupabase(): Promise<SpotWithStats[]> {
  if (_spotsCache && Date.now() - _spotsCacheTime < SPOTS_CACHE_TTL) {
    return _spotsCache;
  }

  const supabase = await createServerSupabaseClient();

  const BATCH_SIZE = 1000;
  const CONCURRENCY = 2;
  const MAX_SPOTS = 2000;
  const all: SpotWithStats[] = [];
  let offset = 0;
  let spotsError = null;

  for (;;) {
    const wave = await Promise.all(
      Array.from({ length: CONCURRENCY }, (_, i) =>
        supabase
          .from("spots")
          .select("id,anime_title,location_name,lat,lng,address,description,city,thumbnail_url,created_at,train_minutes")
          .order("id")
          .range(offset + i * BATCH_SIZE, offset + (i + 1) * BATCH_SIZE - 1)
      )
    );
    const err = wave.find(r => r.error)?.error;
    if (err) { spotsError = err; break; }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newSpots = wave.flatMap(r => (r.data ?? []) as any) as SpotWithStats[];
    all.push(...newSpots);
    if (newSpots.length < BATCH_SIZE * CONCURRENCY || all.length >= MAX_SPOTS) break;
    offset += BATCH_SIZE * CONCURRENCY;
  }

  if (spotsError || !all.length) {
    return enrichSpots(SEED_SPOTS);
  }

  // Deduplicate by id (guard against DB duplicates)
  const seen = new Set<string>();
  const unique = all.filter((s) => !seen.has(s.id) && seen.add(s.id));

  const seedById = SEED_SPOT_BY_ID;

  const baseSpots = unique.map((spot) => {
    const seed = seedById.get(spot.id);
    return {
      ...spot,
      anime_title: seed?.anime_title ?? spot.anime_title,
      location_name: seed?.location_name ?? spot.location_name,
      overall_score: null,
      review_count: 0,
      address: seed?.address ?? spot.address,
      description: seed?.description ?? spot.description,
      lat: seed?.lat ?? spot.lat,
      lng: seed?.lng ?? spot.lng,
      thumbnail_url: seed?.thumbnail_url ?? spot.thumbnail_url ?? null,
      city: inferPrefecture(seed?.lat ?? spot.lat, seed?.lng ?? spot.lng),
      train_minutes: seed?.train_minutes ?? spot.train_minutes ?? null,
      score_reenactment: null,
      score_accessibility: null,
      score_satisfaction: null,
      score_photo: null,
    };
  });

  const result = await enrichSpotsWithReviewsAndThumbnails(baseSpots);
  _spotsCache = result;
  _spotsCacheTime = Date.now();
  return result;
}

async function fetchSpotByIdFromSupabase(id: string): Promise<SpotWithStats | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("spots")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  const seed = SEED_SPOT_BY_ID.get(id);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d = data as any;
  const base: SpotWithStats = {
    ...d,
    anime_title: seed?.anime_title ?? d.anime_title,
    location_name: seed?.location_name ?? d.location_name,
    overall_score: null,
    review_count: 0,
    address: seed?.address ?? d.address,
    description: seed?.description ?? d.description,
    lat: seed?.lat ?? d.lat,
    lng: seed?.lng ?? d.lng,
    thumbnail_url: seed?.thumbnail_url ?? d.thumbnail_url ?? null,
    city: seed?.city ?? inferPrefecture(seed?.lat ?? d.lat, seed?.lng ?? d.lng),
    train_minutes: seed?.train_minutes ?? null,
    score_reenactment: null,
    score_accessibility: null,
    score_satisfaction: null,
    score_photo: null,
  };
  const [enriched] = await enrichSpotsWithReviewsAndThumbnails([base]);
  return enriched;
}

function inferPrefecture(lat: number, lng: number): string {
  if (lat < 24 || lat > 46 || lng < 122 || lng > 154) return "東京";
  if (lat < 28) return "沖縄";
  if (lat >= 41.4 && lng >= 139.4) return "北海道";
  if (lat < 32.2 && lng >= 129.3) return "鹿児島";
  if (lat >= 40.2 && lat < 41.6 && lng >= 139.4 && lng < 141.7) return "青森";
  if (lat >= 38.7 && lat < 40.5 && lng >= 140.5 && lng < 142.1) return "岩手";
  if (lat >= 38.8 && lat < 40.6 && lng >= 139.7 && lng < 141.0) return "秋田";
  if (lat >= 37.8 && lat < 39.0 && lng >= 140.2 && lng < 141.7) return "宮城";
  if (lat >= 37.7 && lat < 39.0 && lng >= 139.4 && lng < 140.8) return "山形";
  if (lat >= 36.8 && lat < 37.9 && lng >= 139.2 && lng < 141.1) return "福島";
  if (lat >= 36.7 && lat < 38.7 && lng >= 137.5 && lng < 139.8) return "新潟";
  if (lat >= 35.7 && lat < 36.8 && lng >= 139.7 && lng < 140.9) return "茨城";
  if (lat >= 36.2 && lat < 37.2 && lng >= 139.3 && lng < 140.4) return "栃木";
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
  if (lat >= 34.8 && lat < 35.7 && lng >= 135.7 && lng < 136.6) return "滋賀";
  if (lat >= 34.7 && lat < 35.9 && lng >= 134.9 && lng < 135.9) return "京都";
  if (lat >= 33.9 && lat < 34.9 && lng >= 135.6 && lng < 136.3) return "奈良";
  if (lat >= 34.3 && lat < 34.9 && lng >= 135.1 && lng < 135.8) return "大阪";
  if (lat >= 33.4 && lat < 34.5 && lng >= 135.0 && lng < 136.2) return "和歌山";
  if (lat >= 34.3 && lat < 35.7 && lng >= 134.2 && lng < 135.5) return "兵庫";
  if (lat >= 35.0 && lat < 35.7 && lng >= 133.0 && lng < 134.6) return "鳥取";
  if (lat >= 34.5 && lat < 35.5 && lng >= 133.2 && lng < 134.6) return "岡山";
  if (lat >= 34.3 && lat < 35.7 && lng >= 131.7 && lng < 133.4) return "島根";
  if (lat >= 33.8 && lat < 35.2 && lng >= 132.0 && lng < 133.5) return "広島";
  if (lat >= 33.7 && lat < 34.8 && lng >= 130.6 && lng < 132.3) return "山口";
  if (lat >= 33.5 && lat < 34.3 && lng >= 133.8 && lng < 135.0) return "徳島";
  if (lat >= 33.8 && lat < 34.4 && lng >= 133.4 && lng < 134.6) return "香川";
  if (lat >= 33.0 && lat < 34.3 && lng >= 132.0 && lng < 133.7) return "愛媛";
  if (lat >= 32.7 && lat < 34.0 && lng >= 132.5 && lng < 134.4) return "高知";
  if (lat >= 33.1 && lat < 34.3 && lng >= 130.1 && lng < 131.3) return "福岡";
  if (lat >= 32.8 && lat < 33.7 && lng >= 129.6 && lng < 130.6) return "佐賀";
  if (lat >= 32.0 && lat < 34.8 && lng >= 128.5 && lng < 130.5) return "長崎";
  if (lat >= 32.0 && lat < 33.2 && lng >= 130.0 && lng < 131.5) return "熊本";
  if (lat >= 32.7 && lat < 33.9 && lng >= 130.9 && lng < 132.2) return "大分";
  if (lat >= 31.3 && lat < 32.8 && lng >= 130.6 && lng < 132.0) return "宮崎";
  return "東京";
}

/** 実際のスポット総数を取得（COUNT クエリのみ・軽量） */
export async function getSpotCount(): Promise<number> {
  if (!isSupabaseConfigured()) return SEED_SPOTS.length;
  // マーカーキャッシュが既にある場合はそれを使う
  if (_markersCache) return _markersCache.length;
  const supabase = await createServerSupabaseClient();
  const { count } = await supabase
    .from("spots")
    .select("*", { count: "exact", head: true });
  return count ?? 0;
}

export async function getSpots(query?: string): Promise<SpotWithStats[]> {
  const spots = isSupabaseConfigured()
    ? await fetchSpotsFromSupabase()
    : await enrichSpots(SEED_SPOTS);

  return filterSpots(spots, query);
}

export async function getSpotById(id: string): Promise<SpotWithStats | null> {
  if (!isSupabaseConfigured()) {
    const spots = await enrichSpotsWithReviewsAndThumbnails(SEED_SPOTS);
    return spots.find((s) => s.id === id) ?? null;
  }
  return fetchSpotByIdFromSupabase(id);
}

export async function getRecommendedSpots(limit = 6): Promise<SpotWithStats[]> {
  if (!isSupabaseConfigured()) {
    const spots = await enrichSpotsWithReviewsAndThumbnails(SEED_SPOTS);
    return spots.slice(0, limit);
  }
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("spots")
    .select("*")
    .order("review_count", { ascending: false })
    .limit(limit * 3);
  if (!data?.length) return [];
  const base = data.map((spot) => {
    const seed = SEED_SPOT_BY_ID.get(spot.id);
    return {
      ...spot,
      overall_score: null,
      review_count: 0,
      train_minutes: seed?.train_minutes ?? null,
      score_reenactment: null,
      score_accessibility: null,
      score_satisfaction: null,
      score_photo: null,
    } as SpotWithStats;
  });
  const enriched = await enrichSpotsWithReviewsAndThumbnails(base);
  return enriched.sort((a, b) => b.review_count - a.review_count).slice(0, limit);
}
