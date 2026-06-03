import { type NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase";
import { SEED_SPOTS } from "@/data/seed-spots";

export type RecommendRequest = {
  favoriteAnime: string[];
  maxTravelMinutes: number | null;
  priorities: string[];          // "reenactment" | "accessibility" | "photo" | "uncrowded"
  prefecture: string | null;
  freeText: string;
};

export type RecommendedSpot = {
  id: string;
  location_name: string;
  anime_title: string;
  city: string;
  train_minutes: number | null;
  overall_score: number | null;
  score_reenactment: number | null;
  score_accessibility: number | null;
  score_photo: number | null;
  score_crowding: number | null;
  review_count: number;
  thumbnail_url: string | null;
  reason: string;
};

// 都道府県推定
function inferCity(lat: number, lng: number): string {
  if (lat >= 35.5 && lat < 35.9 && lng >= 138.9 && lng < 139.9) return "東京";
  if (lat >= 35.1 && lat < 35.7 && lng >= 138.9 && lng < 139.8) return "神奈川";
  if (lat >= 34.9 && lat < 36.1 && lng >= 139.7 && lng < 141.0) return "千葉";
  if (lat >= 35.7 && lat < 36.3 && lng >= 138.7 && lng < 139.9) return "埼玉";
  if (lat >= 33.8 && lat < 34.4 && lng >= 133.4 && lng < 134.6) return "香川";
  if (lat >= 34.3 && lat < 34.9 && lng >= 135.1 && lng < 135.8) return "大阪";
  if (lat >= 34.7 && lat < 35.9 && lng >= 134.9 && lng < 135.9) return "京都";
  if (lat >= 41.4 && lng >= 139.4) return "北海道";
  if (lat >= 38.2 && lat < 39.0 && lng >= 140.5 && lng < 141.5) return "宮城";
  if (lat >= 36.1 && lat < 37.1 && lng >= 136.1 && lng < 137.4) return "石川";
  if (lat >= 34.5 && lat < 35.4 && lng >= 136.5 && lng < 137.9) return "愛知";
  if (lat >= 34.3 && lat < 35.7 && lng >= 134.2 && lng < 135.5) return "兵庫";
  if (lat >= 34.5 && lat < 35.5 && lng >= 133.2 && lng < 134.6) return "岡山";
  if (lat >= 33.1 && lat < 34.3 && lng >= 130.1 && lng < 131.3) return "福岡";
  if (lat >= 28 && lat < 32) return "沖縄";
  return "その他";
}

// 推薦理由を自動生成
function buildReason(spot: {
  anime_title: string;
  location_name: string;
  overall_score: number | null;
  score_reenactment: number | null;
  score_accessibility: number | null;
  score_photo: number | null;
  score_crowding: number | null;
  train_minutes: number | null;
  review_count: number;
}, priorities: string[], favoriteAnime: string[]): string {
  const parts: string[] = [];

  const isMatchAnime = favoriteAnime.some(a =>
    spot.anime_title.toLowerCase().includes(a.toLowerCase()) ||
    a.toLowerCase().includes(spot.anime_title.toLowerCase())
  );

  if (isMatchAnime) {
    parts.push(`好きなアニメ「${spot.anime_title}」の聖地です。`);
  }

  if (priorities.includes("reenactment") && spot.score_reenactment != null && spot.score_reenactment >= 7) {
    parts.push(`再現度スコア${spot.score_reenactment.toFixed(1)}と高く、アニメのシーンをそのまま体感できます。`);
  }
  if (priorities.includes("accessibility") && spot.score_accessibility != null && spot.score_accessibility >= 7) {
    parts.push(`アクセススコア${spot.score_accessibility.toFixed(1)}で交通の便が良く、${spot.train_minutes != null ? `最寄り駅から${spot.train_minutes}分と` : ""}訪れやすいスポットです。`);
  }
  if (priorities.includes("photo") && spot.score_photo != null && spot.score_photo >= 7) {
    parts.push(`写真映えスコア${spot.score_photo.toFixed(1)}と優秀で、インスタ映えする写真が撮れます。`);
  }
  if (priorities.includes("uncrowded") && spot.score_crowding != null && spot.score_crowding <= 5) {
    parts.push(`混雑が少なく、落ち着いてアニメの世界観に浸れる穴場スポットです。`);
  }

  if (spot.overall_score != null && spot.overall_score >= 8) {
    parts.push(`総合スコア${spot.overall_score.toFixed(1)}と非常に評価が高いです。`);
  } else if (spot.overall_score != null && spot.overall_score >= 6) {
    parts.push(`総合スコア${spot.overall_score.toFixed(1)}の人気スポットです。`);
  }

  if (spot.review_count >= 5) {
    parts.push(`${spot.review_count}件のレビューがあり、多くの巡礼者に訪れられています。`);
  } else if (spot.review_count === 0) {
    parts.push(`まだレビューが少ない穴場スポットで、新鮮な発見があるかもしれません。`);
  }

  if (parts.length === 0) {
    parts.push(`「${spot.anime_title}」の聖地として知られる${spot.location_name}です。あなたの希望条件に合った一か所です。`);
  }

  return parts.join(" ");
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as RecommendRequest;
  const { favoriteAnime, maxTravelMinutes, priorities, prefecture, freeText } = body;

  // ── スポット＋レビュー集計 ──
  type SpotData = {
    id: string; anime_title: string; location_name: string;
    city: string; train_minutes: number | null;
    overall_score: number | null; score_reenactment: number | null;
    score_accessibility: number | null; score_photo: number | null;
    score_crowding: number | null; review_count: number; thumbnail_url: string | null;
  };

  let spots: SpotData[] = [];

  if (isSupabaseConfigured()) {
    const supabase = createAdminSupabaseClient();

    const [{ data: rawSpots }, { data: rawReviews }] = await Promise.all([
      supabase.from("spots").select("id,anime_title,location_name,lat,lng,train_minutes"),
      supabase.from("reviews").select("spot_id,score_overall,score_reenactment,score_accessibility,score_photo,score_crowding"),
    ]);

    const revMap = new Map<string, { count: number; overall: number; reenact: number; access: number; photo: number; crowding: number }>();
    for (const r of (rawReviews ?? []) as any[]) {
      const cur = revMap.get(r.spot_id) ?? { count: 0, overall: 0, reenact: 0, access: 0, photo: 0, crowding: 0 };
      cur.count++;
      cur.overall  += r.score_overall       ?? 0;
      cur.reenact  += r.score_reenactment   ?? 0;
      cur.access   += r.score_accessibility ?? 0;
      cur.photo    += r.score_photo         ?? 0;
      cur.crowding += r.score_crowding      ?? 0;
      revMap.set(r.spot_id, cur);
    }

    spots = ((rawSpots ?? []) as any[]).map((s: any) => {
      const rev = revMap.get(s.id);
      const n = rev?.count ?? 0;
      return {
        id: s.id,
        anime_title: s.anime_title,
        location_name: s.location_name,
        city: inferCity(s.lat, s.lng),
        train_minutes: s.train_minutes,
        overall_score:       n ? Math.round((rev!.overall  / n) * 10) / 10 : null,
        score_reenactment:   n ? Math.round((rev!.reenact  / n) * 10) / 10 : null,
        score_accessibility: n ? Math.round((rev!.access   / n) * 10) / 10 : null,
        score_photo:         n ? Math.round((rev!.photo    / n) * 10) / 10 : null,
        score_crowding:      n ? Math.round((rev!.crowding / n) * 10) / 10 : null,
        review_count: n,
        thumbnail_url: null,
      };
    });
  } else {
    spots = (SEED_SPOTS as any[]).map((s: any) => ({
      id: s.id, anime_title: s.anime_title, location_name: s.location_name,
      city: s.city ?? "東京", train_minutes: s.train_minutes ?? null,
      overall_score: null, score_reenactment: null, score_accessibility: null,
      score_photo: null, score_crowding: null, review_count: 0, thumbnail_url: null,
    }));
  }

  // ── フィルタ ──
  let filtered = spots;
  if (maxTravelMinutes != null && maxTravelMinutes > 0) {
    filtered = filtered.filter(s => s.train_minutes == null || s.train_minutes <= maxTravelMinutes);
  }
  if (prefecture) {
    filtered = filtered.filter(s => s.city === prefecture);
  }

  // 自由記述からキーワード抽出（簡易）
  const freeKeywords = freeText.toLowerCase().split(/[\s、。,]+/).filter(Boolean);

  // ── スコアリング ──
  const WEIGHT = {
    animeMatch:    30,   // 好きなアニメ一致
    keywordMatch:  10,   // 自由記述キーワード一致
    overall:        5,   // 総合スコア
    reenactment:   10,   // 再現度
    accessibility: 10,   // アクセス
    photo:         10,   // 写真映え
    uncrowded:     10,   // 混雑少ない（低スコアが良い）
    hasReview:      5,   // レビューあり
  };

  const scored = filtered.map(spot => {
    let score = 0;

    // アニメ一致ボーナス
    const animeMatch = favoriteAnime.some(a =>
      spot.anime_title.toLowerCase().includes(a.toLowerCase()) ||
      a.toLowerCase().includes(spot.anime_title.toLowerCase())
    );
    if (animeMatch) score += WEIGHT.animeMatch;

    // 自由記述キーワード一致
    const text = `${spot.anime_title} ${spot.location_name} ${spot.city}`.toLowerCase();
    for (const kw of freeKeywords) {
      if (kw.length >= 2 && text.includes(kw)) score += WEIGHT.keywordMatch;
    }

    // 重視ポイントに応じた加点
    if (priorities.includes("reenactment") && spot.score_reenactment != null) {
      score += (spot.score_reenactment / 10) * WEIGHT.reenactment;
    }
    if (priorities.includes("accessibility") && spot.score_accessibility != null) {
      score += (spot.score_accessibility / 10) * WEIGHT.accessibility;
    }
    if (priorities.includes("photo") && spot.score_photo != null) {
      score += (spot.score_photo / 10) * WEIGHT.photo;
    }
    if (priorities.includes("uncrowded") && spot.score_crowding != null) {
      // 混雑度は低いほど良い（スコア10=超混雑 → 0点、スコア0=空いてる → 満点）
      score += ((10 - spot.score_crowding) / 10) * WEIGHT.uncrowded;
    }

    // 総合スコア加点
    if (spot.overall_score != null) {
      score += (spot.overall_score / 10) * WEIGHT.overall;
    }

    // レビューあり加点
    if (spot.review_count > 0) score += WEIGHT.hasReview;

    // 優先度未設定時は総合スコアを重く
    if (priorities.length === 0 && spot.overall_score != null) {
      score += spot.overall_score * 2;
    }

    return { spot, score };
  });

  // スコア降順ソート → 上位10件
  scored.sort((a, b) => b.score - a.score);
  const top10 = scored.slice(0, 10);

  const results: RecommendedSpot[] = top10.map(({ spot }) => ({
    ...spot,
    reason: buildReason(spot, priorities, favoriteAnime),
  }));

  return NextResponse.json({ spots: results });
}
