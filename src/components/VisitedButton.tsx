"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, MapPin } from "lucide-react";
import { isVisited, toggleVisited } from "@/lib/visited";

type Props = {
  spotId: string;
  className?: string;
};

export default function VisitedButton({ spotId, className = "" }: Props) {
  const [visited, setVisited] = useState(false);
  const [animating, setAnimating] = useState(false);

  // hydration 後に localStorage から状態を読み込む
  useEffect(() => {
    setVisited(isVisited(spotId));
  }, [spotId]);

  function handleToggle() {
    const next = toggleVisited(spotId);
    setVisited(next);
    if (next) {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 600);
    }
    // カスタムイベントで他のコンポーネントに通知
    window.dispatchEvent(new CustomEvent("visited-changed", { detail: { spotId, visited: next } }));
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all active:scale-95 ${
        visited
          ? "border-green-200 bg-green-50 text-green-600"
          : "border-gray-200 bg-white text-gray-500"
      } ${animating ? "scale-105" : ""} ${className}`}
      aria-label={visited ? "訪問済みを取り消す" : "訪問済みにする"}
    >
      {visited ? (
        <>
          <CheckCircle2 className="size-4 text-green-500" />
          訪問済み
        </>
      ) : (
        <>
          <MapPin className="size-4" />
          訪問した
        </>
      )}
    </button>
  );
}
