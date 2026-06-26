"use client";

import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import SpotsMap from "@/components/SpotsMap";
import type { SpotWithStats } from "@/types/supabase";

type SpotsExplorerProps = {
  query?: string;
};

export default function SpotsExplorer({ query = "" }: SpotsExplorerProps) {
  const [allSpots, setAllSpots] = useState<SpotWithStats[]>([]);
  const [searchResults, setSearchResults] = useState<SpotWithStats[] | null>(null); // nullなら全件
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState(query);
  const [selectedAnime, setSelectedAnime] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showAnimeFilter, setShowAnimeFilter] = useState(false);
  const [showCityFilter, setShowCityFilter] = useState(false);
  const [animeSearch, setAnimeSearch] = useState("");
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 全件マーカー読み込み
  useEffect(() => {
    fetch("/api/spots/markers")
      .then((r) => r.json())
      .then((data: SpotWithStats[]) => {
        if (Array.isArray(data)) setAllSpots(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // テキスト検索変更時のみAPIへ（アニメ/エリアはuseMemoで処理）
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    const q = searchText.trim();
    if (!q) { setSearchResults(null); return; }
    debounceTimer.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/spots/markers?q=${encodeURIComponent(q)}&limit=200`);
        const data = res.ok ? await res.json() : null;
        setSearchResults(Array.isArray(data) ? data : null);
      } catch {
        setSearchResults(null);
      } finally {
        setSearching(false);
      }
    }, 400);
  }, [searchText]);

  // filteredSpots: useMemoでallSpots/searchResultsから導出（stale closureなし）
  const filteredSpots = useMemo(() => {
    let base = searchResults ?? allSpots;
    if (selectedAnime) base = base.filter((s) => s.anime_title.split(" / ").some((t) => t.trim() === selectedAnime));
    if (selectedCity) base = base.filter((s) => s.city === selectedCity);
    return base;
  }, [allSpots, searchResults, selectedAnime, selectedCity]);

  const spots = filteredSpots;

  const animeTitles = useMemo(() => {
    const counts = new Map<string, number>();
    for (const spot of allSpots) {
      for (const title of spot.anime_title.split(" / ")) {
        const t = title.trim();
        counts.set(t, (counts.get(t) ?? 0) + 1);
      }
    }
    const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).map(([t]) => t);
    if (!animeSearch.trim()) return sorted.slice(0, 100);
    const q = animeSearch.toLowerCase();
    return sorted.filter((t) => t.toLowerCase().includes(q)).slice(0, 50);
  }, [allSpots, animeSearch]);

  const cities = useMemo(() => {
    const citySet = new Set(allSpots.map((s) => s.city).filter(Boolean));
    return Array.from(citySet).filter((c): c is string => !!c).sort((a, b) => a.localeCompare(b));
  }, [allSpots]);

  const hasActiveFilter = searchText.trim() || selectedAnime || selectedCity;

  const handleSelectSpot = useCallback((id: string | null) => {
    setSelectedSpotId(id);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchText("");
    setSelectedAnime(null);
    setSelectedCity(null);
  }, []);

  if (loading) {
    return (
      <div className="relative h-[calc(100dvh-4rem)] w-full overflow-hidden bg-gray-100">
        {/* マップ背景スケルトン */}
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200" />
        {/* 検索バースケルトン */}
        <div className="absolute left-3 right-3 top-3 flex gap-2">
          <div className="h-10 flex-1 animate-pulse rounded-xl bg-white/80 shadow-md" />
          <div className="h-10 w-20 animate-pulse rounded-xl bg-white/80 shadow-md" />
          <div className="h-10 w-16 animate-pulse rounded-xl bg-white/80 shadow-md" />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-sm font-medium text-gray-400">地図を読み込み中…</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100dvh-4rem)] w-full">
      <SpotsMap
        spots={filteredSpots}
        selectedSpotId={selectedSpotId}
        onSelectSpot={handleSelectSpot}
      />

      {/* Filter bar overlay */}
      <div className="absolute left-0 right-0 top-0 z-20 flex items-center gap-2 p-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="聖地・アニメ名で検索..."
            className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-4 text-sm shadow-md focus:border-[#E53935] focus:outline-none"
          />
          {searchText && (
            <button
              type="button"
              onClick={() => setSearchText("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Anime filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowAnimeFilter((v) => !v);
              setShowCityFilter(false);
            }}
            className={`flex h-10 items-center gap-1.5 rounded-xl border px-3 text-sm shadow-md ${
              selectedAnime
                ? "border-[#E53935] bg-[#E53935] text-white"
                : "border-gray-200 bg-white text-gray-700"
            }`}
          >
            <span className="max-w-24 truncate">
              {selectedAnime ?? "アニメ"}
            </span>
            <ChevronDown className="size-3.5 shrink-0" />
          </button>

          {showAnimeFilter && (
            <div className="absolute right-0 top-12 z-30 w-56 rounded-xl border border-gray-200 bg-white shadow-xl">
              <div className="p-2 border-b border-gray-100">
                <input
                  type="text"
                  value={animeSearch}
                  onChange={(e) => setAnimeSearch(e.target.value)}
                  placeholder="アニメ名で絞り込む"
                  className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-xs focus:outline-none focus:border-[#E53935]"
                  autoFocus
                />
              </div>
              <div className="max-h-60 overflow-y-auto">
              <button
                type="button"
                onClick={() => {
                  setSelectedAnime(null);
                  setShowAnimeFilter(false);
                  setAnimeSearch("");
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-500 hover:bg-gray-50"
              >
                すべて
              </button>
              {animeTitles.map((title) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => {
                    setSelectedAnime(title);
                    setShowAnimeFilter(false);
                    setAnimeSearch("");
                  }}
                  className={`w-full truncate px-4 py-2.5 text-left text-sm hover:bg-gray-50 ${
                    selectedAnime === title
                      ? "font-medium text-[#E53935]"
                      : "text-gray-700"
                  }`}
                >
                  {title}
                </button>
              ))}
              </div>
            </div>
          )}
        </div>

        {/* City filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowCityFilter((v) => !v);
              setShowAnimeFilter(false);
            }}
            className={`flex h-10 items-center gap-1.5 rounded-xl border px-3 text-sm shadow-md ${
              selectedCity
                ? "border-[#E53935] bg-[#E53935] text-white"
                : "border-gray-200 bg-white text-gray-700"
            }`}
          >
            <span>{selectedCity ?? "エリア"}</span>
            <ChevronDown className="size-3.5 shrink-0" />
          </button>

          {showCityFilter && (
            <div className="absolute right-0 top-12 z-30 max-h-72 w-44 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl">
              <button
                type="button"
                onClick={() => {
                  setSelectedCity(null);
                  setShowCityFilter(false);
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-500 hover:bg-gray-50"
              >
                すべて
              </button>
              {cities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setSelectedCity(city ?? null);
                    setShowCityFilter(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 ${
                    selectedCity === city
                      ? "font-medium text-[#E53935]"
                      : "text-gray-700"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Spot count + clear filters */}
      <div className="absolute left-3 top-[3.75rem] z-20 flex items-center gap-2">
        <div className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
          {filteredSpots.length} 件
        </div>
        {hasActiveFilter && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs text-gray-500 shadow-sm hover:text-red-500"
          >
            <X className="size-3" />
            クリア
          </button>
        )}
      </div>

      {/* Backdrop to close dropdowns */}
      {(showAnimeFilter || showCityFilter) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setShowAnimeFilter(false);
            setShowCityFilter(false);
          }}
        />
      )}
    </div>
  );
}
