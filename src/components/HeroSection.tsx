import Image from "next/image";
import { heroImage } from "@/data/simulationData";

export default function HeroSection() {
  return (
    <section className="relative h-[300px] w-full overflow-hidden">
      <Image
        src={heroImage}
        alt="東京の夜景"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/50 to-navy-deep/90" />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-widest text-white sm:text-4xl">
            日本移住・就労シミュレーター
          </h1>
          <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>
      </div>
    </section>
  );
}
