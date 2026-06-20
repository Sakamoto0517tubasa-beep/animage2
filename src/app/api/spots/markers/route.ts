import { NextResponse } from "next/server";
import { getSpotsForMarkers } from "@/lib/spots";

export const dynamic = "force-dynamic";

export async function GET() {
  const markers = await getSpotsForMarkers();
  // 地図の点・検索・フィルタに必要な最小フィールドだけ返す
  // （サムネURL・スコアはクリック時に /api/spots/[id] で取得するので除外）
  const slim = markers.map((m) => ({
    id: m.id,
    lat: m.lat,
    lng: m.lng,
    location_name: m.location_name,
    anime_title: m.anime_title,
    city: m.city,
    train_minutes: m.train_minutes,
  }));
  return NextResponse.json(slim, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
  });
}
