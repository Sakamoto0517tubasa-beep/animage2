import { getScoreBadgeColor } from "@/lib/home-utils";
import { cn } from "@/lib/utils";

type ScoreBadgeProps = {
  score: number | null;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  showDenominator?: boolean;
};

export default function ScoreBadge({
  score,
  reviewCount,
  size = "md",
  className,
  showDenominator = true,
}: ScoreBadgeProps) {
  const hasReviews =
    reviewCount !== undefined ? reviewCount > 0 : score !== null;

  if (!hasReviews) {
    return (
      <span
        className={cn(
          "shrink-0 text-center font-medium text-gray-400",
          size === "sm" && "max-w-[4.5rem] text-[10px] leading-tight",
          size === "md" && "max-w-[5rem] text-[11px] leading-tight",
          size === "lg" && "max-w-[5.5rem] text-xs leading-tight",
          className,
        )}
      >
        レビューなし
      </span>
    );
  }

  const display = score != null ? score.toFixed(1) : "—";
  const backgroundColor = getScoreBadgeColor(score);

  if (!showDenominator) {
    return (
      <span
        className={cn("font-bold text-[#B71C1C]", className)}
        style={{ color: backgroundColor }}
      >
        {display}
      </span>
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 flex-col items-center justify-center rounded-lg px-2.5 py-1.5 text-center text-white",
        size === "sm" && "min-w-[2.75rem] px-2 py-1",
        size === "md" && "min-w-[3.25rem]",
        size === "lg" && "min-w-[3.75rem] px-3 py-2",
        className,
      )}
      style={{ backgroundColor }}
    >
      <span
        className={cn(
          "leading-none font-bold",
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          size === "lg" && "text-base",
        )}
      >
        {display}
      </span>
      <span className="mt-0.5 text-[10px] leading-none opacity-90">/10</span>
    </div>
  );
}
