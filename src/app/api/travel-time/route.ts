import { type NextRequest, NextResponse } from "next/server";

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

export type TravelTime = {
  transit: { duration: string; minutes: number } | null;
  driving: { duration: string; minutes: number } | null;
  walking: { duration: string; minutes: number } | null;
  distanceKm: number | null;
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const fromLat = searchParams.get("fromLat");
  const fromLng = searchParams.get("fromLng");
  const toLat   = searchParams.get("toLat");
  const toLng   = searchParams.get("toLng");

  if (!fromLat || !fromLng || !toLat || !toLng || !KEY) {
    return NextResponse.json({ transit: null, driving: null, walking: null, distanceKm: null });
  }

  const origins      = `${fromLat},${fromLng}`;
  const destinations = `${toLat},${toLng}`;
  const base = "https://maps.googleapis.com/maps/api/distancematrix/json";

  async function fetchMode(mode: string) {
    const url = `${base}?origins=${origins}&destinations=${destinations}&mode=${mode}&language=ja&key=${KEY}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json() as {
      rows?: { elements?: { status: string; duration?: { text: string; value: number }; distance?: { value: number } }[] }[];
    };
    const el = data.rows?.[0]?.elements?.[0];
    if (!el || el.status !== "OK" || !el.duration) return null;
    return {
      duration: el.duration.text,
      minutes:  Math.round(el.duration.value / 60),
      distanceM: el.distance?.value ?? null,
    };
  }

  const [transit, driving, walking] = await Promise.all([
    fetchMode("transit").catch(() => null),
    fetchMode("driving").catch(() => null),
    fetchMode("walking").catch(() => null),
  ]);

  const distanceKm = transit?.distanceM ?? driving?.distanceM ?? walking?.distanceM ?? null;

  return NextResponse.json(
    {
      transit: transit ? { duration: transit.duration, minutes: transit.minutes } : null,
      driving: driving ? { duration: driving.duration, minutes: driving.minutes } : null,
      walking: walking ? { duration: walking.duration, minutes: walking.minutes } : null,
      distanceKm: distanceKm ? Math.round(distanceKm / 100) / 10 : null,
    } satisfies TravelTime,
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" } },
  );
}
