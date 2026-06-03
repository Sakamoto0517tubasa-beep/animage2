import type { Review } from "@/types/supabase";

export type SpotScores = {
  reenactment: number | null;
  accessibility: number | null;
  satisfaction: number | null;
  photo: number | null;
  crowding: number | null;
  overall: number | null;
};

export function averageScores(
  reviews: Pick<
    Review,
    | "score_reenactment"
    | "score_accessibility"
    | "score_satisfaction"
    | "score_photo"
    | "score_overall"
    | "score_crowding"
  >[],
): SpotScores {
  if (reviews.length === 0) {
    return {
      reenactment: null,
      accessibility: null,
      satisfaction: null,
      photo: null,
      crowding: null,
      overall: null,
    };
  }

  const avg = (values: (number | null)[]) => {
    const valid = values.filter((v): v is number => v != null);
    if (!valid.length) return null;
    return Math.round((valid.reduce((sum, v) => sum + v, 0) / valid.length) * 10) / 10;
  };

  return {
    reenactment: avg(reviews.map((r) => r.score_reenactment)),
    accessibility: avg(reviews.map((r) => r.score_accessibility)),
    satisfaction: avg(reviews.map((r) => r.score_satisfaction)),
    photo: avg(reviews.map((r) => r.score_photo)),
    crowding: avg(reviews.map((r) => r.score_crowding ?? null)),
    overall: avg(reviews.map((r) => r.score_overall)),
  };
}

export function hasReviews(reviewCount: number): boolean {
  return reviewCount > 0;
}
