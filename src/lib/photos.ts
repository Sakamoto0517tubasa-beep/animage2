import { SEED_PHOTOS } from "@/data/seed-photos";
import { isSupabaseConfigured } from "@/lib/supabase";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Photo } from "@/types/supabase";

async function fetchPhotosFromSupabase(spotId: string): Promise<Photo[]> {
  const supabase = await createServerSupabaseClient();

  const { data: photos, error } = await supabase
    .from("photos")
    .select("*")
    .eq("spot_id", spotId)
    .order("created_at", { ascending: false });

  if (error || !photos?.length) {
    return SEED_PHOTOS.filter((photo) => photo.spot_id === spotId);
  }

  return photos;
}

export async function getPhotosBySpotId(spotId: string): Promise<Photo[]> {
  if (isSupabaseConfigured()) {
    try {
      return await fetchPhotosFromSupabase(spotId);
    } catch {
      return SEED_PHOTOS.filter((photo) => photo.spot_id === spotId);
    }
  }

  return SEED_PHOTOS.filter((photo) => photo.spot_id === spotId);
}
