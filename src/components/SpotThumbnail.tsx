"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  getSpotSatelliteThumbnailUrl,
  getSpotStreetViewUrl,
} from "@/lib/spot-thumbnails";

type SpotThumbnailProps = {
  lat: number;
  lng: number;
  alt: string;
  fallbackUrl?: string | null;
  className?: string;
  sizes?: string;
};

export default function SpotThumbnail({
  lat,
  lng,
  alt,
  fallbackUrl,
  className,
  sizes,
}: SpotThumbnailProps) {
  const streetViewUrl = useMemo(() => getSpotStreetViewUrl(lat, lng), [lat, lng]);
  const satelliteUrl = useMemo(() => getSpotSatelliteThumbnailUrl(lat, lng), [lat, lng]);

  const isAnimeImage = !!fallbackUrl && !fallbackUrl.includes("maps.googleapis.com") && !fallbackUrl.includes("unsplash.com");

  // Anime spots: show anime scene image first, fall back to street view
  // Other spots: show street view first, fall back to satellite
  const [src, setSrc] = useState<string | null>(
    isAnimeImage ? fallbackUrl! : (streetViewUrl ?? satelliteUrl ?? fallbackUrl ?? null),
  );
  const [usedAnime, setUsedAnime] = useState(isAnimeImage);

  if (!src) return null;

  function handleError() {
    if (usedAnime && streetViewUrl) {
      setSrc(streetViewUrl);
      setUsedAnime(false);
      return;
    }
    if (src !== satelliteUrl && satelliteUrl) {
      setSrc(satelliteUrl);
    }
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      className={className}
      sizes={sizes}
      onError={handleError}
    />
  );
}
