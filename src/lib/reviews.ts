import { SEED_REVIEWS } from "@/data/seed-reviews";
import { averageScores, type SpotScores } from "@/lib/score-utils";
import { isSupabaseConfigured } from "@/lib/supabase";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Review } from "@/types/supabase";

export type ReviewWithUser = Review & {
  user_name: string;
};

export type { SpotScores };

function displayName(review: Review): string {
  const nickname = review.nickname?.trim();
  if (nickname) return nickname;
  if (review.user_id) return `User ${review.user_id.slice(0, 8)}`;
  return "Anonymous";
}

function mapReviewWithUser(review: Review): ReviewWithUser {
  return {
    ...review,
    user_name: displayName(review),
  };
}

async function fetchReviewsFromSupabase(spotId: string): Promise<ReviewWithUser[]> {
  const supabase = await createServerSupabaseClient();

  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("spot_id", spotId)
    .order("created_at", { ascending: false });

  if (error || !reviews) {
    return [];
  }

  return reviews.map(mapReviewWithUser);
}

export async function getReviewsBySpotId(spotId: string): Promise<ReviewWithUser[]> {
  if (isSupabaseConfigured()) {
    try {
      return await fetchReviewsFromSupabase(spotId);
    } catch {
      return [];
    }
  }

  return SEED_REVIEWS.filter((review) => review.spot_id === spotId).map((review) =>
    mapReviewWithUser(review),
  );
}

export async function getSpotScores(spotId: string): Promise<SpotScores> {
  const reviews = await getReviewsBySpotId(spotId);
  return averageScores(reviews);
}

export type ReviewAggregate = {
  review_count: number;
  overall_score: number | null;
  score_reenactment: number | null;
  score_accessibility: number | null;
  score_satisfaction: number | null;
  score_photo: number | null;
  score_crowding: number | null;
};

export async function getReviewAggregatesBySpotIds(
  spotIds: string[],
): Promise<Map<string, ReviewAggregate>> {
  const result = new Map<string, ReviewAggregate>();

  if (!spotIds.length) {
    return result;
  }

  if (!isSupabaseConfigured()) {
    return result;
  }

  try {
    const supabase = await createServerSupabaseClient();
    // Only fetch reviews for the given spot IDs (avoid full-table scan)
    const CHUNK = 500;
    const allReviews: Array<{
      spot_id: string;
      score_reenactment: number | null;
      score_accessibility: number | null;
      score_satisfaction: number | null;
      score_photo: number | null;
      score_overall: number | null;
      score_crowding: number | null;
    }> = [];
    for (let i = 0; i < spotIds.length; i += CHUNK) {
      const chunk = spotIds.slice(i, i + CHUNK);
      const { data, error: chunkError } = await supabase
        .from("reviews")
        .select(
          "spot_id, score_reenactment, score_accessibility, score_satisfaction, score_photo, score_overall, score_crowding",
        )
        .in("spot_id", chunk);
      if (chunkError || !data) continue;
      allReviews.push(...data);
    }
    if (!allReviews.length) {
      return result;
    }

    const bySpot = new Map<string, typeof allReviews>();
    for (const review of allReviews) {
      const list = bySpot.get(review.spot_id) ?? [];
      list.push(review);
      bySpot.set(review.spot_id, list);
    }

    for (const [spotId, spotReviews] of bySpot) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const scores = averageScores(spotReviews as any);
      result.set(spotId, {
        review_count: spotReviews.length,
        overall_score: scores.overall,
        score_reenactment: scores.reenactment,
        score_accessibility: scores.accessibility,
        score_satisfaction: scores.satisfaction,
        score_photo: scores.photo,
        score_crowding: scores.crowding,
      });
    }
  } catch {
    return result;
  }

  return result;
}
