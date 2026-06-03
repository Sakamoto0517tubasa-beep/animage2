export const revalidate = 3600;

import { getAnimeList } from "@/lib/anime";
import AnimeListClient from "@/components/AnimeListClient";

export default async function AnimePage() {
  const animeList = await getAnimeList();
  return <AnimeListClient animeList={animeList} />;
}
