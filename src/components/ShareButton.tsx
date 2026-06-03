"use client";

import { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";

type ShareButtonProps = {
  title: string;
  text: string;
  url?: string;
  className?: string;
};

export default function ShareButton({ title, text, url, className = "" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const shareUrl = url ?? window.location.href;

    // Web Share API（モバイルのネイティブ共有）
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
        return;
      } catch {
        // キャンセルされた場合は何もしない
        return;
      }
    }

    // フォールバック：URLをクリップボードにコピー
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard APIが使えない場合はinputを使う
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-600 transition-colors active:bg-gray-50 ${className}`}
      aria-label="シェア"
    >
      {copied ? (
        <>
          <Check className="size-4 text-green-500" />
          <span className="text-green-500 text-xs">コピー済み</span>
        </>
      ) : (
        <>
          <Share2 className="size-4" />
          <span className="text-xs">シェア</span>
        </>
      )}
    </button>
  );
}
