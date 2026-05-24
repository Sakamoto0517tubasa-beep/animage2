import Image from "next/image";
import {
  regionImageAlt,
  regionImages,
  type Region,
} from "@/data/simulationData";

type RegionBannerProps = {
  region: Region;
};

export default function RegionBanner({ region }: RegionBannerProps) {
  return (
    <div className="relative h-[200px] w-full overflow-hidden rounded-2xl">
      <Image
        src={regionImages[region]}
        alt={regionImageAlt[region]}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 768px"
      />
    </div>
  );
}
