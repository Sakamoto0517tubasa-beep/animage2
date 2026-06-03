import { NextResponse } from "next/server";
import { getSpotById } from "@/lib/spots";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const spot = await getSpotById(id);
  if (!spot) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(spot);
}
