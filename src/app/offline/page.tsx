"use client";

import Image from "next/image";

export default function OfflinePage() {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center gap-6 px-6 pb-24 text-center">
      <div className="flex size-24 items-center justify-center rounded-full bg-gray-100">
        <Image src="/icon.svg" alt="Anigri" width={64} height={64} className="size-16 rounded-2xl" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-gray-900">オフラインです</h1>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          インターネットに接続されていません。
          <br />
          接続が回復したら自動的に再開します。
        </p>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={() => window.location.reload()}
          className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#E53935] text-sm font-bold text-white shadow-sm shadow-red-200"
        >
          再読み込み
        </button>
        <a
          href="/"
          className="flex h-12 w-full items-center justify-center rounded-2xl border border-gray-200 bg-white text-sm font-semibold text-gray-700"
        >
          ホームへ戻る
        </a>
      </div>
      <p className="text-xs text-gray-400">
        以前に閲覧したページはオフラインでも見られます
      </p>
    </div>
  );
}
