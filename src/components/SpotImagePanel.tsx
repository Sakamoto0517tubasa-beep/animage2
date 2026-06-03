"use client";

import Image from "next/image";

type SpotImagePanelProps = {
  animeImageUrl: string | null;
  streetViewUrl: string | null;
  locationName: string;
};

export default function SpotImagePanel({ animeImageUrl, streetViewUrl, locationName }: SpotImagePanelProps) {
  if (!animeImageUrl && !streetViewUrl) return null;

  const hasBoth = !!(animeImageUrl && streetViewUrl);

  return (
    <div className="relative h-64 w-full bg-gray-100 sm:h-72">
      <div className="flex h-full">
        {animeImageUrl && (
          <div className="relative h-full flex-1 overflow-hidden">
            <Image
              src={animeImageUrl}
              alt={locationName}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 640px"
              priority
            />
            {hasBoth && (
              <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white backdrop-blur-sm">
                アニメ
              </div>
            )}
          </div>
        )}

        {hasBoth && (
          <div className="relative z-10 w-0.5 bg-white shadow-md" />
        )}

        {streetViewUrl && (
          <div className="relative h-full flex-1 overflow-hidden">
            <Image
              src={streetViewUrl}
              alt="現地"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 640px"
            />
            {hasBoth && (
              <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white backdrop-blur-sm">
                現地
              </div>
            )}
          </div>
        )}
      </div>

      {/* 下部グラデーション */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  );
}
