"use client";

import dynamic from "next/dynamic";

const NearbyPlaces = dynamic(() => import("@/components/NearbyPlaces"), {
  loading: () => (
    <div className="px-4 mt-8">
      <div className="h-5 w-24 animate-pulse rounded bg-gray-200 mb-3" />
      <div className="h-40 animate-pulse rounded-2xl bg-gray-100" />
    </div>
  ),
  ssr: false,
});

export default function NearbyPlacesLazy({ lat, lng }: { lat: number; lng: number }) {
  return <NearbyPlaces lat={lat} lng={lng} />;
}
