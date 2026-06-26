import { type NextRequest, NextResponse } from "next/server";
import { getSpotsForMarkers } from "@/lib/spots";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "0", 10) || 0, 500);

  const markers = await getSpotsForMarkers();

  let result = markers;
  if (q) {
    result = markers.filter(
      (m) =>
        m.location_name.toLowerCase().includes(q) ||
        m.anime_title.toLowerCase().includes(q) ||
        false,
    );
  }
  if (limit > 0) result = result.slice(0, limit);

  const slim = result.map((m) => ({
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
