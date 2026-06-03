import Link from "next/link";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { getScoreBadgeColor } from "@/lib/home-utils";
export type RecentReview = {
  id: string;
  spot_id: string;
  nickname: string | null;
  score_overall: number | null;
  score_reenactment: number | null;
  score_accessibility: number | null;
  score_photo: number | null;
  score_crowding: number | null;
  comment: string | null;
  created_at: string;
  spot_name?: string | null;
  anime_title?: string | null;
  image_url?: string | null;
};

function ScorePill({ label, value }: { label: string; value: number | null }) {
  const color = getScoreBadgeColor(value);
  return (
    <div className="flex flex-col items-center rounded-lg bg-gray-50 px-1.5 py-1">
      <span className="text-[10px] font-semibold text-gray-600">{label}</span>
      <span className="text-xs font-bold tabular-nums" style={{ color }}>
        {value != null ? value.toFixed(1) : "—"}
      </span>
    </div>
  );
}

export default function ReviewsList({ reviews }: { reviews: RecentReview[] }) {
  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-gray-100">
          <Star className="size-8 text-gray-300" />
        </div>
        <p className="text-sm font-medium text-gray-500">まだレビューがありません</p>
        <p className="text-xs text-gray-400">聖地を訪問してレビューを書いてみよう</p>
        <Link href="/spots" className="mt-2 rounded-full bg-[#E53935] px-5 py-2 text-sm font-semibold text-white">
          聖地を探す
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-2 p-3">
      <p className="px-1 text-xs text-gray-400">最新 {reviews.length}件</p>
      {reviews.map((review) => (
        <Link
          key={review.id}
          href={`/spots/${review.spot_id}`}
          className="flex gap-2.5 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm active:bg-gray-50"
        >
          <div className="relative size-16 shrink-0 self-center overflow-hidden rounded-lg bg-gray-100 ml-2">
            {review.image_url ? (
              <Image src={review.image_url} alt={review.spot_name ?? ""} fill className="object-cover" sizes="64px" />
            ) : (
              <div className="flex h-full items-center justify-center">
                <MapPin className="size-4 text-gray-300" />
              </div>
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-between py-2 pr-2.5">
            <div className="flex items-start justify-between gap-1.5">
              <div className="min-w-0">
                <p className="truncate text-[9px] font-semibold text-[#E53935]">{review.anime_title ?? "不明"}</p>
                <p className="truncate text-xs font-bold leading-snug text-gray-900">{review.spot_name ?? "不明なスポット"}</p>
              </div>
              {review.score_overall != null && (
                <div className="flex shrink-0 flex-col items-center rounded-lg bg-red-50 px-1.5 py-0.5">
                  <span className="text-sm font-extrabold leading-none tabular-nums text-[#E53935]">
                    {review.score_overall.toFixed(1)}
                  </span>
                  <span className="text-[7px] text-gray-400">/10</span>
                </div>
              )}
            </div>
            <div className="mt-1.5 grid grid-cols-4 gap-0.5">
              <ScorePill label="再現度"  value={review.score_reenactment} />
              <ScorePill label="アクセス" value={review.score_accessibility} />
              <ScorePill label="写真映え" value={review.score_photo} />
              <ScorePill label="混雑度"  value={review.score_crowding} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
