"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/types/supabase";

// ── ライトボックス ──
function Lightbox({
  photos,
  index,
  onClose,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);
  const photo = photos[current];

  function prev(e: React.MouseEvent) {
    e.stopPropagation();
    setCurrent((i) => (i - 1 + photos.length) % photos.length);
  }
  function next(e: React.MouseEvent) {
    e.stopPropagation();
    setCurrent((i) => (i + 1) % photos.length);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      {/* 閉じるボタン */}
      <button
        onClick={onClose}
        className="absolute right-4 top-safe-top mt-4 flex size-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm"
        aria-label="閉じる"
      >
        <X className="size-5" />
      </button>

      {/* 枚数インジケーター */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
        {current + 1} / {photos.length}
      </div>

      {/* 前へ */}
      {photos.length > 1 && (
        <button
          onClick={prev}
          className="absolute left-2 flex size-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm"
          aria-label="前の写真"
        >
          <ChevronLeft className="size-5" />
        </button>
      )}

      {/* 画像 */}
      <div className="max-h-[85dvh] max-w-[95vw]" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.url}
          alt={photo.caption || "Spot photo"}
          className="max-h-[80dvh] max-w-[95vw] rounded-xl object-contain shadow-2xl"
        />
        {photo.caption && (
          <p className="mt-2 text-center text-sm text-white/80">{photo.caption}</p>
        )}
      </div>

      {/* 次へ */}
      {photos.length > 1 && (
        <button
          onClick={next}
          className="absolute right-2 flex size-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm"
          aria-label="次の写真"
        >
          <ChevronRight className="size-5" />
        </button>
      )}
    </div>
  );
}

// ── グリッド ──
export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-12 text-center">
        <Camera className="size-8 text-gray-300" />
        <p className="mt-3 text-sm text-gray-500">まだ写真がありません - 最初に投稿しよう！</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-1.5">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 active:opacity-80"
          >
            <Image
              src={photo.url}
              alt={photo.caption || "Spot photo"}
              fill
              className="object-cover transition-transform duration-200 group-active:scale-95"
              sizes="(max-width: 640px) 33vw, 150px"
            />
            {/* 最初の写真は大きく */}
            {i === 0 && photos.length >= 3 && (
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            )}
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
