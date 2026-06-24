"use client";

import Image from "next/image";

type SpotImagePanelProps = {
  animeImageUrl: string | null;
  streetViewUrl: string | null;
  locationName: string;
};

export default function SpotImagePanel({ streetViewUrl, locationName }: SpotImagePanelProps) {
  if (!streetViewUrl) return null;

  return (
    <div className="relative h-64 w-full bg-gray-100 sm:h-72">
      <div className="flex h-full">
        <div className="relative h-full flex-1 overflow-hidden">
          <Image
            src={streetViewUrl}
            alt={locationName}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 640px"
            priority
          />
        </div>
      </div>

      {/* 下部グラデーション */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  );
}
