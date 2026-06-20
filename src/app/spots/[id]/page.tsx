export const revalidate = 300; // ISR: 5 min (reviews update more often)

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftRight, MapPin, PenLine, Train } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";
import ShareButton from "@/components/ShareButton";
import VisitedButton from "@/components/VisitedButton";
import PhotoGrid from "@/components/PhotoGrid";
import ReviewCard from "@/components/ReviewCard";
import ScoreBadge from "@/components/ScoreBadge";
import ScorePanel from "@/components/ScorePanel";
import SpotEmbedMap from "@/components/SpotEmbedMap";
import SpotImagePanel from "@/components/SpotImagePanel";
import RelatedSpots from "@/components/RelatedSpots";
import NearbyPlacesLazy from "@/components/NearbyPlacesLazy";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { isSpotFavorited } from "@/lib/favorites";
import { getPhotosBySpotId } from "@/lib/photos";
import { getReviewsBySpotId, getSpotScores } from "@/lib/reviews";
import { getSpotById } from "@/lib/spots";

type SpotDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: SpotDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const spot = await getSpotById(id);
  if (!spot) return { title: "スポットが見つかりません" };

  const title = `${spot.location_name} - ${spot.anime_title}`;
  const description = `「${spot.anime_title}」の聖地「${spot.location_name}」。${spot.address ? spot.address + "。" : ""}アニメ聖地巡礼スポットのレビューや写真をチェック。`;
  const image = spot.thumbnail_fallback_url ?? spot.thumbnail_url ?? undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      ...(image && { images: [{ url: image, width: 1200, height: 630, alt: spot.location_name }] }),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image && { images: [image] }),
    },
  };
}

export default async function SpotDetailPage({ params }: SpotDetailPageProps) {
  const { id } = await params;
  const spot = await getSpotById(id);

  if (!spot) {
    notFound();
  }

  const [scores, reviews, photos, user] = await Promise.all([
    getSpotScores(id),
    getReviewsBySpotId(id),
    getPhotosBySpotId(id),
    getCurrentUser(),
  ]);

  const isFavorited = await isSpotFavorited(id, user?.id ?? null);
  const reviewCount = reviews.length;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}&travelmode=transit`;

  const isAnimeUrl = (url?: string | null) =>
    !!url && !url.includes("maps.googleapis.com") && !url.includes("unsplash.com");

  const animeImageUrl = isAnimeUrl(spot.thumbnail_fallback_url)
    ? spot.thumbnail_fallback_url!
    : isAnimeUrl(spot.thumbnail_url)
      ? spot.thumbnail_url!
      : null;

  const streetViewUrl = spot.thumbnail_url?.includes("maps.googleapis.com")
    ? spot.thumbnail_url
    : null;

  // 構造化データ（観光地スキーマ + 評価）→ 検索結果のリッチ表示
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: spot.location_name,
    description: `「${spot.anime_title}」の聖地巡礼スポット`,
    ...(animeImageUrl && { image: animeImageUrl }),
    ...(spot.address && { address: spot.address }),
    geo: {
      "@type": "GeoCoordinates",
      latitude: spot.lat,
      longitude: spot.lng,
    },
    ...(scores.overall != null && reviewCount > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: scores.overall,
        bestRating: 10,
        ratingCount: reviewCount,
      },
    }),
  };

  return (
    <div className="bg-gray-50 pb-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SpotImagePanel
        animeImageUrl={animeImageUrl}
        streetViewUrl={streetViewUrl}
        locationName={spot.location_name}
      />

      {/* ── ヘッダー情報 ── */}
      <div className="px-4 pt-4 pb-2">
        {/* アニメ名バッジ */}
        <span className="inline-block rounded-full bg-[#E53935]/10 px-3 py-0.5 text-xs font-semibold text-[#E53935]">
          {spot.anime_title}
        </span>

        <div className="mt-2 flex items-start justify-between gap-3">
          <h2 className="text-2xl font-bold leading-tight text-gray-900">{spot.location_name}</h2>
          <FavoriteButton
            spotId={spot.id}
            initialFavorited={isFavorited}
            isLoggedIn={Boolean(user)}
          />
        </div>

        {/* 住所・電車 */}
        <div className="mt-2 flex flex-col gap-1">
          {spot.address && (
            <p className="flex items-start gap-1.5 text-sm text-gray-500">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gray-400" />
              {spot.address}
            </p>
          )}
          {spot.train_minutes != null && (
            <p className="flex items-center gap-1.5 text-sm text-gray-500">
              <Train className="size-4 shrink-0 text-gray-400" />
              最寄り駅から電車で約{spot.train_minutes}分
            </p>
          )}
        </div>

        {/* 総合スコア ＋ アクションボタン */}
        <div className="mt-4 flex items-center gap-2">
          <ScoreBadge score={scores.overall} reviewCount={reviewCount} size="lg" />
          <Button
            asChild
            variant="outline"
            className="flex-1 rounded-xl border-gray-200 text-gray-700"
          >
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
              <MapPin className="size-4" />
              ルート
            </a>
          </Button>
          <Button asChild className="flex-1 rounded-xl bg-[#E53935] hover:bg-[#D32F2F]">
            <Link href={`/spots/${spot.id}/review/new`}>
              <PenLine className="size-4" />
              レビュー
            </Link>
          </Button>
          <VisitedButton spotId={spot.id} className="shrink-0" />
          <ShareButton
            title={`${spot.location_name}｜AnimAge`}
            text={`「${spot.anime_title}」の聖地「${spot.location_name}」をチェック！`}
            className="rounded-xl px-3 shrink-0"
          />
        </div>

        {spot.description && (
          <p className="mt-4 text-sm leading-relaxed text-gray-600">{spot.description}</p>
        )}
      </div>

      {/* ── スコアパネル ── */}
      <div className="px-4 mt-5">
        <ScorePanel scores={scores} reviewCount={reviewCount} />
      </div>

      {/* ── 地図 ── */}
      <div className="px-4 mt-5">
        <SpotEmbedMap lat={spot.lat} lng={spot.lng} locationName={spot.location_name} />
      </div>

      {/* ── 写真 ── */}
      <section className="px-4 mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900">写真</h3>
          <span className="text-xs text-gray-400">{photos.length}枚</span>
        </div>
        <PhotoGrid photos={photos} />
      </section>

      {/* ── 周辺スポット ── */}
      <NearbyPlacesLazy lat={spot.lat} lng={spot.lng} />

      {/* ── 同じアニメの他スポット ── */}
      <RelatedSpots animeTitle={spot.anime_title} currentSpotId={spot.id} />

      {/* ── レビュー ── */}
      <section className="px-4 mt-8 pb-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900">レビュー</h3>
          <span className="text-xs text-gray-400">{reviewCount}件</span>
        </div>

        <div className="space-y-3">
          {reviewCount === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 py-10 text-center">
              <p className="text-sm text-gray-500">
                まだレビューがありません
              </p>
              <Button asChild className="mt-4 bg-[#E53935] hover:bg-[#D32F2F]">
                <Link href={`/spots/${spot.id}/review/new`}>最初にレビューを書く</Link>
              </Button>
            </div>
          ) : (
            reviews.map((review) => <ReviewCard key={review.id} review={review} />)
          )}
        </div>
      </section>
    </div>
  );
}
