import Image from "next/image";
import {
  regionImageAlt,
  regionImages,
  type Region,
} from "@/data/simulationData";

type RegionBannerProps = {
  calcRegion: Region;
  prefecture: string;
};

export default function RegionBanner({ calcRegion, prefecture }: RegionBannerProps) {
  return (
    <div className="relative h-[200px] w-full overflow-hidden rounded-2xl">
      <Image
        src={regionImages[calcRegion]}
        alt={regionImageAlt[calcRegion]}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 768px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
      <p className="absolute bottom-4 left-4 text-lg font-semibold text-white">
        {prefecture}
      </p>
    </div>
  );
}
