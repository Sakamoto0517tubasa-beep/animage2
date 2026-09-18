"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const SpotEmbedMap = dynamic(() => import("@/components/SpotEmbedMap"), {
  loading: () => <div className="h-48 animate-pulse rounded-xl bg-gray-100" />,
  ssr: false,
});

// 地図（Google Maps SDK）は重いので、画面に近づいたときだけ読み込む
export default function SpotEmbedMapLazy({ lat, lng, locationName }: { lat: number; lng: number; locationName: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {show ? (
        <SpotEmbedMap lat={lat} lng={lng} locationName={locationName} />
      ) : (
        <div className="h-48 rounded-xl border border-gray-200 bg-gray-50" />
      )}
    </div>
  );
}
