import type { MetadataRoute } from "next";
import { getSpotsForMarkers } from "@/lib/spots";
import { getAnimeList } from "@/lib/anime";

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "https://animage.app";

export const revalidate = 86400; // 1日ごとに再生成

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [spots, anime] = await Promise.all([
    getSpotsForMarkers().catch(() => []),
    getAnimeList().catch(() => []),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    "", "/spots", "/spots/map", "/anime", "/ranking", "/reviews", "/compare",
  ].map((p) => ({
    url: `${BASE}${p}`,
    changeFrequency: "weekly",
    priority: p === "" ? 1.0 : 0.7,
  }));

  const animePages: MetadataRoute.Sitemap = anime.map((a) => ({
    url: `${BASE}/anime/${encodeURIComponent(a.title)}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const spotPages: MetadataRoute.Sitemap = spots.map((s) => ({
    url: `${BASE}/spots/${s.id}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...animePages, ...spotPages];
}
