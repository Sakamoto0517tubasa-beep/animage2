export const revalidate = 3600; // ISR: 1 hour cache

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { getSpotsByAnime } from "@/lib/anime";
import HomeSpotCard from "@/components/home/HomeSpotCard";
import ShareButton from "@/components/ShareButton";

type PageProps = { params: Promise<{ title: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { title } = await params;
  const decodedTitle = decodeURIComponent(title);
  const spots = await getSpotsByAnime(decodedTitle);

  const titleStr = `${decodedTitle}の聖地巡礼`;
  const description = `「${decodedTitle}」の聖地スポットが${spots.length}件。アニメ聖地巡礼マップとレビューをチェック。`;
  const image = spots[0]?.thumbnail_fallback_url ?? spots[0]?.thumbnail_url ?? undefined;

  return {
    title: titleStr,
    description,
    openGraph: {
      title: titleStr,
      description,
      ...(image && { images: [{ url: image, width: 1200, height: 630, alt: decodedTitle }] }),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: titleStr,
      description,
      ...(image && { images: [image] }),
    },
  };
}

export default async function AnimeSpotsPage({ params }: PageProps) {
  const { title } = await params;
  const decodedTitle = decodeURIComponent(title);
  const spots = await getSpotsByAnime(decodedTitle);

  if (!spots.length) notFound();

  // ヒーロー画像：アニメ画像を優先
  const heroImage =
    spots.find((s) => s.thumbnail_fallback_url)?.thumbnail_fallback_url ??
    spots[0]?.thumbnail_url ??
    null;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* ヒーローバナー */}
      <div className="relative h-44 w-full overflow-hidden bg-gray-200">
        {heroImage && (
          <Image
            src={heroImage}
            alt={decodedTitle}
            fill
            className="object-cover"
            style={{ filter: "saturate(1.3) brightness(0.85)" }}
            sizes="100vw"
            priority
          />
        )}
        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* 戻るボタン */}
        <Link
          href="/anime"
          className="absolute left-4 top-4 flex size-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60"
        >
          <ArrowLeft className="size-5" />
        </Link>

        {/* タイトル・件数 */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <h1 className="text-lg font-bold leading-snug text-white drop-shadow-md line-clamp-2">
            {decodedTitle}
          </h1>
          <div className="mt-1 flex items-center justify-between">
            <p className="flex items-center gap-1 text-xs text-white/80">
              <MapPin className="size-3" />
              {spots.length} 聖地スポット
            </p>
            <ShareButton
              title={`${decodedTitle}の聖地巡礼｜AnimAge`}
              text={`「${decodedTitle}」の聖地が${spots.length}件！アニメ聖地巡礼マップをチェック。`}
              className="border-white/30 bg-black/30 text-white backdrop-blur-sm hover:bg-black/50"
            />
          </div>
        </div>
      </div>

      {/* スポットグリッド */}
      <div className="p-3">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {spots.map((spot) => (
            <HomeSpotCard key={spot.id} spot={spot} />
          ))}
        </div>
      </div>
    </div>
  );
}
