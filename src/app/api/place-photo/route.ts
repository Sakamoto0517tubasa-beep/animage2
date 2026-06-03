import { type NextRequest, NextResponse } from "next/server";

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

export async function GET(req: NextRequest) {
  const ref = req.nextUrl.searchParams.get("ref");
  if (!ref || !KEY) return new NextResponse(null, { status: 400 });

  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${ref}&key=${KEY}`;

  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) return new NextResponse(null, { status: 404 });

  const blob = await res.blob();
  return new NextResponse(blob, {
    headers: {
      "Content-Type": res.headers.get("Content-Type") ?? "image/jpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
