"use client";

import { useState } from "react";
import { ChevronUp } from "lucide-react";

export default function UpvoteButton({
  postId,
  upvotes,
}: {
  postId: string;
  upvotes: number;
}) {
  const [count, setCount] = useState(upvotes);
  const [voted, setVoted] = useState(false);

  const handleClick = async () => {
    if (voted) return;
    setCount((n) => n + 1);
    setVoted(true);
    await fetch("/api/posts/upvote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId }),
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
        voted
          ? "bg-[#E53935] text-white"
          : "border border-gray-200 text-gray-600 hover:border-[#E53935] hover:text-[#E53935]"
      }`}
    >
      <ChevronUp className="size-3.5" />
      {count}
    </button>
  );
}
