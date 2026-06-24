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
  className,
  sizes,
}: SpotThumbnailProps) {
  const streetViewUrl = useMemo(() => getSpotStreetViewUrl(lat, lng), [lat, lng]);
  const satelliteUrl = useMemo(() => getSpotSatelliteThumbnailUrl(lat, lng), [lat, lng]);

  const [src, setSrc] = useState<string | null>(
    streetViewUrl ?? satelliteUrl ?? null,
  );

  if (!src) return null;

  function handleError() {
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
