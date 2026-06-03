export const revalidate = 3600; // ISR: 1 hour

import { getAnimeList } from "@/lib/anime";
import { getSpotCount } from "@/lib/spots";
import HomeDiscover from "@/components/home/HomeDiscover";

export default async function HomePage() {
  const [animeList, spotCount] = await Promise.all([
    getAnimeList(),
    getSpotCount(),
  ]);
  return <HomeDiscover animeList={animeList} spotCount={spotCount} />;
}
