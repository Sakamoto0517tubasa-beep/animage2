"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  APIProvider,
  Map as GoogleMap,
  useMap,
} from "@vis.gl/react-google-maps";
import { Crosshair, Train, X } from "lucide-react";
import ScoreBadge from "@/components/ScoreBadge";
import { Button } from "@/components/ui/button";
import type { SpotWithStats } from "@/types/supabase";

const JAPAN_CENTER = { lat: 36.5, lng: 137.0 };
const DEFAULT_ZOOM = 5;

// ── ドット半径 ──
function dotRadius(zoom: number) {
  if (zoom >= 17) return 7;
  if (zoom >= 15) return 6;
  if (zoom >= 13) return 5;
  if (zoom >= 11) return 4;
  return 3;
}

// ── Canvas マーカー ──
function CanvasMarkers({
  spots,
  onSelectSpot,
  onClose,
  activeSpotId,
  userLocation,
}: {
  spots: SpotWithStats[];
  onSelectSpot: (id: string) => void;
  onClose: () => void;
  activeSpotId: string | null;
  userLocation: { lat: number; lng: number } | null;
}) {
  const map = useMap();
  const spotsRef       = useRef(spots);
  const activeIdRef    = useRef(activeSpotId);
  const userLocRef     = useRef(userLocation);
  const onSpotRef      = useRef(onSelectSpot);
  const onCloseRef     = useRef(onClose);
  const overlayRef     = useRef<google.maps.OverlayView | null>(null);
  const animFrameRef   = useRef<number>(0);
  const pulsePhaseRef  = useRef(0);

  useEffect(() => { spotsRef.current    = spots;        overlayRef.current?.draw(); }, [spots]);
  useEffect(() => { activeIdRef.current = activeSpotId; overlayRef.current?.draw(); }, [activeSpotId]);
  useEffect(() => { userLocRef.current  = userLocation; overlayRef.current?.draw(); }, [userLocation]);
  useEffect(() => { onSpotRef.current   = onSelectSpot; }, [onSelectSpot]);
  useEffect(() => { onCloseRef.current  = onClose; },      [onClose]);

  useEffect(() => {
    if (!map) return;

    const mapDiv = map.getDiv();
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;top:0;left:0;pointer-events:none;z-index:2;";
    mapDiv.appendChild(canvas);

    const overlay = new google.maps.OverlayView();

    overlay.onAdd = () => {};
    overlay.draw = function () {
      const projection = this.getProjection();
      if (!projection) return;

      const w = mapDiv.offsetWidth;
      const h = mapDiv.offsetHeight;
      canvas.width  = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, w, h);

      const zoom = map.getZoom() ?? DEFAULT_ZOOM;
      const r    = dotRadius(zoom);
      const pad  = r * 2;

      ctx.fillStyle   = "#E53935";
      ctx.strokeStyle = "white";
      ctx.lineWidth   = 1.2;

      for (const spot of spotsRef.current) {
        if (activeIdRef.current === spot.id) continue;
        const pt = projection.fromLatLngToContainerPixel(
          new google.maps.LatLng(spot.lat, spot.lng),
        );
        if (!pt) continue;
        if (pt.x < -pad || pt.x > w + pad || pt.y < -pad || pt.y > h + pad) continue;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      // アクティブなドットを最前面に
      if (activeIdRef.current) {
        const spot = spotsRef.current.find((s) => s.id === activeIdRef.current);
        if (spot) {
          const pt = projection.fromLatLngToContainerPixel(
            new google.maps.LatLng(spot.lat, spot.lng),
          );
          if (pt) {
            ctx.fillStyle   = "#FF1744";
            ctx.strokeStyle = "white";
            ctx.lineWidth   = 2;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, r * 1.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          }
        }
      }

      // 現在地ドット（青い脈動リング）
      if (userLocRef.current) {
        const upt = projection.fromLatLngToContainerPixel(
          new google.maps.LatLng(userLocRef.current.lat, userLocRef.current.lng),
        );
        if (upt) {
          const phase  = pulsePhaseRef.current;
          const pulse  = Math.abs(Math.sin(phase));          // 0 〜 1

          // 脈動リング
          ctx.beginPath();
          ctx.arc(upt.x, upt.y, 6 + pulse * 10, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(66, 133, 244, ${0.6 - pulse * 0.5})`;
          ctx.lineWidth   = 2;
          ctx.stroke();

          // 白い縁取り
          ctx.beginPath();
          ctx.arc(upt.x, upt.y, 7, 0, Math.PI * 2);
          ctx.fillStyle   = "white";
          ctx.shadowColor = "rgba(0,0,0,0.25)";
          ctx.shadowBlur  = 4;
          ctx.fill();
          ctx.shadowBlur  = 0;

          // 青いドット
          ctx.beginPath();
          ctx.arc(upt.x, upt.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = "#4285F4";
          ctx.fill();
        }
      }
    };

    overlay.onRemove = () => { canvas.parentNode?.removeChild(canvas); };
    overlay.setMap(map);
    overlayRef.current = overlay;

    // 脈動アニメーション（現在地がある場合のみ RAF で再描画）
    function animatePulse() {
      pulsePhaseRef.current += 0.05;
      if (userLocRef.current) overlayRef.current?.draw();
      animFrameRef.current = requestAnimationFrame(animatePulse);
    }
    animFrameRef.current = requestAnimationFrame(animatePulse);

    const idleListener   = map.addListener("idle",           () => overlayRef.current?.draw());
    const boundsListener = map.addListener("bounds_changed", () => overlayRef.current?.draw());

    const clickListener = map.addListener("click", (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;
      const zoom     = map.getZoom() ?? DEFAULT_ZOOM;
      const clickLat = e.latLng.lat();
      const clickLng = e.latLng.lng();
      const pxPerDeg = (256 * Math.pow(2, zoom)) / 360;
      const threshold = (dotRadius(zoom) * 5) / pxPerDeg;

      let best: { id: string; dist: number } | null = null;
      for (const spot of spotsRef.current) {
        const dlat = spot.lat - clickLat;
        const dlng = (spot.lng - clickLng) * Math.cos(clickLat * Math.PI / 180);
        const d = Math.sqrt(dlat * dlat + dlng * dlng);
        if (d <= threshold && (!best || d < best.dist)) {
          best = { id: spot.id, dist: d };
        }
      }
      if (best) onSpotRef.current(best.id);
      else onCloseRef.current();
    });

    return () => {
      overlayRef.current = null;
      cancelAnimationFrame(animFrameRef.current);
      google.maps.event.removeListener(clickListener);
      google.maps.event.removeListener(idleListener);
      google.maps.event.removeListener(boundsListener);
      overlay.setMap(null);
    };
  }, [map]);

  return null;
}

// ── 現在地ボタン ──
function CurrentLocationButton({
  onLocate,
}: {
  onLocate: (loc: { lat: number; lng: number }) => void;
}) {
  const map = useMap();
  const [loading, setLoading] = useState(false);
  const [denied, setDenied] = useState(false);

  const handleClick = useCallback(() => {
    if (!map || !navigator.geolocation) return;
    setLoading(true);
    setDenied(false);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        map.panTo(loc);
        map.setZoom(13);
        onLocate(loc);
        setLoading(false);
      },
      () => {
        setLoading(false);
        setDenied(true);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, [map, onLocate]);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      title={denied ? "位置情報が許可されていません" : "現在地へ移動"}
      className={`absolute right-4 bottom-20 z-10 flex size-11 items-center justify-center rounded-full border shadow-md transition-colors disabled:opacity-50 ${
        denied
          ? "border-red-200 bg-red-50 text-red-400"
          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
      }`}
      aria-label="現在地へ"
    >
      <Crosshair className={`size-5 ${loading ? "animate-spin" : ""}`} />
    </button>
  );
}

// ── スポット情報カード（ボトムシート風） ──
function SpotInfoCard({ spot, onClose }: { spot: SpotWithStats; onClose: () => void }) {
  const isAnimeUrl = (url?: string | null) =>
    !!url && !url.includes("maps.googleapis.com") && !url.includes("unsplash.com");

  const animeImg = isAnimeUrl(spot.thumbnail_fallback_url)
    ? spot.thumbnail_fallback_url!
    : isAnimeUrl(spot.thumbnail_url)
      ? spot.thumbnail_url!
      : null;

  const streetViewUrl = spot.thumbnail_url?.includes("maps.googleapis.com")
    ? spot.thumbnail_url : null;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 animate-in slide-in-from-bottom duration-300">
      <div className="mx-3 mb-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
        {/* 画像エリア */}
        {(animeImg || streetViewUrl) && (
          <div className="relative h-36 w-full bg-gray-100">
            <div className="flex h-full">
              {animeImg && (
                <div className="relative h-full flex-1 overflow-hidden">
                  <Image src={animeImg} alt={spot.location_name} fill className="object-cover" sizes="200px" />
                  <span className="absolute bottom-1 left-1.5 rounded bg-black/55 px-1.5 py-0.5 text-[9px] font-semibold text-white">アニメ</span>
                </div>
              )}
              {animeImg && streetViewUrl && <div className="w-px bg-white/60" />}
              {streetViewUrl && (
                <div className="relative h-full flex-1 overflow-hidden">
                  <Image src={streetViewUrl} alt="現地" fill className="object-cover" sizes="200px" />
                  <span className="absolute bottom-1 right-1.5 rounded bg-black/55 px-1.5 py-0.5 text-[9px] font-semibold text-white">現地</span>
                </div>
              )}
            </div>
            {/* グラデーションオーバーレイ */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-8">
              <p className="truncate text-sm font-bold text-white">{spot.location_name}</p>
              <p className="truncate text-xs text-white/80">{spot.anime_title}</p>
            </div>
            <button
              onClick={onClose}
              className="absolute right-2 top-2 rounded-full bg-black/45 p-1 text-white backdrop-blur-sm hover:bg-black/65"
            >
              <X className="size-4" />
            </button>
          </div>
        )}

        {/* 情報行 */}
        <div className="flex items-center gap-3 px-4 py-3">
          {!animeImg && !streetViewUrl && (
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-gray-900">{spot.location_name}</p>
              <p className="truncate text-xs text-[#E53935]">{spot.anime_title}</p>
            </div>
          )}
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-gray-400">
            {spot.city && <span>{spot.city}</span>}
            {spot.train_minutes != null && (
              <span className="flex items-center gap-0.5">
                <Train className="size-3" />{spot.train_minutes}分
              </span>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ScoreBadge score={spot.overall_score} reviewCount={spot.review_count} size="sm" />
            <Button asChild size="sm" className="h-8 rounded-xl bg-[#E53935] px-3 text-xs hover:bg-[#D32F2F]">
              <Link href={`/spots/${spot.id}`}>詳細</Link>
            </Button>
          </div>
          {(!animeImg && !streetViewUrl) && (
            <button onClick={onClose} className="shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-100">
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── メイン ──
type SpotsMapProps = {
  spots: SpotWithStats[];
  selectedSpotId?: string | null;
  onSelectSpot?: (spotId: string | null) => void;
};

export default function SpotsMap({ spots, selectedSpotId, onSelectSpot }: SpotsMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const [activeSpotId, setActiveSpotId] = useState<string | null>(selectedSpotId ?? null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => { setActiveSpotId(selectedSpotId ?? null); }, [selectedSpotId]);

  // マップ読み込み時に自動で現在地取得
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {/* 拒否された場合は何もしない */},
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  const activeSpot = spots.find((s) => s.id === activeSpotId) ?? null;

  const handleSelectSpot = useCallback((id: string) => {
    setActiveSpotId(id);
    onSelectSpot?.(id);
  }, [onSelectSpot]);

  const handleClose = useCallback(() => {
    setActiveSpotId(null);
    onSelectSpot?.(null);
  }, [onSelectSpot]);

  if (!apiKey) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-50 p-6 text-center">
        <p className="text-sm text-gray-500">Google Maps API キーが必要です</p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div className="relative h-full w-full">
        <GoogleMap
          defaultCenter={JAPAN_CENTER}
          defaultZoom={DEFAULT_ZOOM}
          gestureHandling="greedy"
          disableDefaultUI={false}
          mapId="animage-spots-map"
          className="h-full w-full"
          style={{ width: "100%", height: "100%" }}
        >
          <CanvasMarkers
            spots={spots}
            onSelectSpot={handleSelectSpot}
            onClose={handleClose}
            activeSpotId={activeSpotId}
            userLocation={userLocation}
          />
          <CurrentLocationButton onLocate={setUserLocation} />
        </GoogleMap>

        {activeSpot && <SpotInfoCard spot={activeSpot} onClose={handleClose} />}
      </div>
    </APIProvider>
  );
}
