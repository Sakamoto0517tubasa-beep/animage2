import { isSupabaseConfigured } from "@/lib/supabase";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function isSpotFavorited(
  spotId: string,
  userId: string | null,
): Promise<boolean> {
  if (!userId || !isSupabaseConfigured()) return false;

  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("favorites")
    .select("id")
    .eq("spot_id", spotId)
    .eq("user_id", userId)
    .maybeSingle();

  return Boolean(data);
}
