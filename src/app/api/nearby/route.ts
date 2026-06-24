import { type NextRequest, NextResponse } from "next/server";

export type NearbyPlace = {
  place_id: string;
  name: string;
  vicinity: string;           // 住所
  rating: number | null;
  user_ratings_total: number;
  price_level: number | null; // 1〜4（飲食店）
  open_now: boolean | null;
  photo_ref: string | null;   // Place Photo API の reference
  types: string[];
  lat: number;
  lng: number;
};

const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const lat      = searchParams.get("lat");
  const lng      = searchParams.get("lng");
  const category = searchParams.get("category") ?? "food"; // "food" | "sightseeing"

  if (!lat || !lng || !GOOGLE_MAPS_KEY) {
    return NextResponse.json([], { status: 400 });
  }

  // カテゴリ別タイプマッピング
  const typeMap: Record<string, string> = {
    food:        "restaurant",
    cafe:        "cafe",
    convenience: "convenience_store",
    lodging:     "lodging",
    sightseeing: "tourist_attraction",
  };
  const type = typeMap[category] ?? "restaurant";

  // radius 固定だと田舎で何も出ないため、距離が近い順に取得（最寄りを必ず拾う）
  const url =
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json` +
    `?location=${lat},${lng}` +
    `&rankby=distance` +
    `&type=${type}` +
    `&language=ja` +
    `&key=${GOOGLE_MAPS_KEY}`;

  try {
    const res  = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json() as {
      status: string;
      results: {
        place_id: string;
        name: string;
        vicinity: string;
        rating?: number;
        user_ratings_total?: number;
        price_level?: number;
        opening_hours?: { open_now: boolean };
        photos?: { photo_reference: string }[];
        types: string[];
        geometry: { location: { lat: number; lng: number } };
      }[];
    };

    console.log("Places API status:", data.status, "results:", data.results?.length ?? 0);
    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      console.error("Places API error:", data.status, JSON.stringify(data).slice(0, 300));
      return NextResponse.json([]);
    }

    const oLat = parseFloat(lat);
    const oLng = parseFloat(lng);
    const dist2 = (la: number, ln: number) =>
      (la - oLat) ** 2 + ((ln - oLng) * Math.cos((oLat * Math.PI) / 180)) ** 2;

    const places: NearbyPlace[] = (data.results ?? [])
      .map((p) => ({
        place_id:           p.place_id,
        name:               p.name,
        vicinity:           p.vicinity,
        rating:             p.rating ?? null,
        user_ratings_total: p.user_ratings_total ?? 0,
        price_level:        p.price_level ?? null,
        open_now:           p.opening_hours?.open_now ?? null,
        photo_ref:          p.photos?.[0]?.photo_reference ?? null,
        types:              p.types,
        lat:                p.geometry.location.lat,
        lng:                p.geometry.location.lng,
      }))
      // 近い順にソート
      .sort((a, b) => dist2(a.lat, a.lng) - dist2(b.lat, b.lng))
      .slice(0, 15);

    return NextResponse.json(places, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
    });
  } catch (e) {
    console.error("Nearby fetch error:", e);
    return NextResponse.json([]);
  }
}
