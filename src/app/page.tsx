export const revalidate = 3600; // ISR: 1 hour

import { getAnimeList } from "@/lib/anime";
import { getSpotCount } from "@/lib/spots";
import { getTopSpotCards } from "@/lib/spot-cards";
import HomeDiscover from "@/components/home/HomeDiscover";

export default async function HomePage() {
  const [animeList, spotCount, topSpots, hotSpots] = await Promise.all([
    getAnimeList(),
    getSpotCount(),
    getTopSpotCards("score", 12),
    getTopSpotCards("reviews", 12),
  ]);
  return <HomeDiscover animeList={animeList} spotCount={spotCount} topSpots={topSpots} hotSpots={hotSpots} />;
}
