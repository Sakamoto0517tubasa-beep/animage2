import { type NextRequest, NextResponse } from "next/server";

export type NearbyPlace = {
  place_id: string;
  name: string;
  vicinity: string;           // 住所
  rating: number | null;
  user_ratings_total: number;
  price_level: number | null; // 1〜4（飲食店）
  open_now: boolean | null;
  photo_ref: string | null;   // Place Photo API の reference（Google用）
  photo_url?: string | null;  // 直URL（ホットペッパー用）
  booking_url?: string | null;// 予約/詳細URL（ホットペッパー用・正式リンク）
  source?: "google" | "hotpepper";
  budget?: string | null;     // 予算目安（ホットペッパー用テキスト）
  types: string[];
  lat: number;
  lng: number;
};

const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
const RECRUIT_API_KEY = process.env.RECRUIT_API_KEY ?? "";

// バリューコマース アフィリエイト（sid/pid 設定時のみ有効化。未設定なら直リンク）
const VC_SID = process.env.VALUECOMMERCE_SID ?? "";
const VC_PID = process.env.VALUECOMMERCE_PID_HOTPEPPER ?? "";

// 店舗URLをアフィリエイトリンクで包む（MyLink形式）
function affiliateWrap(url: string): string {
  if (!VC_SID || !VC_PID) return url;
  return (
    `https://ck.jp.ap.valuecommerce.com/servlet/referral` +
    `?sid=${VC_SID}&pid=${VC_PID}&vc_url=${encodeURIComponent(url)}`
  );
}

function jsonWithCache(places: NearbyPlace[]) {
  return NextResponse.json(places, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
  });
}

// 距離二乗（緯度補正あり）
function makeDist2(oLat: number, oLng: number) {
  return (la: number, ln: number) =>
    (la - oLat) ** 2 + ((ln - oLng) * Math.cos((oLat * Math.PI) / 180)) ** 2;
}

// ── ホットペッパー グルメサーチAPI ──
async function fetchFromHotpepper(
  lat: string,
  lng: string,
  category: string,
): Promise<NearbyPlace[]> {
  // カフェタブはジャンル G014（カフェ・スイーツ）で絞り込み
  const genre = category === "cafe" ? "&genre=G014" : "";
  const url =
    `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/` +
    `?key=${RECRUIT_API_KEY}` +
    `&lat=${lat}&lng=${lng}` +
    `&range=5` +        // 5 = 半径3km（地方でも拾えるよう最大）
    `&count=30` +
    `&datum=world` +    // WGS84（Googleと同じ座標系）
    `&format=json${genre}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return [];

  const data = (await res.json()) as {
    results?: {
      shop?: Array<{
        id: string;
        name: string;
        address: string;
        lat: number | string;
        lng: number | string;
        genre?: { name?: string };
        budget?: { name?: string; average?: string };
        photo?: { pc?: { l?: string; m?: string; s?: string } };
        urls?: { pc?: string };
      }>;
    };
  };

  const shops = data?.results?.shop ?? [];
  const oLat = parseFloat(lat);
  const oLng = parseFloat(lng);
  const dist2 = makeDist2(oLat, oLng);

  return shops
    .map((s): NearbyPlace => ({
      place_id:           s.id,
      name:               s.name,
      vicinity:           s.address,
      rating:             null, // ホットペッパーは数値評価を提供しない
      user_ratings_total: 0,
      price_level:        null,
      open_now:           null,
      photo_ref:          null,
      photo_url:          s.photo?.pc?.m ?? s.photo?.pc?.l ?? s.photo?.pc?.s ?? null,
      booking_url:        s.urls?.pc ? affiliateWrap(s.urls.pc) : null,
      source:             "hotpepper",
      budget:             s.budget?.name ?? null,
      types:              s.genre?.name ? [s.genre.name] : [],
      lat:                Number(s.lat),
      lng:                Number(s.lng),
    }))
    .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng))
    .sort((a, b) => dist2(a.lat, a.lng) - dist2(b.lat, b.lng))
    .slice(0, 15);
}

// ── Google Places Nearby Search ──
async function fetchFromGooglePlaces(
  lat: string,
  lng: string,
  category: string,
): Promise<NearbyPlace[]> {
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

  if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    console.error("Places API error:", data.status, JSON.stringify(data).slice(0, 300));
    return [];
  }

  const oLat = parseFloat(lat);
  const oLng = parseFloat(lng);
  const dist2 = makeDist2(oLat, oLng);

  return (data.results ?? [])
    .map((p): NearbyPlace => ({
      place_id:           p.place_id,
      name:               p.name,
      vicinity:           p.vicinity,
      rating:             p.rating ?? null,
      user_ratings_total: p.user_ratings_total ?? 0,
      price_level:        p.price_level ?? null,
      open_now:           p.opening_hours?.open_now ?? null,
      photo_ref:          p.photos?.[0]?.photo_reference ?? null,
      source:             "google",
      types:              p.types,
      lat:                p.geometry.location.lat,
      lng:                p.geometry.location.lng,
    }))
    .sort((a, b) => dist2(a.lat, a.lng) - dist2(b.lat, b.lng))
    .slice(0, 15);
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const lat      = searchParams.get("lat");
  const lng      = searchParams.get("lng");
  const category = searchParams.get("category") ?? "food";

  if (!lat || !lng) {
    return NextResponse.json([], { status: 400 });
  }

  try {
    // 飲食・カフェはホットペッパー優先（正式な予約リンクが取れる）
    if ((category === "food" || category === "cafe") && RECRUIT_API_KEY) {
      const hp = await fetchFromHotpepper(lat, lng, category);
      if (hp.length > 0) return jsonWithCache(hp);
      // 0件（地方など）なら Google Places にフォールバック
    }

    if (!GOOGLE_MAPS_KEY) return NextResponse.json([]);
    const google = await fetchFromGooglePlaces(lat, lng, category);
    return jsonWithCache(google);
  } catch (e) {
    console.error("Nearby fetch error:", e);
    return NextResponse.json([]);
  }
}
