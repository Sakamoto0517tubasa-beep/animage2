import Image from "next/image";
import {
  jobTypeImageAlt,
  jobTypeImages,
  type JobType,
} from "@/data/simulationData";

type JobTypeIconProps = {
  jobType: JobType;
};

export default function JobTypeIcon({ jobType }: JobTypeIconProps) {
  return (
    <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-full border-2 border-gold/40">
      <Image
        src={jobTypeImages[jobType]}
        alt={jobTypeImageAlt[jobType]}
        fill
        className="object-cover"
        sizes="60px"
      />
    </div>
  );
}
