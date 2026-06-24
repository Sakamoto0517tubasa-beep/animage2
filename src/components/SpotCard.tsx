import Link from "next/link";
import { MapPin } from "lucide-react";
import ScoreBadge from "@/components/ScoreBadge";
import SpotThumbnail from "@/components/SpotThumbnail";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { SpotWithStats } from "@/types/supabase";

type SpotCardProps = {
  spot: SpotWithStats;
};

export default function SpotCard({ spot }: SpotCardProps) {
  return (
    <Link href={`/spots/${spot.id}`} className="group block h-full">
      <Card className="h-full overflow-hidden border-white/10 bg-[#1a1a1a] py-0 ring-white/10 transition-all hover:border-violet-500/40 hover:ring-violet-500/20">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#252525]">
          {spot.thumbnail_url ? (
            <SpotThumbnail
              lat={spot.lat}
              lng={spot.lng}
              alt={spot.location_name}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-white/30">
              <MapPin className="size-10" />
            </div>
          )}
          <div className="absolute right-3 top-3 rounded-lg bg-black/70 px-2.5 py-1 backdrop-blur-sm">
            <ScoreBadge score={spot.overall_score} reviewCount={spot.review_count} size="md" />
          </div>
        </div>
        <CardContent className="space-y-2 p-4">
          <Badge
            variant="outline"
            className="border-violet-500/30 bg-violet-500/10 text-violet-300"
          >
            {spot.anime_title}
          </Badge>
          <h3 className="line-clamp-2 text-base font-semibold text-white group-hover:text-violet-300">
            {spot.location_name}
          </h3>
          <p className="line-clamp-1 text-xs text-white/50">{spot.address}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
