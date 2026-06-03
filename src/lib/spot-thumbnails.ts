function getGoogleMapsApiKey(): string | undefined {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
}

function hasValidCoordinates(
  lat: number | null | undefined,
  lng: number | null | undefined,
): boolean {
  return lat != null && lng != null && Number.isFinite(lat) && Number.isFinite(lng);
}

export function getSpotStreetViewUrl(
  lat: number | null | undefined,
  lng: number | null | undefined,
): string | null {
  const apiKey = getGoogleMapsApiKey();

  if (!apiKey || !hasValidCoordinates(lat, lng)) {
    return null;
  }

  const params = new URLSearchParams({
    size: "400x300",
    location: `${lat},${lng}`,
    fov: "90",
    return_error_code: "true",
    key: apiKey,
  });

  return `https://maps.googleapis.com/maps/api/streetview?${params.toString()}`;
}

export function getSpotSatelliteThumbnailUrl(
  lat: number | null | undefined,
  lng: number | null | undefined,
): string | null {
  const apiKey = getGoogleMapsApiKey();

  if (!apiKey || !hasValidCoordinates(lat, lng)) {
    return null;
  }

  const params = new URLSearchParams({
    center: `${lat},${lng}`,
    zoom: "16",
    size: "400x300",
    maptype: "satellite",
    markers: `color:red|${lat},${lng}`,
    key: apiKey,
  });

  return `https://maps.googleapis.com/maps/api/staticmap?${params.toString()}`;
}

export function getSpotThumbnailUrl(
  lat: number | null | undefined,
  lng: number | null | undefined,
  fallbackUrl?: string | null,
): string | null {
  return getSpotStreetViewUrl(lat, lng) ?? fallbackUrl ?? null;
}
