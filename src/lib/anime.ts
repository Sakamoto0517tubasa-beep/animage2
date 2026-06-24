import { getSpotsForMarkers } from "@/lib/spots";
import { getSpotThumbnailUrl } from "@/lib/spot-thumbnails";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { SpotWithStats } from "@/types/supabase";
import { findImageByCoord, findImageByTitle as findImgByTitle } from "@/lib/spot-cards";

/** アニメタイトルを正規化（シーズン情報・特殊引用符を除去） */
function normalizeTitle(t: string): string {
  return t
    // Unicode 引用符を ASCII に統一
    .replace(/['']/g, "'")
    .replace(/[""]/g, '"')
    // シーズン表記を除去
    .replace(/\s*(SEASON|Season|season)\s*\S*/i, "")
    .replace(/\s*(第[0-9０-９]+期|S[0-9]+|\d+(nd|rd|th)\s*Season)\s*.*/i, "")
    .trim();
}


export type AnimeEntry = {
  title: string;
  spotCount: number;
  thumbnail: string | null;
  topScore: number | null;
};

export async function getAnimeList(): Promise<AnimeEntry[]> {
  // getSpotsForMarkers() は thumbnail_fallback_url を座標ルックアップ済みで返す
  const spots = await getSpotsForMarkers();
  const map = new Map<string, { count: number; thumbnail: string | null; rawTitle: string }>();

  for (const spot of spots) {
    const rawTitles = spot.anime_title.split(" / ");
    for (const raw of rawTitles) {
      const t = raw.trim();
      if (!t) continue;
      // アニメリストのキーは正規化タイトル（句点 + シーズン除去）
      const key = normalizeTitle(t).replace(/。$/, "");
      if (!key) continue;

      if (!map.has(key)) {
        map.set(key, { count: 0, thumbnail: null, rawTitle: t });
      }
      const entry = map.get(key)!;
      entry.count++;

      if (!entry.thumbnail) {
        // ① getSpotsForMarkers() が既に計算した座標ベース画像を優先使用
        const coordImg = spot.thumbnail_fallback_url;
        if (coordImg) {
          entry.thumbnail = coordImg;
        } else {
          // ② byTitle ルックアップ（正規化マッチング）
          const titleImg = findImgByTitle(t);
          if (titleImg) entry.thumbnail = titleImg;
        }
      }
    }
  }

  return Array.from(map.entries())
    .map(([key, { count, thumbnail }]) => ({
      title: key,
      spotCount: count,
      thumbnail,
      topScore: null,
    }))
    .sort((a, b) => b.spotCount - a.spotCount);
}

export async function getSpotsByAnime(title: string): Promise<SpotWithStats[]> {
  const supabase = await createServerSupabaseClient();

  // 句点あり / なし両方を検索できるよう正規化
  const normalized = normalizeTitle(title).replace(/。$/, "");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from("spots")
    .select("id,anime_title,location_name,lat,lng,address,description,city,thumbnail_url,created_at,train_minutes")
    .ilike("anime_title", `%${normalized}%`)
    .order("id")
    .limit(1000);

  if (error || !data?.length) return [];

  return data
    .filter((s: { anime_title: string }) => {
      const spotTitles = s.anime_title
        .split(" / ")
        .map((t: string) => normalizeTitle(t).replace(/。$/, ""));
      return spotTitles.includes(normalized);
    })
    .map((s: {
      id: string; anime_title: string; location_name: string;
      lat: number; lng: number; address: string; description: string;
      city: string; thumbnail_url: string | null; created_at: string;
      train_minutes: number | null;
    }) => {
      const animeImg =
        findImageByCoord(s.lat, s.lng) ?? findImgByTitle(s.anime_title);
      return {
        ...s,
        description: s.description ?? "",
        overall_score: null,
        review_count: 0,
        score_reenactment: null,
        score_accessibility: null,
        score_satisfaction: null,
        score_photo: null,
        thumbnail_fallback_url: animeImg,
        thumbnail_url: animeImg ?? getSpotThumbnailUrl(s.lat, s.lng, null),
      } as SpotWithStats;
    });
}
