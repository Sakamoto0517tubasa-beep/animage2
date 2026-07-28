"use client";

import { useCallback, useRef, useState } from "react";

type SpotImagePanelProps = {
  animeImageUrl: string | null;
  streetViewUrl: string | null;
  fallbackUrl?: string | null;
  locationName: string;
};

export default function SpotImagePanel({ streetViewUrl, fallbackUrl, locationName }: SpotImagePanelProps) {
  const sources = [streetViewUrl, fallbackUrl].filter(Boolean) as string[];
  const idxRef = useRef(0);
  const [src, setSrc] = useState<string | null>(sources[0] ?? null);

  const handleError = useCallback(() => {
    idxRef.current += 1;
    if (idxRef.current < sources.length) {
      setSrc(sources[idxRef.current]);
    } else {
      setSrc(null);
    }
  }, [sources]);

  if (!src) return null;

  return (
    <div className="relative h-64 w-full bg-gray-200 sm:h-72">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={locationName}
        className="h-full w-full object-cover"
        onError={handleError}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  );
}
