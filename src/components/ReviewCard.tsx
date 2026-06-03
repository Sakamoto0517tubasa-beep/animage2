import { getScoreBadgeColor } from "@/lib/home-utils";
import type { ReviewWithUser } from "@/lib/reviews";

type ReviewCardProps = {
  review: ReviewWithUser;
};

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateString));
}

function MiniScoreBar({ score }: { score: number }) {
  const color = getScoreBadgeColor(score);
  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-gray-100">
      <div
        className="h-full rounded-full"
        style={{ width: `${(score / 10) * 100}%`, backgroundColor: color }}
      />
    </div>
  );
}

function ScoreItem({ label, score }: { label: string; score: number }) {
  const color = getScoreBadgeColor(score);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-gray-400">{label}</span>
        <span className="text-[10px] font-bold tabular-nums" style={{ color }}>
          {score}
        </span>
      </div>
      <MiniScoreBar score={score} />
    </div>
  );
}

// アバターの背景色をニックネームから決定（同じ名前は同じ色）
const AVATAR_GRADIENTS = [
  "from-rose-400 to-pink-500",
  "from-orange-400 to-red-400",
  "from-amber-400 to-orange-500",
  "from-emerald-400 to-teal-500",
  "from-cyan-400 to-blue-500",
  "from-violet-400 to-purple-500",
  "from-pink-400 to-rose-500",
  "from-teal-400 to-cyan-500",
];

function avatarGradient(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) & 0xffff;
  return AVATAR_GRADIENTS[hash % AVATAR_GRADIENTS.length];
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const name = review.user_name ?? "匿名";
  const scoreColor = getScoreBadgeColor(review.score_overall);

  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      {/* ヘッダー：ユーザー名・日付・総合スコア */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className={`flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${avatarGradient(name)} text-sm font-bold text-white shadow-sm`}>
            {name[0]}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 leading-none">{name}</p>
            <p className="mt-0.5 text-[10px] text-gray-400">{formatDate(review.created_at)}</p>
          </div>
        </div>
        {review.score_overall !== null && (
          <div className="flex shrink-0 flex-col items-center rounded-xl px-2.5 py-1.5" style={{ backgroundColor: `${scoreColor}18` }}>
            <span className="text-lg font-extrabold tabular-nums leading-none" style={{ color: scoreColor }}>
              {review.score_overall.toFixed(1)}
            </span>
            <span className="text-[10px] text-gray-400">/10</span>
          </div>
        )}
      </div>

      {/* コメント */}
      {review.comment && (
        <p className="mt-3 text-sm leading-relaxed text-gray-700">{review.comment}</p>
      )}

      {/* スコア詳細バー */}
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
        {review.score_reenactment   != null && <ScoreItem label="再現度"   score={review.score_reenactment} />}
        {review.score_accessibility != null && <ScoreItem label="アクセス" score={review.score_accessibility} />}
        {review.score_photo         != null && <ScoreItem label="写真映え" score={review.score_photo} />}
        {review.score_crowding      != null && <ScoreItem label="混雑度"   score={review.score_crowding} />}
      </div>
    </article>
  );
}
