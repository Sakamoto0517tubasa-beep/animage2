import { NextResponse } from "next/server";
import { getSpotsForMarkers } from "@/lib/spots";

export const dynamic = "force-dynamic";

export async function GET() {
  const markers = await getSpotsForMarkers();
  return NextResponse.json(markers);
}
