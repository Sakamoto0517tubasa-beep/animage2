"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import ScoreBadge from "@/components/ScoreBadge";
import SearchBar from "@/components/SearchBar";
import { cn } from "@/lib/utils";
import type { SpotWithStats } from "@/types/supabase";

type SpotsSidebarProps = {
  spots: SpotWithStats[];
  query?: string;
  selectedSpotId?: string | null;
  onSelectSpot?: (spotId: string) => void;
  className?: string;
};

export default function SpotsSidebar({
  spots,
  query = "",
  selectedSpotId,
  onSelectSpot,
  className,
}: SpotsSidebarProps) {
  return (
    <aside className={cn("flex flex-col bg-white", className)}>
      <div className="border-b border-gray-100 p-3">
        <SearchBar defaultValue={query} />
        <p className="mt-2 text-xs text-gray-500">
          {spots.length} spot{spots.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {spots.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <MapPin className="size-8 text-gray-300" />
            <p className="mt-3 text-sm text-gray-500">No spots match your search.</p>
            <Link href="/spots" className="mt-2 text-sm text-[#E53935]">
              Clear search
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {spots.map((spot) => (
              <li key={spot.id}>
                <button
                  type="button"
                  onClick={() => onSelectSpot?.(spot.id)}
                  className={cn(
                    "flex w-full items-center gap-3 px-3 py-3 text-left transition-colors",
                    selectedSpotId === spot.id ? "bg-red-50" : "hover:bg-gray-50",
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {spot.location_name}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-gray-400">
                      Inspired by &quot;{spot.anime_title}&quot;
                    </p>
                  </div>
                  <ScoreBadge score={spot.overall_score} reviewCount={spot.review_count} size="sm" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
