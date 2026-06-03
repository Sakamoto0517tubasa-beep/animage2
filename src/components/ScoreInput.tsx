"use client";

import { getScoreBadgeColor } from "@/lib/home-utils";
import { cn } from "@/lib/utils";

type ScoreInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

export default function ScoreInput({ label, value, onChange }: ScoreInputProps) {
  const activeColor = getScoreBadgeColor(value);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm font-bold" style={{ color: activeColor }}>
          {value}/10
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {Array.from({ length: 10 }, (_, index) => {
          const score = index + 1;
          const isActive = value === score;

          return (
            <button
              key={score}
              type="button"
              onClick={() => onChange(score)}
              className={cn(
                "flex size-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors",
                isActive
                  ? "border-transparent text-white"
                  : "border-gray-200 bg-white text-gray-500 hover:border-[#E53935]/40",
              )}
              style={isActive ? { backgroundColor: getScoreBadgeColor(score) } : undefined}
            >
              {score}
            </button>
          );
        })}
      </div>
    </div>
  );
}
