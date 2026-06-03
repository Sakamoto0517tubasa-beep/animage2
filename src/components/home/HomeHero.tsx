import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// 鮮やかな山岳湖の反射 — 新海誠風の空と雲
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200";

const ACCENT = "#E53E3E";

export default function HomeHero({ spotCount }: { spotCount?: number }) {
  const STATS = [
    { value: spotCount ? spotCount.toLocaleString() : "1000+", label: "聖地スポット" },
    { value: "47", label: "都道府県" },
    { value: "100%", label: "実在ロケ地" },
  ];
  return (
    <div className="relative flex min-h-[calc(100dvh-4.5rem-env(safe-area-inset-bottom,0px))] flex-col overflow-hidden border-b-4 text-white" style={{ borderColor: ACCENT }}>
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        className="object-cover object-center"
        style={{ filter: "saturate(1.7) brightness(1.05) contrast(1.08)" }}
        sizes="100vw"
      />

      {/* アニメ風カラーオーバーレイ：テキストエリアを重点的に暗く */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,5,40,0.62) 0%, rgba(10,20,60,0.50) 45%, rgba(5,10,50,0.78) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
          {/* Logo */}
          <h1
            className="font-cinzel text-[3rem] font-bold leading-none tracking-[0.1em] sm:text-[3.25rem]"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)" }}
          >
            <span style={{ color: ACCENT }}>A</span>
            <span className="text-white">NIM</span>
            <span style={{ color: ACCENT }}>A</span>
            <span className="text-white">GE</span>
          </h1>

          {/* Divider */}
          <div className="mt-6 flex items-center gap-3">
            <span className="h-px w-10 bg-white/50" />
            <span
              className="text-[11px] font-light tracking-[0.2em] text-white/90 uppercase"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
            >アニメ聖地巡礼</span>
            <span className="h-px w-10 bg-white/50" />
          </div>

          <p
            className="mt-5 max-w-[18rem] text-lg font-semibold leading-relaxed text-white sm:max-w-xs sm:text-xl"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.95), 0 0 30px rgba(0,0,0,0.7)" }}
          >
            日本のアニメ聖地を、実際に訪れよう
          </p>

          <p
            className="mt-3 max-w-sm text-sm font-medium leading-relaxed text-white/95 sm:text-[15px]"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.9)" }}
          >
            好きなアニメの舞台を探して、旅の記録をレビューで残そう
          </p>

          <Button
            asChild
            className="mt-9 h-12 rounded-full px-9 text-base font-medium text-white shadow-lg shadow-black/40 hover:opacity-90"
            style={{ backgroundColor: ACCENT }}
          >
            <Link href="/spots">聖地を探す</Link>
          </Button>
        </div>

        <div className="px-4 pb-7 pt-2">
          <div className="mx-auto grid max-w-lg grid-cols-3 gap-2.5 sm:gap-3">
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="relative overflow-hidden rounded-xl border border-white/15 bg-black/40 px-2 py-4 text-center backdrop-blur-sm sm:px-3"
              >
                <div
                  className="absolute inset-x-0 top-0 h-0.5"
                  style={{ backgroundColor: ACCENT }}
                  aria-hidden
                />
                <p className="text-xl font-bold leading-none text-white sm:text-2xl">
                  {value}
                </p>
                <p className="mt-2 text-[10px] font-light tracking-wide text-white/65 sm:text-[11px]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
