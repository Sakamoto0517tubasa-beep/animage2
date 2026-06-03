"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

type SpotEmbedMapProps = {
  lat: number;
  lng: number;
  locationName: string;
};

export default function SpotEmbedMap({ lat, lng, locationName }: SpotEmbedMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

  if (!apiKey) {
    return (
      <div className="flex h-48 items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
        <p className="text-sm text-gray-500">
          Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to show the map.
        </p>
      </div>
    );
  }

  return (
    <div className="h-48 overflow-hidden rounded-xl border border-gray-200">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={{ lat, lng }}
          defaultZoom={16}
          gestureHandling="cooperative"
          disableDefaultUI={false}
          className="h-full w-full"
          style={{ width: "100%", height: "100%" }}
        >
          <Marker position={{ lat, lng }} title={locationName} />
        </Map>
      </APIProvider>
    </div>
  );
}
